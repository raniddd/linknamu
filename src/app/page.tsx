import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";

/* TODO: 실제 내용으로 교체 — 지금은 화면 확인용 더미 값 */
const profile = {
  name: "김창우",
  bio: "세계 최강 바이브코더",
  avatar: "/avatar-placeholder.svg",
};

const links = [
  { id: "github", title: "GitHub", description: "코드와 사이드 프로젝트", url: "#" },
  { id: "linkedin", title: "LinkedIn", description: "경력과 커리어 소식", url: "#" },
  { id: "blog", title: "Blog", description: "AI와 개발에 대한 기록", url: "#" },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 py-12 sm:py-16">
      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        avatar={profile.avatar}
      />

      <nav aria-label="링크 목록" className="mt-10 flex flex-col gap-4">
        {links.map((link) => (
          <LinkCard
            key={link.id}
            title={link.title}
            description={link.description}
            url={link.url}
          />
        ))}
      </nav>

      <footer className="mt-auto pt-12 text-center text-xs text-black/40 dark:text-white/40">
        <p>🌳 링크나무로 만든 페이지</p>
      </footer>
    </main>
  );
}
