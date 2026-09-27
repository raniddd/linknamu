export type SiteLink = {
  id: string;
  icon: string;
  title: string;
  url: string;
};

export const links: SiteLink[] = [
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

/** API가 임의의 id로 문서를 만들지 못하게 막는 화이트리스트 */
export const linkIds = new Set(links.map((link) => link.id));
