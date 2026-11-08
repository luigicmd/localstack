import type { Faq as FaqItem, Option, Tool } from "@/lib/types";
import { type Crumb, Breadcrumbs } from "./Breadcrumbs";
import { Faq } from "./Faq";
import { Picks } from "./Picks";
import { ToolTable } from "./ToolTable";
import { type Picks as PicksData, defaultOrder, monthYear, toRow, latestUpdate } from "@/lib/queries";

// Shared layout for industry, problem and industry x problem pages.
export function ListingPage({
  crumbs,
  title,
  intro,
  tools,
  picks,
  faq,
  problemOptions,
  industryOptions = [],
}: {
  crumbs: Crumb[];
  title: string;
  intro: string;
  tools: Tool[];
  picks: PicksData;
  faq: FaqItem[];
  problemOptions: Option[];
  industryOptions?: Option[];
}) {
  const rows = defaultOrder(tools).map(toRow);
  return (
    <div className="wrap">
      <Breadcrumbs items={crumbs} />
      <div className="page-head">
        <h1>{title}</h1>
        <p className="meta">
          Updated {monthYear(latestUpdate(tools))} · {tools.length} {tools.length === 1 ? "tool" : "tools"}
        </p>
        <p className="intro">{intro}</p>
      </div>

      {picks.length ? (
        <section className="section" aria-labelledby="picks-h">
          <div className="section-head" style={{ borderBottom: 0 }}>
            <h2 id="picks-h">Our picks</h2>
          </div>
          <Picks picks={picks} />
        </section>
      ) : null}

      <section className="section" aria-labelledby="compare-h">
        <div className="section-head" style={{ borderBottom: 0 }}>
          <h2 id="compare-h">Compare all {tools.length}</h2>
        </div>
        <ToolTable rows={rows} problemOptions={problemOptions} industryOptions={industryOptions} />
      </section>

      <section className="section" aria-labelledby="faq-h">
        <div className="section-head" style={{ borderBottom: 0 }}>
          <h2 id="faq-h">Questions people ask</h2>
        </div>
        <Faq items={faq} />
      </section>
    </div>
  );
}
