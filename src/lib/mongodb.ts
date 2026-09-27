import { MongoClient, type Db } from "mongodb";

/**
 * 개발 모드에서는 파일을 고칠 때마다 모듈이 다시 평가된다.
 * 커넥션을 모듈 스코프에만 두면 그때마다 새로 연결돼 Atlas 커넥션이 금방 바닥나므로,
 * hot reload를 타지 않는 globalThis에 Promise를 캐시한다.
 */
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
  /** 캐시된 커넥션이 어떤 URI로 만들어졌는지 — URI가 바뀌면 다시 연결한다 */
  _mongoUri?: string;
};

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 없습니다. .env.local을 확인하세요.");
  }

  const cached = globalForMongo._mongoClientPromise;
  if (cached && globalForMongo._mongoUri === uri) return cached;

  const created = new MongoClient(uri).connect();
  globalForMongo._mongoClientPromise = created;
  globalForMongo._mongoUri = uri;

  /*
   * 실패한 Promise를 캐시에 남겨두면 이후 모든 요청이 같은 에러를 재사용해서,
   * 일시적인 DNS/네트워크 오류 뒤에도 서버를 재시작해야만 복구된다.
   * 캐시를 비워 다음 요청이 새로 연결을 시도하게 한다.
   */
  created.catch(() => {
    if (globalForMongo._mongoClientPromise === created) {
      globalForMongo._mongoClientPromise = undefined;
      globalForMongo._mongoUri = undefined;
    }
  });

  return created;
}

/** URI 경로에 지정된 DB(linknamu)를 돌려준다. */
export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db();
}

/** 링크별 클릭 수 문서: { _id: "github", count: 42 } */
export type ClickDoc = {
  _id: string;
  count: number;
};

export async function getClicksCollection() {
  const db = await getDb();
  return db.collection<ClickDoc>("clicks");
}
