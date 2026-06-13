'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/controllers/useAuth';
import type { ChatMessage, PostQuestPayload } from '@/lib/models/quest';
import { sendAgentMessage } from '@/lib/api/agent';
import { postQuest } from '@/lib/api/quests';

export type PostQuestPhase =
  | 'prompt'   // initial input, public
  | 'auth'     // sign-in gate, triggered after first message
  | 'chat'     // full-screen agent conversation, authenticated
  | 'posting'  // agent signalled done, submitting to backend
  | 'done'     // quest posted successfully
  | 'error';

export function usePostQuest() {
  const { isAuthenticated } = useAuth();
  const [phase, setPhase] = useState<PostQuestPhase>('prompt');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [agentTyping, setAgentTyping] = useState(false);

  // Ref so the auth-watch effect always sees the latest messages without
  // re-registering the effect on every message update.
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // When the user signs in while the auth gate is showing, automatically
  // advance to the chat phase and kick off the first agent turn.
  useEffect(() => {
    if (phase !== 'auth' || !isAuthenticated) return;
    setPhase('chat');
    void runAgentTurn(messagesRef.current);
    // runAgentTurn is intentionally omitted from deps — it is stable across
    // renders and including it would cause spurious re-runs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, isAuthenticated]);

  // Called when the user submits the initial prompt on the public page.
  function submitInitialPrompt(prompt: string) {
    const initial: ChatMessage[] = [{ role: 'user', content: prompt }];
    setMessages(initial);

    if (!isAuthenticated) {
      setPhase('auth');
      return;
    }

    setPhase('chat');
    void runAgentTurn(initial);
  }

  // Called when the user sends a follow-up message inside the chat.
  async function sendMessage(content: string) {
    const next: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(next);
    await runAgentTurn(next);
  }

  async function runAgentTurn(history: ChatMessage[]) {
    setAgentTyping(true);
    try {
      // TODO: replace '' with the real Firebase ID token once auth is wired up.
      // Obtain via: const idToken = await firebaseUser.getIdToken();
      const response = await sendAgentMessage(history, '');

      const updated: ChatMessage[] = [
        ...history,
        { role: 'agent', content: response.message },
      ];
      setMessages(updated);

      if (response.readyToPost && response.questData) {
        await submitQuest(response.questData);
      }
    } catch {
      setPhase('error');
    } finally {
      setAgentTyping(false);
    }
  }

  async function submitQuest(questData: PostQuestPayload) {
    setPhase('posting');
    try {
      // TODO: replace '' with the real Firebase ID token once auth is wired up.
      await postQuest(questData, '');
      setPhase('done');
    } catch {
      setPhase('error');
    }
  }

  return { phase, messages, agentTyping, submitInitialPrompt, sendMessage };
}
