type LinkCardProps = {
  title: string;
  description?: string;
  url: string;
};

export default function LinkCard({ title, description, url }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/70 px-5 py-4 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:translate-y-0 dark:border-white/10 dark:bg-white/5 dark:hover:border-emerald-400/40"
    >
      <span className="min-w-0">
        <span className="block truncate font-semibold">{title}</span>
        {description && (
          <span className="mt-0.5 block truncate text-sm text-black/50 dark:text-white/50">
            {description}
          </span>
        )}
      </span>

      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 shrink-0 text-black/30 transition group-hover:translate-x-0.5 group-hover:text-emerald-600 dark:text-white/30 dark:group-hover:text-emerald-400"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </a>
  );
}
