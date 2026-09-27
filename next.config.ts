import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        /*
         * 자체 호스팅 폰트는 public/ 기본값이 max-age=0 이라 매 방문마다 재검증한다.
         * 파일명이 Pretendard 버전에 묶여 있으므로 길게 캐시하고,
         * 폰트 버전을 올릴 때는 public/fonts/ 아래 폴더명을 함께 바꿀 것.
         */
        source: "/fonts/pretendard/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
