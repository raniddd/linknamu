"use client";

import { useEffect, useState } from "react";

import LinkCard from "@/components/LinkCard";
import type { SiteLink } from "@/lib/links";

type LinkListProps = {
  links: SiteLink[];
};

export default function LinkList({ links }: LinkListProps) {
  /* 데이터가 오기 전에는 전부 0회. 서버 렌더 결과와 같아야 hydration 경고가 안 난다. */
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(links.map((link) => [link.id, 0])),
  );

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { signal: controller.signal, cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { counts: Record<string, number> }) => {
        setCounts((prev) => ({ ...prev, ...data.counts }));
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        // 집계는 부가 정보라, 실패해도 링크 자체는 쓸 수 있게 0회로 둔다.
        console.error("[clicks] 불러오기 실패", error);
      });

    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    /* 낙관적 갱신: 서버 응답을 기다리지 않고 화면부터 올린다. */
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      /* 새 탭이 열리거나 메일 앱으로 전환돼도 요청이 중간에 끊기지 않게 한다. */
      keepalive: true,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { id: string; count: number }) => {
        // 서버가 확정한 값으로 맞춘다 (다른 사람이 동시에 눌렀을 수 있다).
        setCounts((prev) => ({ ...prev, [data.id]: data.count }));
      })
      .catch((error: unknown) => {
        console.error("[clicks] 기록 실패", error);
        setCounts((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 1) - 1) }));
      });
  }

  return (
    <nav aria-label="링크 목록" className="mt-12 flex flex-col gap-4 sm:mt-14">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          icon={link.icon}
          title={link.title}
          url={link.url}
          count={counts[link.id] ?? 0}
          onClick={() => handleClick(link.id)}
        />
      ))}
    </nav>
  );
}
