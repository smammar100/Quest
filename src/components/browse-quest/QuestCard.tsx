import type { Task } from '@/lib/models/task';

type Props = {
  quest: Task;
  onSelect?: (quest: Task) => void;
};

export default function QuestCard({ quest, onSelect }: Props) {
  return (
    <article className="quest-card" onClick={() => onSelect?.(quest)}>
      <div className="quest-card__header">
        <span className="quest-card__category">{quest.category}</span>
        <span className="quest-card__budget">${quest.budget}</span>
      </div>
      <h3 className="quest-card__title">{quest.title}</h3>
      <p className="quest-card__description">{quest.description}</p>
      <div className="quest-card__footer">
        <span className="quest-card__location">{quest.location}</span>
        <span className={`quest-card__status quest-card__status--${quest.status}`}>
          {quest.status}
        </span>
      </div>
    </article>
  );
}
