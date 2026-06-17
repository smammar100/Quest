// Quest brand spark — the small coral mark that fronts every AI message and the
// thinking indicator. Purely decorative; callers control size/animation via className.
export function PostQuestSpark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 1c.8 5.7 5.3 10.2 11 11-5.7.8-10.2 5.3-11 11-.8-5.7-5.3-10.2-11-11 5.7-.8 10.2-5.3 11-11Z" />
    </svg>
  );
}
