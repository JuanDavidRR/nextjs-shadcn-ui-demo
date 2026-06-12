import { notFound } from "next/navigation";
import Image from "next/image";
import { WpPost, POST_FIELDS } from "@/lib/wp/post";
import { fetchCptByUri } from "@/lib/wp/custom-post-types";
import Heading from "@/app/components/ui/Heading";
import { cleanWpContent } from "@/lib/wp/sanitize";
import TableOfContents from "@/app/components/blocks/TableOfContent";
import { processContent } from "@/lib/wp/toc";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("=== BLOG POST HIT ===", slug);

  const uri = `/blog/${slug}/`;
  console.log("=== FETCHING URI ===", uri);

  const post = await fetchCptByUri<WpPost>({
    cptSingular: "post",
    uri,
    fields: POST_FIELDS,
  }).catch((err) => {
    console.error(`[build] Failed to fetch ${uri}:`, err.message);
    return null;
  });

  console.log("=== POST RESULT ===", post ? "FOUND: " + post.title : "NULL");

  if (!post) notFound();

  const cleaned = post.content ? cleanWpContent(post.content) : "";
  const { content, toc } = await processContent(cleaned);
  console.log("=== TOC RESULT ===", toc);
  console.log("=== CONTENT SAMPLE ===", content.substring(0, 1000));

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{post.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Heading className="mt-10" as="h1">{post.title}</Heading>

      <p className="mt-5">Meta title:{post.seo?.title}</p>
      <p>Meta description:{post.seo?.metaDesc}</p>

      <p className="text-gray-700 mt-5">
        {new Date(post.date).toLocaleDateString()}
      </p>

      {post.featuredImage?.node?.sourceUrl && (
        <Image
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText ?? ""}
          width={800}
          height={450}
          className="m-full h-auto my-10 rounded-lg object-cover"
        />
      )}

      {toc.length > 0 && (
        <div className="my-6">
          <TableOfContents toc={toc} />
        </div>
      )}

      {content && (
        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </main>
  );
}
