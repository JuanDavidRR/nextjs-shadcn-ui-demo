"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { InfoIconTextItem } from "@/lib/wp/blocks";
import Heading from "../ui/Heading";

export default function InfoIconTextAccordion({
  items,
}: {
  items: InfoIconTextItem[];
}) {
  if (items.length === 0) return null;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-0"
      className="w-full"
    >
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>
            <Heading as="h4" className="text-lg">
              {item.title}
            </Heading>
          </AccordionTrigger>
          <AccordionContent>
            {item.description && (
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
