'use client';

import { useBrowseQuest } from '@/controllers/useBrowseQuest';
import QuestCard from '@/components/browse-quest/QuestCard';
import type { Task } from '@/lib/models/task';

export default function BrowseQuestPage() {
  const { quests, loading, error, activeCategory, setCategory } = useBrowseQuest();

  if (loading) return <p>Loading quests…</p>;
  if (error)   return <p>Something went wrong: {error}</p>;

  return (
    <main>
      <h1>Browse Quests</h1>

      <div className="browse-quest__filters">
        {['errands', 'events', 'content', 'field', 'home'].map((cat) => (
          <button
            key={cat}
            type="button"
            className={`browse-quest__filter${activeCategory === cat ? ' is-active' : ''}`}
            onClick={() => setCategory(activeCategory === cat ? null : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {quests.length === 0 ? (
        <p className="browse-quest__empty">No quests available right now.</p>
      ) : (
        <div className="browse-quest__grid">
          {quests.map((quest: Task) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onSelect={(q) => console.log('Selected quest:', q.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
