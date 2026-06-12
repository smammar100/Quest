'use client';

import { useState, useEffect } from 'react';
import type { Task } from '@/lib/models/task';

type BrowseState = {
  quests: Task[];
  loading: boolean;
  error: string | null;
  activeCategory: string | null;
};

// Controller hook — bridges the browse-quest view to the model layer.
// Swap the stub data below for a real fetchOpenQuests() call from lib/firebase/quests.ts
// once Firebase is wired up.
export function useBrowseQuest() {
  const [state, setState] = useState<BrowseState>({
    quests: [],
    loading: true,
    error: null,
    activeCategory: null,
  });

  useEffect(() => {
    // TODO: replace with fetchOpenQuests(state.activeCategory)
    setState((s) => ({ ...s, loading: false, quests: [] }));
  }, [state.activeCategory]);

  const setCategory = (category: string | null) =>
    setState((s) => ({ ...s, activeCategory: category }));

  return {
    quests: state.quests,
    loading: state.loading,
    error: state.error,
    activeCategory: state.activeCategory,
    setCategory,
  };
}
