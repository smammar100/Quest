import s from './LoadingState.module.css';

type Props = {
  label: string;
  inline?: boolean;
};

export default function LoadingState({ label, inline = false }: Props) {
  return (
    <div className={`${s.wrap}${inline ? ` ${s.inline}` : ''}`} role="status" aria-live="polite" aria-busy="true">
      <div className={s.spinner} aria-hidden="true" />
      <p className={s.label}>{label}</p>
    </div>
  );
}
