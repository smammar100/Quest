'use client';

import { useState, useRef, useEffect } from 'react';
import posthog from 'posthog-js';
import { useAuth } from '@/controllers/useAuth';
import type { ChatMessage } from '@/lib/models/quest';
import { createAgentSession, sendAgentMessage, getAgentSession } from '@/lib/api/agent';
import type { SessionState } from '@/lib/api/agent';
import { resolveSupportedCountryCode } from '@/lib/constants/country-pricing';

export type PostQuestPhase =
  | 'prompt'   // initial input
  | 'chat'     // full-screen agent conversation
  | 'done'     // agent posted the quest successfully
  | 'error';

type SessionRef = { userId: string; sessionId: string };

const DEFAULT_COUNTRY_CODE = resolveSupportedCountryCode(
  process.env.NEXT_PUBLIC_QUEST_BROWSE_COUNTRY_CODE
);
const DEFAULT_TIMEZONE = 'UTC';

const resolveClientTimeZone = () => {
  const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return detected && detected.trim().length > 0 ? detected : DEFAULT_TIMEZONE;
};

export function usePostQuest(initialPrompt?: string) {
  const { user, userProfile, getIdToken } = useAuth();
  const [phase, setPhase] = useState<PostQuestPhase>('prompt');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [agentTyping, setAgentTyping] = useState(false);

  const sessionRef = useRef<SessionRef | null>(null);
  const didAutoSubmit = useRef(false);

  useEffect(() => {
    if (initialPrompt && !didAutoSubmit.current) {
      didAutoSubmit.current = true;
      submitInitialPrompt(initialPrompt);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function submitInitialPrompt(prompt: string) {
    posthog.capture('post_quest_prompt_submitted', { prompt_length: prompt.length });
    setMessages([{ role: 'user', content: prompt }]);
    setPhase('chat');
    void runAgentTurn(prompt);
  }

  // Start over — clears the conversation and returns to the prompt screen.
  // Used by the done screen ("Post another quest") and error retry. Dropping the
  // session ref forces a fresh agent session (and fresh mock turn index) next time.
  function reset() {
    sessionRef.current = null;
    setMessages([]);
    setAgentTyping(false);
    setPhase('prompt');
  }

  async function sendMessage(content: string) {
    setMessages(prev => [...prev, { role: 'user', content }]);
    await runAgentTurn(content);
  }

  async function ensureSession(): Promise<SessionRef> {
    if (sessionRef.current) return sessionRef.current;

    if (!user) throw new Error('Not authenticated');

    const userId = user.uid;
    const countryCode = resolveSupportedCountryCode(
      userProfile?.countryCode ?? DEFAULT_COUNTRY_CODE
    );
    const timezone = resolveClientTimeZone();

    const state: SessionState = {
      citizen_id: userId,
      country_code: countryCode,
      timezone,
      country_name: countryCode,
    };

    const idToken = await getIdToken();
    const session = await createAgentSession(userId, state, idToken);
    sessionRef.current = { userId, sessionId: session.id };
    return sessionRef.current;
  }

  async function runAgentTurn(text: string) {
    setAgentTyping(true);
    try {
      if (!user) throw new Error('Not authenticated');
      const { userId, sessionId } = await ensureSession();
      // getIdToken() refreshes automatically if the token is within 5 min of expiry.
      const idToken = await getIdToken();
      const response = await sendAgentMessage(userId, sessionId, text, idToken);

      setMessages(prev => [...prev, { role: 'agent', content: response.message }]);

      if (response.readyToPost) {
        const result = await getAgentSession(userId, sessionId, await getIdToken());
        const success = result?.status === 'success';
        if (success) {
          posthog.capture('post_quest_completed', { session_id: sessionId });
        } else {
          posthog.capture('post_quest_failed', { session_id: sessionId, reason: 'agent_status_not_success' });
        }
        setPhase(success ? 'done' : 'error');
      }
    } catch (err) {
      posthog.captureException(err);
      posthog.capture('post_quest_failed', { reason: 'exception' });
      setPhase('error');
    } finally {
      setAgentTyping(false);
    }
  }

  return { phase, messages, agentTyping, submitInitialPrompt, sendMessage, reset };
}
