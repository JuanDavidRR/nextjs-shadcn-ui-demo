import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";

export type TocItem = { id: string; text: string; level: 2 | 3 };

export async function processContent(html: string): Promise<{
    content: string;
    toc: TocItem[];
}> {
    if (!html) return { content: "", toc: [] };

    const toc: TocItem[] = [];

    const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeSlug)
        .use(() => (tree) => {
            visit(tree, "element", (node: any) => {
                if (node.tagName === "h2" || node.tagName === "h3") {
                    const id = node.properties?.id;
                    const text = getText(node);
                    if (id && text) {
                        toc.push({
                            id,
                            text,
                            level: node.tagName === "h2" ? 2 : 3,
                        });
                    }
                }
            });
        })
        .use(rehypeStringify)
        .process(html);

    return {
        content: String(file),
        toc,
    };
}

function getText(node: any): string {
    if (node.type === "text") return node.value || "";
    if (!node.children) return "";
    return node.children.map(getText).join("").trim();
}