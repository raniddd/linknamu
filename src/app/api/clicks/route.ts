import { NextResponse } from "next/server";

import { linkIds } from "@/lib/links";
import { getClicksCollection } from "@/lib/mongodb";

/** 아직 한 번도 안 눌린 링크도 0으로 채워서, 응답에 항상 모든 링크가 들어가게 한다. */
function emptyCounts(): Record<string, number> {
  return Object.fromEntries([...linkIds].map((id) => [id, 0]));
}

/** GET /api/clicks — 모든 링크의 클릭 수를 한 번에 반환 */
export async function GET() {
  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({}).toArray();

    const counts = emptyCounts();
    for (const doc of docs) {
      // 화이트리스트에 없는 옛 문서는 무시
      if (doc._id in counts) counts[doc._id] = doc.count;
    }

    return NextResponse.json({ counts });
  } catch (error) {
    console.error("[clicks] 조회 실패", error);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

/** POST /api/clicks — { id } 링크의 클릭 수를 1 올리고, 올라간 값을 반환 */
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const id =
    typeof body === "object" && body !== null && "id" in body
      ? (body as { id: unknown }).id
      : undefined;

  if (typeof id !== "string" || !linkIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크 id입니다." }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    const doc = await clicks.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );

    return NextResponse.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("[clicks] 증가 실패", error);
    return NextResponse.json({ error: "클릭을 기록하지 못했습니다." }, { status: 500 });
  }
}
