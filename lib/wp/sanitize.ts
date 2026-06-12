// lib/wp/sanitize.ts
export function cleanWpContent(html: string): string {
  return html
    .replace(/<p>(&nbsp;|\s)*<\/p>/gi, "") // empty paragraphs
    .replace(/style="[^"]*"/gi, "") // inline styles
    .replace(/class="wp-[^"]*"/gi, ""); // wp-* classes (optional)
}
