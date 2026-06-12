import { notFound } from "next/navigation";
import { getPage } from "@/lib/wp/page";
import Heading from "../components/ui/Heading";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogDemo } from "../components/blocks/Dialog";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const uri = `/${slug.join("/")}`;

  const page = await getPage(uri).catch((err) => {
    console.error(`[build] Failed to fetch ${uri}:`, err.message);
    return null;
  });

  if (!page) notFound();

  const seo = page.seo;

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <Heading as="h1">{page.title}</Heading>

      {seo && (
        <div className="my-6">
          <DialogDemo
            triggerLabel="View SEO data"
            contentClassName="sm:max-w-2xl"
          >
            <DialogHeader>
              <DialogTitle>SEO data</DialogTitle>
              <DialogDescription>
                Metadata returned by Yoast for this page.
              </DialogDescription>
            </DialogHeader>

            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-semibold">Title</dt>
                <dd className="text-gray-700">{seo.title ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-semibold">Meta description</dt>
                <dd className="text-gray-700">{seo.metaDesc ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-semibold">Canonical</dt>
                <dd className="text-gray-700 break-all">
                  {seo.canonical ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">OG title</dt>
                <dd className="text-gray-700">{seo.opengraphTitle ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-semibold">OG description</dt>
                <dd className="text-gray-700">
                  {seo.opengraphDescription ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">OG image</dt>
                <dd className="text-gray-700 break-all">
                  {seo.opengraphImage?.sourceUrl ?? "—"}
                </dd>
              </div>
            </dl>
          </DialogDemo>
        </div>
      )}

      <pre className="mt-6">{JSON.stringify(page, null, 2)}</pre>
    </main>
  );
}
