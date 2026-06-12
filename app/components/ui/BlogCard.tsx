import Image from "next/image";
import Link from "next/link";
import Heading from "@/app/components/ui/Heading";
import { WpPost } from "@/lib/wp/post";

export default function BlogCard({ post }: { post: WpPost }) {
  return (
    <li>
      <Link
        href={post.uri}
        className="block rounded-lg border border-gray-200 space-y-3 p-4 hover:shadow-lg transition-shadow h-full"
      >
        {post.featuredImage?.node?.sourceUrl && (
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText ?? ""}
            width={400}
            height={225}
            sizes="(max-width: 768px) 100vw, 400px"
            className="rounded-lg object-cover w-full h-auto"
            loading="lazy"
          />
        )}
        <Heading as="h3" style={{ wordBreak: "break-word" }}>
          {post.title}
        </Heading>
        <p className="text-gray-700">
          {new Date(post.date).toLocaleDateString()}
        </p>
        {post.categories.nodes.length > 0 && (
          <p className="text-sm text-gray-500">
            {post.categories.nodes.map((c) => c.name).join(", ")}
          </p>
        )}
        {post.excerpt && (
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        )}
      </Link>
    </li>
  );
}
