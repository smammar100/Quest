'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/controllers/useAuth';
import type { ChatMessage, PostQuestPayload, AgentQuestData } from '@/lib/models/quest';
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
  const { user, isAuthenticated } = useAuth();
  const [phase, setPhase] = useState<PostQuestPhase>('prompt');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [agentTyping, setAgentTyping] = useState(false);
  // Accumulates quest fields additively as the agent elicits them turn by turn.
  const [questDraft, setQuestDraft] = useState<Partial<AgentQuestData>>({});

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // Auto-advance from auth gate to chat once the user signs in.
  useEffect(() => {
    if (phase !== 'auth' || !isAuthenticated) return;
    setPhase('chat');
    void runAgentTurn(messagesRef.current);
    // runAgentTurn is intentionally omitted from deps — it is stable across
    // renders and including it would cause spurious re-runs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, isAuthenticated]);

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

      setMessages([...history, { role: 'agent', content: response.message }]);

      // Merge whichever fields the agent just elicited into the running draft.
      if (response.partialData) {
        setQuestDraft(prev => ({ ...prev, ...response.partialData }));
      }

      if (response.readyToPost && response.questData) {
        await submitQuest(response.questData);
      }
    } catch {
      setPhase('error');
    } finally {
      setAgentTyping(false);
    }
  }

  async function submitQuest(agentData: AgentQuestData) {
    if (!user) return;
    setPhase('posting');
    try {
      const payload: PostQuestPayload = {
        ...agentData,
        questID: crypto.randomUUID(),
        citizenID: user.uid,
        // TODO: generate and attach dynamicLink once deep linking is wired up.
      };
      // TODO: replace '' with the real Firebase ID token once auth is wired up.
      await postQuest(payload, '');
      setPhase('done');
    } catch {
      setPhase('error');
    }
  }

  return { phase, messages, agentTyping, questDraft, submitInitialPrompt, sendMessage };
}
