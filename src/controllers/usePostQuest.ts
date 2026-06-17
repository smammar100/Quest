'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/controllers/useAuth';
import type { ChatMessage } from '@/lib/models/quest';
import { createAgentSession, sendAgentMessage } from '@/lib/api/agent';
import type { SessionState } from '@/lib/api/agent';

export type PostQuestPhase =
  | 'prompt'   // initial input
  | 'chat'     // full-screen agent conversation
  | 'done'     // agent posted the quest successfully
  | 'error';

type SessionRef = { userId: string; sessionId: string };

export function usePostQuest() {
  const { user } = useAuth();
  const [phase, setPhase] = useState<PostQuestPhase>('prompt');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [agentTyping, setAgentTyping] = useState(false);

  const sessionRef = useRef<SessionRef | null>(null);

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

    // TODO: replace with real Firebase uid + idToken once auth is wired.
    const userId = user?.uid ?? 'cit-42';
    const sessionId = crypto.randomUUID();

    const state: SessionState = {
      citizen_id: userId,
      country_code: 'SG',
      timezone: 'Asia/Singapore',
      country_name: 'Singapore',
    };

    await createAgentSession(userId, sessionId, state, '');
    sessionRef.current = { userId, sessionId };
    return sessionRef.current;
  }

  async function runAgentTurn(text: string) {
    setAgentTyping(true);
    try {
      const { userId, sessionId } = await ensureSession();
      // TODO: replace '' with real Firebase ID token once auth is wired.
      const response = await sendAgentMessage(userId, sessionId, text, '');

      setMessages(prev => [...prev, { role: 'agent', content: response.message }]);

      // The agent posts the quest to the backend itself — when it signals done
      // we advance to 'done' without any additional frontend POST.
      if (response.readyToPost) {
        setPhase('done');
      }
    } catch {
      setPhase('error');
    } finally {
      setAgentTyping(false);
    }
  }

  return { phase, messages, agentTyping, submitInitialPrompt, sendMessage, reset };
}
