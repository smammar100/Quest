'use client';

import { useState } from 'react';
import { useAuth } from '@/controllers/useAuth';
import { toPostQuestPayload, type PostQuestDraft } from '@/lib/models/quest';
import { postQuest } from '@/lib/api/quests';

const EMPTY_DRAFT: PostQuestDraft = {
  title: '',
  description: '',
  category: '',
  budget: 0,
  currency: 'USD',
  location: '',
};

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export function usePostQuest() {
  const { user, isAuthenticated } = useAuth();
  const [draft, setDraft] = useState<PostQuestDraft>(EMPTY_DRAFT);
  const [status, setStatus] = useState<SubmitStatus>('idle');

  function updateField<K extends keyof PostQuestDraft>(key: K, value: PostQuestDraft[K]) {
    setDraft(prev => ({ ...prev, [key]: value }));
  }

  async function submit() {
    if (!isAuthenticated || !user) return;

    setStatus('submitting');
    try {
      const payload = toPostQuestPayload(draft, user.uid);

      // TODO: replace '' with the Firebase ID token once auth is wired up.
      // The token is obtained via: const idToken = await firebaseUser.getIdToken();
      // Expose getIdToken from useAuth once the Firebase user object is available.
      await postQuest(payload, '');

      setStatus('success');
      setDraft(EMPTY_DRAFT);
    } catch {
      setStatus('error');
    }
  }

  return { draft, updateField, submit, status, isAuthenticated };
}
