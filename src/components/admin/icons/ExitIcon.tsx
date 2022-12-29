export function ExitIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg className={`w-6 h-6 fill-current ${className}`} viewBox="0 0 24 24">
      <path
        className="text-slate-400"
        d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
      />
      <path className="text-slate-600" d="M3 23H1V1h2z" />
    </svg>
  );
}
