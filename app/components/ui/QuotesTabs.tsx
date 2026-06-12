"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import type { WpQuote } from "@/lib/wp/custom-post-types";

export default function QuoteSliderTabs({
  items,
}: {
  items: (WpQuote | null)[];
}) {
  const valid = items.filter((i): i is WpQuote => i !== null);
  if (valid.length === 0) return null;

  return (
    <Tabs defaultValue="quote-0" className="w-full my-20">
      <TabsList className="flex justify-between w-full gap-2 h-auto pointer mb-4">
        {valid.map((item, i) => (
          <TabsTrigger key={i} value={`quote-${i}`}>
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {valid.map((item, i) => (
        <TabsContent key={i} value={`quote-${i}`}>
          <Card>
            <CardHeader>
              {item.quoteOptions?.companyLogo?.node?.sourceUrl && (
                <Image
                  src={item.quoteOptions.companyLogo.node.sourceUrl}
                  alt={item.quoteOptions.companyLogo.node.altText || item.title}
                  width={120}
                  height={40}
                  className="md:text-center mx-auto py-10 object-contain"
                />
              )}
              {item.excerpt && (
                <CardDescription className="md:w-[50%] text-lg italic mb-10 mx-auto"
                  dangerouslySetInnerHTML={{ __html: item.excerpt }}
                />
              )}
            </CardHeader>
            <CardFooter className="flex-col items-center">
              <p className="font-semibold">{item.title}</p>
              {item.quoteOptions?.jobTitle && (
                <p className="text-sm text-gray-800">
                  {item.quoteOptions.jobTitle}
                </p>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
