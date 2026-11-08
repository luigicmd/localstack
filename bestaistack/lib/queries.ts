import { industries, problems, tools } from "./data";
import type { Faq, Industry, PricingModel, Problem, Tool } from "./types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bestaistack.com";

export const published = (): Tool[] => tools.filter((t) => t.status === "published");

export const getTool = (slug: string) => published().find((t) => t.slug === slug);
export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
export const getProblem = (slug: string) => problems.find((p) => p.slug === slug);

export const toolsFor = (opts: { industry?: string; problem?: string }): Tool[] =>
  published().filter(
    (t) =>
      (!opts.industry || t.industries.includes(opts.industry)) &&
      (!opts.problem || t.problems.includes(opts.problem)),
  );

export const byNewest = (list: Tool[]) =>
  [...list].sort((a, b) => b.created_at.localeCompare(a.created_at));

export const latestUpdate = (list: Tool[] = published()): string =>
  list.reduce((max, t) => (t.updated_at > max ? t.updated_at : max), "2000-01-01");

export function monthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function shortDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function priceLabel(t: Tool): string {
  if (t.pricing_model === "free" || t.starting_price_usd === 0) return "Free";
  if (t.pricing_model === "one-time") return "$" + t.starting_price_usd + " once";
  return "$" + t.starting_price_usd + "/mo";
}

export const pricingModelLabel: Record<PricingModel, string> = {
  free: "Free",
  freemium: "Freemium",
  subscription: "Subscription",
  "one-time": "One-time payment",
};

export function industryNames(t: Tool): string {
  if (t.industries.length === industries.length) return "Any small business";
  return t.industries.map((s) => getIndustry(s)?.short ?? s).join(", ");
}

export const industryCount = (slug: string) => toolsFor({ industry: slug }).length;
export const problemCount = (slug: string) => toolsFor({ problem: slug }).length;

// Industry x problem combinations that have at least one tool.
export function comboParams(): { slug: string; problem: string }[] {
  const out: { slug: string; problem: string }[] = [];
  for (const i of industries)
    for (const p of problems)
      if (toolsFor({ industry: i.slug, problem: p.slug }).length > 0)
        out.push({ slug: i.slug, problem: p.slug });
  return out;
}

export type Picks = { label: string; tool: Tool }[];

// Auto picks for problem and combo pages (industry pages use editable picks in data.ts).
export function autoPicks(list: Tool[]): Picks {
  const used = new Set<string>();
  const take = (candidates: Tool[]) => {
    const t = candidates.find((c) => !used.has(c.slug));
    if (t) used.add(t.slug);
    return t;
  };
  const overall = take(
    [...list].sort(
      (a, b) => Number(b.featured) - Number(a.featured) || b.starting_price_usd - a.starting_price_usd,
    ),
  );
  const budget = take(
    list.filter((t) => t.starting_price_usd > 0).sort((a, b) => a.starting_price_usd - b.starting_price_usd),
  );
  const free = take(list.filter((t) => t.has_free_plan));
  const picks: Picks = [];
  if (overall) picks.push({ label: "Best overall", tool: overall });
  if (budget) picks.push({ label: "Best on a budget", tool: budget });
  if (free) picks.push({ label: "Best free option", tool: free });
  return picks;
}

export function industryPicks(ind: Industry): Picks {
  const pairs: [string, string][] = [
    ["Best overall", ind.picks.best_overall],
    ["Best on a budget", ind.picks.best_budget],
    ["Best free option", ind.picks.best_free],
  ];
  return pairs.flatMap(([label, slug]) => {
    const tool = getTool(slug);
    return tool ? [{ label, tool }] : [];
  });
}

export const joinNames = (names: string[]) =>
  names.length <= 1
    ? (names[0] ?? "")
    : names.slice(0, -1).join(", ") + " and " + names[names.length - 1];

// Plain-English FAQ for problem and industry x problem pages, built from the data.
export function generatedFaq(subject: string, list: Tool[]): Faq[] {
  const picks = autoPicks(list);
  const free = list.filter((t) => t.has_free_plan).map((t) => t.name);
  const prices = list.map((t) => t.starting_price_usd);
  const lc = subject.toLowerCase();
  return [
    {
      q: "What is the best AI tool for " + lc + "?",
      a: picks[0]
        ? picks[0].tool.name + " is our top pick. " + picks[0].tool.tagline
        : "We have no tool listed for this yet.",
    },
    {
      q: "Is there a free AI tool for " + lc + "?",
      a: free.length
        ? "Yes. " + joinNames(free) + (free.length === 1 ? " has" : " have") + " a free plan. Free plans usually cap volume, not features."
        : "Not at the moment. Every tool listed here charges from day one.",
    },
    {
      q: "How much do these tools cost?",
      a: "Between $" + Math.min(...prices) + " and $" + Math.max(...prices) + " to start, depending on the tool and whether it bills monthly or once. The table shows exact prices.",
    },
    {
      q: "Do I need technical skills to use them?",
      a: "No. Each tool here is built for owners who have never written code. Most take under an hour to set up.",
    },
    {
      q: "How did you pick these tools?",
      a: "We look at what the tool does, what it costs, who it suits, and what it does badly. The About page has the full method and how we make money.",
    },
  ];
}

export function visitLink(t: Tool): { href: string; rel: string } {
  return t.affiliate_url
    ? { href: t.affiliate_url, rel: "sponsored noopener" }
    : { href: t.website_url, rel: "noopener" };
}

import type { ToolRowData } from "./types";

export function toRow(t: Tool): ToolRowData {
  const bestFor = industryNames(t);
  const probNames = t.problems.map((s) => getProblem(s)?.name ?? s);
  return {
    slug: t.slug,
    name: t.name,
    initials: initials(t.name),
    logo_url: t.logo_url,
    tagline: t.tagline,
    best_for: bestFor,
    price_label: priceLabel(t),
    price: t.pricing_model === "free" ? 0 : t.starting_price_usd,
    pricing_model: t.pricing_model,
    has_free_plan: t.has_free_plan,
    featured: t.featured,
    problems: t.problems,
    industries: t.industries,
    created_at: t.created_at,
    added_label: shortDate(t.created_at),
    haystack: [t.name, t.tagline, t.description, bestFor, probNames.join(" ")].join(" ").toLowerCase(),
  };
}

// Featured first, then A to Z. Default order on listing pages.
export const defaultOrder = (list: Tool[]) =>
  [...list].sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
