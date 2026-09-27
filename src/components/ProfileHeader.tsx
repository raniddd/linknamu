import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  /** public/ 아래 이미지 경로 */
  avatar: string;
};

export default function ProfileHeader({
  name,
  bio,
  avatar,
}: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={avatar}
        alt={`${name} 프로필 사진`}
        width={160}
        height={160}
        className="size-32 rounded-full object-cover ring-1 ring-black/5 sm:size-36 dark:ring-white/10"
        priority
      />

      <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
        {name}
      </h1>
      <p className="mt-2 text-sm text-black/60 sm:text-base dark:text-white/60">
        {bio}
      </p>
    </header>
  );
}
