type LinkCardProps = {
  title: string;
  description?: string;
  url: string;
  /** 제목 앞에 붙는 이모지 */
  icon?: string;
  /** 누적 클릭 수. 데이터를 받기 전에는 0 */
  count?: number;
  onClick?: () => void;
};

export default function LinkCard({
  title,
  description,
  url,
  icon,
  count,
  onClick,
}: LinkCardProps) {
  /* mailto:, tel: 등은 새 탭으로 열지 않는다 */
  const isExternal = url.startsWith("http://") || url.startsWith("https://");

  return (
    <a
      href={url}
      onClick={onClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex items-center justify-between gap-4 rounded-[1.375rem] border border-white/70 bg-white/55 px-5 py-4 shadow-[0_10px_28px_-18px_rgba(97,58,29,0.55)] backdrop-blur-xl transition duration-200 ease-out hover:-translate-y-px hover:border-white/90 hover:bg-white/75 hover:shadow-[0_14px_32px_-16px_rgba(97,58,29,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-6 sm:py-[1.125rem] dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-white/20 dark:hover:bg-white/[0.1]"
    >
      <span className="flex min-w-0 items-center gap-3.5">
        {icon && (
          <span aria-hidden className="shrink-0 text-xl leading-none">
            {icon}
          </span>
        )}

        <span className="min-w-0">
          <span className="block truncate font-semibold tracking-[-0.01em]">
            {title}
          </span>
          {description && (
            <span className="mt-0.5 block truncate text-sm text-foreground/50">
              {description}
            </span>
          )}
        </span>
      </span>

      <span className="flex shrink-0 items-center gap-2.5">
        {count !== undefined && (
          <span className="text-xs tabular-nums text-foreground/40">
            {count.toLocaleString("ko-KR")}회
          </span>
        )}

        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-[1.125rem] shrink-0 text-foreground/25 transition duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-accent motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        >
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </span>
    </a>
  );
}
