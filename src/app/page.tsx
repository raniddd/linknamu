import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";

const profile = {
  name: "김창우",
  bio: "비개발자 출신 바이브코더 | 요즘 AI 개발에 관심이 많아요",
  avatar: "/Profile.png",
};

const links = [
  { id: "github", icon: "🦊", title: "GitHub", url: "https://github.com/raniddd" },
  {
    id: "blog",
    icon: "✍️",
    title: "Blog",
    url: "https://blog.naver.com/road_to_happiness_",
  },
  {
    id: "linkedin",
    icon: "👤",
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/changwoo-kim-7a553a139/",
  },
  { id: "email", icon: "✉️", title: "e-mail", url: "mailto:kcw3010@gmail.com" },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-16 sm:px-8 sm:py-20">
      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        avatar={profile.avatar}
      />

      <nav aria-label="링크 목록" className="mt-12 flex flex-col gap-4 sm:mt-14">
        {links.map((link) => (
          <LinkCard
            key={link.id}
            icon={link.icon}
            title={link.title}
            url={link.url}
          />
        ))}
      </nav>

      <footer className="mt-auto pt-12 text-center text-[0.6875rem] tracking-wide text-foreground/35">
        <p>🌳 링크나무로 만든 페이지</p>
      </footer>
    </main>
  );
}
