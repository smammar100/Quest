type FullscreenLoaderProps = {
  backgroundColor?: string;
};

export default function FullscreenLoader({ backgroundColor = 'var(--color-offwhite)' }: FullscreenLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'grid',
        placeItems: 'center',
        background: backgroundColor,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: '2.4rem',
          height: '2.4rem',
          borderRadius: '9999px',
          border: '3px solid rgba(255, 90, 71, 0.2)',
          borderTopColor: 'var(--color-coral)',
          animation: 'quest-fullscreen-loader-spin 0.8s linear infinite',
        }}
      />
      <style>
        {`@keyframes quest-fullscreen-loader-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
}