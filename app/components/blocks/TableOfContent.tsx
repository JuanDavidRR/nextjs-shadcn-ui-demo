"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TocItem } from "@/lib/wp/toc";

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (toc.length === 0) return null;

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", `#${id}`);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Table of contents</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80">
        {toc.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onSelect={() => scrollTo(item.id)}
            className={
              item.level === 3
                ? "pl-6 text-sm text-gray-600 cursor-pointer"
                : "font-medium cursor-pointer"
            }
          >
            {item.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
