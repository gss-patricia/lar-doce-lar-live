export function Logo({ clara = false }: { clara?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <rect width="32" height="32" rx="9" className="fill-terracota" />
        <path d="M8 15.5 16 9l8 6.5V24a1 1 0 0 1-1 1h-4.5v-5h-5v5H9a1 1 0 0 1-1-1z" fill="#fff" />
      </svg>
      <span className={`font-display text-xl font-semibold tracking-tight ${clara ? "text-white" : "text-pinho-escuro"}`}>
        Lar Doce Lar
      </span>
    </span>
  );
}
