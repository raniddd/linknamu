import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  /** public/ 아래 이미지 경로 또는 허용된 외부 이미지 URL */
  avatar: string;
};

export default function ProfileHeader({
  name,
  bio,
  avatar,
}: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative">
        {/* 사진 뒤에 깔리는 은은한 살구빛 광 — 입체감용 */}
        <span
          aria-hidden
          className="absolute -inset-4 rounded-full bg-accent/25 blur-2xl dark:bg-accent/15"
        />

        <Image
          src={avatar}
          alt={`${name} 프로필 사진`}
          width={320}
          height={320}
          className="relative size-28 rounded-full object-cover shadow-[0_18px_36px_-14px_rgba(97,58,29,0.55)] ring-4 ring-white/80 sm:size-32 dark:shadow-[0_18px_36px_-14px_rgba(0,0,0,0.7)] dark:ring-white/12"
          priority
        />
      </div>

      <h1 className="mt-6 text-[1.75rem] font-bold tracking-[-0.02em] sm:text-3xl">
        {name}
      </h1>
      <p className="mt-2.5 max-w-[21rem] text-balance break-keep text-[0.9375rem] leading-relaxed text-foreground/55 sm:text-base">
        {bio}
      </p>
    </header>
  );
}
