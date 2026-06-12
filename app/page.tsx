import { notFound } from "next/navigation";
import { getPage } from "@/lib/wp/page";
import Heading from "./components/ui/Heading";
import {
  parseInfoIconText,
  parsePageHero,
  parseQuoteSlider,
  parseSolutionsSlider,
} from "@/lib/wp/blocks";
import { getMedia } from "@/lib/wp/media";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  fetchCptById,
  QUOTE_FIELDS,
  WpCpt,
  WpQuote,
} from "@/lib/wp/custom-post-types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuoteSliderTabs from "./components/ui/QuotesTabs";
import InfoIconTextAccordion from "./components/blocks/Accordion";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDemo } from "./components/blocks/Dialog";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return [{ locale: [] }, { locale: ["es"] }, { locale: ["zh-hans"] }];
}

export default async function HomePage() {
  const page = await getPage("/");
  if (!page) notFound();

  const heroBlock = page.editorBlocks.find((b) => b.name === "acf/page-hero");
  const hero = heroBlock ? parsePageHero(heroBlock) : null;
  const heroImage = hero?.image ? await getMedia(hero.image) : null;

  const sliderBlock = page.editorBlocks.find(
    (b) => b.name === "acf/solutions-slider",
  );
  const slider = sliderBlock ? parseSolutionsSlider(sliderBlock) : null;
  const sliderItems = slider
    ? await Promise.all(
        slider.solutions.map((id) =>
          fetchCptById<WpCpt>({
            cptSingular: "pressRelease",
            id,
            fields: `id title uri date excerpt
            featuredImage { node { sourceUrl altText } }
            solutionTerms { nodes { name slug } }`,
          }),
        ),
      )
    : [];

  const quoteSliderBlock = page.editorBlocks.find(
    (b) => b.name === "acf/quote-slider",
  );
  const quoteSlider = quoteSliderBlock
    ? parseQuoteSlider(quoteSliderBlock)
    : null;
  const quoteItems = quoteSlider
    ? await Promise.all(
        quoteSlider.items.map((id) =>
          fetchCptById<WpQuote>({
            cptSingular: "quote",
            id,
            fields: QUOTE_FIELDS,
          }),
        ),
      )
    : [];

  const infoIconTextBlock = page.editorBlocks.find(
    (b) => b.name === "acf/info-icon-text",
  );
  const infoIconText = infoIconTextBlock
    ? parseInfoIconText(infoIconTextBlock)
    : null;
  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <Heading as="h1">{page.title}</Heading>
      {hero && (
        <section className=" flex flex-col md:flex-row items-center gap-8 my-10">
          <div className="flex-1 space-y-3">
            <Heading as="h2">{hero.title}</Heading>

            <p className="text-lg mb-5">{hero.description}</p>
            {hero.link?.url && (
              <DialogDemo
              triggerVariant="default"
                triggerLabel={hero.link.title}
                contentClassName="max-w-5xl"
              >
                <DialogHeader>
                  <DialogTitle>Get in touch</DialogTitle>
                </DialogHeader>

                <form className="w-full mx-auto py-10 px-4 shadow-lg rounded-2xl border-gray-200 border-2">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="form-name">Name</FieldLabel>
                      <Input
                        id="form-name"
                        type="text"
                        placeholder="Evil Rabbit"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="form-email">Email</FieldLabel>
                      <Input
                        id="form-email"
                        type="email"
                        placeholder="john@example.com"
                      />
                      <FieldDescription>
                        We&apos;ll never share your email with anyone.
                      </FieldDescription>
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field>
                        <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
                        <Input
                          id="form-phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                        />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="form-country">Country</FieldLabel>
                        <Select defaultValue="us">
                          <SelectTrigger id="form-country">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel htmlFor="form-address">Address</FieldLabel>
                      <Input
                        id="form-address"
                        type="text"
                        placeholder="123 Main St"
                      />
                    </Field>
                  </FieldGroup>
                </form>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                  <Button>Send</Button>
                </DialogFooter>
              </DialogDemo>
            )}
          </div>
          <div className="flex-1">
            {heroImage && (
              <Image
                src={heroImage.sourceUrl}
                alt={heroImage.altText}
                width={heroImage.mediaDetails.width}
                height={heroImage.mediaDetails.height}
              />
            )}
          </div>
        </section>
      )}

      {slider && sliderItems.length > 0 && (
        <section>
          {slider.title && (
            <Heading as="h2" className="my-10">
              {slider.title}
            </Heading>
          )}
          {slider.description && <p>{slider.description}</p>}
          <ul className="grid grid-cols-3 gap-10 ">
            {sliderItems.map(
              (item, i) =>
                item && (
                  <li key={i}>
                    <Card className="mx-auto">
                      <div className="" />
                      {item.featuredImage?.node?.sourceUrl && (
                        <Image
                          src={item.featuredImage.node.sourceUrl}
                          alt={item.featuredImage.node.altText}
                          width={400}
                          height={200}
                          className="object-cover aspect-video w-full h-auto"
                        />
                      )}
                      <CardHeader>
                        {item.solutionTerms?.nodes?.[0] && (
                          <CardAction>
                            <Badge variant="destructive">
                              {item.solutionTerms.nodes[0].name}
                            </Badge>
                          </CardAction>
                        )}
                        <CardTitle>
                          <h3>
                            <a href={item.uri}>{item.title}</a>
                          </h3>
                        </CardTitle>
                        {item.excerpt && (
                          <CardDescription
                            dangerouslySetInnerHTML={{ __html: item.excerpt }}
                          />
                        )}
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full">
                          <Link href={item.uri} target="_blank">
                            View post
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </li>
                ),
            )}
          </ul>
        </section>
      )}

      {quoteSlider && quoteItems.length > 0 && (
        <section className="my-10">
          <QuoteSliderTabs items={quoteItems} />
        </section>
      )}

      {infoIconText && infoIconText.items.length > 0 && (
        <section className="my-20 flex flex-col md:flex-row items-center gap-12">
          {infoIconText.title && (
            <Heading as="h2" className="text-center mb-10">
              {infoIconText.title}
            </Heading>
          )}
          <InfoIconTextAccordion items={infoIconText.items} />
        </section>
      )}

      {/* <pre className="mt-10">{JSON.stringify(page, null, 2)}</pre> */}
    </main>
  );
}
