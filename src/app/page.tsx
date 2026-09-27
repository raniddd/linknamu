import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { links } from "@/lib/links";

const profile = {
  name: "김창우",
  bio: "비개발자 출신 바이브코더 | 요즘 AI 개발에 관심이 많아요",
  avatar: "/Profile.png",
};

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-16 sm:px-8 sm:py-20">
      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        avatar={profile.avatar}
      />

      <LinkList links={links} />

      <footer className="mt-auto pt-12 text-center text-[0.6875rem] tracking-wide text-foreground/35">
        <p>🌳 링크나무로 만든 페이지</p>
      </footer>
    </main>
  );
}
