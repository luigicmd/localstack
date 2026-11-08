export type PricingModel = "free" | "freemium" | "subscription" | "one-time";

export type Tool = {
  name: string;
  slug: string;
  website_url: string;
  affiliate_url: string | null;
  tagline: string;
  description: string;
  limitations: string;
  industries: string[]; // industry slugs
  problems: string[]; // problem slugs
  pricing_model: PricingModel;
  starting_price_usd: number;
  has_free_plan: boolean;
  logo_url: string | null;
  featured: boolean;
  status: "published" | "pending";
  created_at: string; // ISO date
  updated_at: string; // ISO date
};

export type Faq = { q: string; a: string };

export type Industry = {
  name: string;
  short: string;
  slug: string;
  intro_text: string;
  picks: { best_overall: string; best_budget: string; best_free: string }; // tool slugs
  faq: Faq[];
};

export type Problem = {
  name: string;
  slug: string;
  intro_text: string;
};

// Flat, serialisable row passed from server pages to client tables.
export type ToolRowData = {
  slug: string;
  name: string;
  initials: string;
  logo_url: string | null;
  tagline: string;
  best_for: string;
  price_label: string;
  price: number;
  pricing_model: PricingModel;
  has_free_plan: boolean;
  featured: boolean;
  problems: string[];
  industries: string[];
  created_at: string;
  added_label: string;
  haystack: string;
};

export type Option = { slug: string; name: string };
