const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

type FetchArgs = {
  query: string;
  variables?: Record<string, unknown>;
  revalidate?: number;
  tags?: string[];
};

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function wpFetch<T>({
  query,
  variables,
  revalidate = 3600,
  tags,
}: FetchArgs): Promise<T> {
  const MAX_ATTEMPTS = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(WP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
        next: { revalidate, tags },
        signal: AbortSignal.timeout(30000), // 30s per attempt
      });

      if (!res.ok) {
        const body = await res.text();
        console.error(`WP HTTP ${res.status} from ${WP_URL}`);
        console.error("Response body:", body.substring(0, 500));
        console.error("Query was:", query.substring(0, 300));
        throw new Error(`WPGraphQL HTTP ${res.status}`);
      }

      const json = await res.json();
      if (json.errors) {
        console.error(
          "WPGraphQL errors:",
          JSON.stringify(json.errors, null, 2),
        );
        throw new Error("WPGraphQL returned errors");
      }
      return json.data as T;
    } catch (e: any) {
      lastError = e;
      console.warn(
        `WP fetch attempt ${attempt}/${MAX_ATTEMPTS} failed:`,
        e.message,
      );
      if (attempt < MAX_ATTEMPTS) {
        await sleep(2000 * attempt); // 2s, 4s, then give up
      }
    }
  }

  throw lastError ?? new Error("WPGraphQL fetch failed");
}
