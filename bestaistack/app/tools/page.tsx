import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolsExplorer } from "@/components/ToolsExplorer";
import { industries, problems } from "@/lib/data";
import { defaultOrder, latestUpdate, monthYear, published, toRow } from "@/lib/queries";

export const metadata: Metadata = {
  title: "All AI Tools for Small Businesses",
  description: "Every AI tool we list for small businesses. Search and sort by name, price or date added, and filter by industry, problem or free plan.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  const all = published();
  return (
    <div className="wrap">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All tools" }]} />
      <div className="page-head">
        <h1>All tools</h1>
        <p className="meta">Updated {monthYear(latestUpdate(all))} · {all.length} tools</p>
      </div>
      <section className="section" style={{ paddingTop: 24 }}>
        <Suspense fallback={<p className="meta">Loading…</p>}>
          <ToolsExplorer
            rows={defaultOrder(all).map(toRow)}
            industryOptions={industries.map((i) => ({ slug: i.slug, name: i.short }))}
            problemOptions={problems.map((p) => ({ slug: p.slug, name: p.name }))}
          />
        </Suspense>
      </section>
    </div>
  );
}
