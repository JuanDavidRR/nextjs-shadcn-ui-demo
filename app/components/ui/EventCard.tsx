import Image from "next/image";
import Link from "next/link";
import Heading from "@/app/components/ui/Heading";
import { WpCpt } from "@/lib/wp/custom-post-types";

export default function EventCard({ event }: { event: WpCpt }) {
  const tags = event.tags?.nodes ?? [];
  return (
    <li>
      <Link
        href={event.uri}
        className="grid grid-cols-2 gap-10 rounded-lg border border-gray-200 space-y-3 p-4 hover:shadow-lg transition-shadow h-full"
      >
        {event.featuredImage?.node?.sourceUrl && (
          <Image
            src={event.featuredImage.node.sourceUrl}
            alt={event.featuredImage.node.altText ?? ""}
            width={200}
            height={100}
            className="rounded-lg object-contain w-full h-auto mr-4"
            loading="lazy"
          />
        )}
        <div>
          <Heading as="h3" style={{ wordBreak: "break-word" }}>
            {event.title}
          </Heading>
          <p className="text-gray-700">
            {new Date(event.date).toLocaleDateString()}
          </p>
          {tags.length > 0 && (
            <p className="text-sm text-gray-500 ">
              {tags.map((t) => t.name).join(", ")}
            </p>
          )}
          {event.excerpt && (
            <div
              className="line-clamp-4"
              dangerouslySetInnerHTML={{ __html: event.excerpt }}
            />
          )}
        </div>
      </Link>
    </li>
  );
}
