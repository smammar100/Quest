'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/controllers/useAuth';
import type { ChatMessage } from '@/lib/models/quest';
import { createAgentSession, sendAgentMessage, getAgentSession } from '@/lib/api/agent';
import type { SessionState } from '@/lib/api/agent';

export type PostQuestPhase =
  | 'prompt'   // initial input
  | 'chat'     // full-screen agent conversation
  | 'done'     // agent posted the quest successfully
  | 'error';

type SessionRef = { userId: string; sessionId: string };

export function usePostQuest(initialPrompt?: string) {
  const { user, userProfile } = useAuth();
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

    // TODO: replace '' with real Firebase ID token once auth is wired.
    const userId = user?.uid ?? 'cit-42';
    const countryCode = userProfile?.countryCode?.trim().toUpperCase() || 'SG';

    const state: SessionState = {
      citizen_id: userId,
      country_code: countryCode,
      timezone: 'Asia/Singapore',
      country_name: countryCode,
    };

    const session = await createAgentSession(userId, state, '');
    sessionRef.current = { userId, sessionId: session.id };
    return sessionRef.current;
  }

  async function runAgentTurn(text: string) {
    setAgentTyping(true);
    try {
      const { userId, sessionId } = await ensureSession();
      // TODO: replace '' with real Firebase ID token once auth is wired.
      const response = await sendAgentMessage(userId, sessionId, text, '');

      setMessages(prev => [...prev, { role: 'agent', content: response.message }]);

      if (response.readyToPost) {
        const result = await getAgentSession(userId, sessionId, '');
        setPhase(result?.status === 'success' ? 'done' : 'error');
      }
    } catch {
      setPhase('error');
    } finally {
      setAgentTyping(false);
    }
  }

  return { phase, messages, agentTyping, submitInitialPrompt, sendMessage, reset };
}
