import type { WpEditorBlock } from "./types";
import { PageHeroData } from "./types/acfs";

export function parsePageHero(block: WpEditorBlock): PageHeroData | null {
  if (block.name !== "acf/page-hero") return null;
  if (!block.attributes?.data) return null;

  try {
    return JSON.parse(block.attributes.data) as PageHeroData;
  } catch {
    return null;
  }
}

export type SolutionsSliderData = {
  label: string;
  title: string;
  description: string;
  scheme: string;
  solutions: string[]; // array of post IDs
};

export function parseSolutionsSlider(
  block: WpEditorBlock,
): SolutionsSliderData | null {
  console.log("=== PARSE SOLUTIONS SLIDER ===");
  console.log("block.name:", block.name);
  console.log("block.attributes:", block.attributes);
  console.log("block.attributes?.data:", block.attributes?.data);

  if (block.name !== "acf/solutions-slider") {
    console.log("FAIL: name mismatch");
    return null;
  }
  if (!block.attributes?.data) {
    console.log("FAIL: no data");
    return null;
  }

  try {
    const raw = JSON.parse(block.attributes.data);
    console.log("parsed raw:", raw);
    return {
      label: raw.label ?? "",
      title: raw.title ?? "",
      description: raw.description ?? "",
      scheme: raw.scheme ?? "",
      solutions: Array.isArray(raw.solutions) ? raw.solutions : [],
    };
  } catch (e) {
    console.log("FAIL: JSON parse error", e);
    return null;
  }
}

export type QuoteSliderData = {
  scheme: string;
  title_tag: string;
  items: string[]; // array of quote IDs
  show_pagination: boolean;
};

export function parseQuoteSlider(block: WpEditorBlock): QuoteSliderData | null {
  console.log("=== PARSE QUOTE SLIDER ===");
  console.log("block.name:", block.name);
  console.log("block.attributes:", block.attributes);
  console.log("block.attributes?.data:", block.attributes?.data);

  if (block.name !== "acf/quote-slider") {
    console.log("FAIL: name mismatch");
    return null;
  }
  if (!block.attributes?.data) {
    console.log("FAIL: no data");
    return null;
  }

  try {
    const raw = JSON.parse(block.attributes.data);
    console.log("parsed raw:", raw);
    return {
      scheme: raw.scheme ?? "",
      title_tag: raw.title_tag ?? "h2",
      items: Array.isArray(raw.items) ? raw.items : [],
      show_pagination: raw.show_pagination === "1",
    };
  } catch (e) {
    console.log("FAIL: JSON parse error", e);
    return null;
  }
}

export type InfoIconTextItem = {
  title: string;
  description: string;
  icon: string;
};

export type InfoIconTextData = {
  title: string;
  background: string;
  alignment: string;
  items: InfoIconTextItem[];
};

export function parseInfoIconText(block: WpEditorBlock): InfoIconTextData | null {
  if (block.name !== "acf/info-icon-text") return null;
  if (!block.attributes?.data) return null;

  let raw: any;
  try {
    raw = JSON.parse(block.attributes.data);
  } catch {
    return null;
  }

  // Reconstruct the items array from flat keys
  const count = parseInt(raw.items ?? "0", 10);
  const items: InfoIconTextItem[] = [];
  for (let i = 0; i < count; i++) {
    const title = raw[`items_${i}_title`];
    if (!title) continue;
    items.push({
      title,
      description: raw[`items_${i}_description`] ?? "",
      icon: raw[`items_${i}_icon`] ?? "",
    });
  }

  return {
    title: raw.title ?? "",
    background: raw.background ?? "",
    alignment: raw.alignment ?? "left",
    items,
  };
}