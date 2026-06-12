import { WpPost, POST_LIST_FIELDS } from "@/lib/wp/post";
import { fetchCptList } from "@/lib/wp/custom-post-types";
import Heading from "../components/ui/Heading";
import BlogCard from "../components/ui/BlogCard";

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function BlogListPage() {
  const posts = await fetchCptList<WpPost>({
    cptPlural: "posts",
    fields: POST_LIST_FIELDS,
    first: 20,
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <Heading as="h1" className="mb-10">
        Blog
      </Heading>

      {posts.length === 0 && <p>No posts yet.</p>}

      <ul className="grid md:grid-cols-3 gap-10">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </ul>
    </main>
  );
}
