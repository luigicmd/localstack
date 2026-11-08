import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Logo } from "@/components/Logo";
import { ToolTable } from "@/components/ToolTable";
import { industries, problems } from "@/lib/data";
import {
  getTool, initials, pricingModelLabel, priceLabel, published, shortDate, toRow, visitLink, getIndustry, getProblem,
} from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => published().map((t) => ({ slug: t.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTool((await params).slug);
  if (!t) return {};
  const first = t.industries.map((s) => getIndustry(s)?.short).filter(Boolean)[0];
  return {
    title: t.name + ": price, pros and what to watch out for",
    description: t.name + ": " + t.tagline + " From " + priceLabel(t) + (t.has_free_plan ? ", free plan available" : "") + (first ? ". Good for " + first.toLowerCase() + " and more." : "."),
    alternates: { canonical: "/tool/" + t.slug },
  };
}

export default async function ToolPage({ params }: Props) {
  const t = getTool((await params).slug);
  if (!t) notFound();
  const visit = visitLink(t);
  const sponsored = Boolean(t.affiliate_url);

  // Alternatives: other tools sharing a problem, most overlap first.
  const alts = published()
    .filter((o) => o.slug !== t.slug && o.problems.some((p) => t.problems.includes(p)))
    .sort(
      (a, b) =>
        b.problems.filter((p) => t.problems.includes(p)).length - a.problems.filter((p) => t.problems.includes(p)).length ||
        b.industries.filter((i) => t.industries.includes(i)).length - a.industries.filter((i) => t.industries.includes(i)).length ||
        a.name.localeCompare(b.name),
    )
    .slice(0, 4);

  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: t.name,
    description: t.tagline,
    applicationCategory: "BusinessApplication",
    offers: { "@type": "Offer", price: t.starting_price_usd, priceCurrency: "USD" },
  };

  return (
    <div className="wrap">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All tools", href: "/tools" }, { label: t.name }]} />
      <div className="tool-grid">
        <article>
          <div className="tool-title">
            <Logo initials={initials(t.name)} src={t.logo_url} large />
            <div>
              <h1>{t.name}</h1>
              {t.featured ? <span className="featured-label">FEATURED</span> : null}
            </div>
          </div>
          <p className="tagline">{t.tagline}</p>

          <section className="prose-block">
            <h2>What it does</h2>
            <p>{t.description}</p>
          </section>
          <section className="prose-block">
            <h2>Good for</h2>
            <ul className="tags">
              {t.industries.map((s) => {
                const i = industries.find((x) => x.slug === s)!;
                return <li key={s}><Link href={"/industry/" + s}>{i.name}</Link></li>;
              })}
            </ul>
          </section>
          <section className="prose-block">
            <h2>Solves</h2>
            <ul className="tags">
              {t.problems.map((s) => {
                const p = problems.find((x) => x.slug === s)!;
                return <li key={s}><Link href={"/problem/" + s}>{p.name}</Link></li>;
              })}
            </ul>
          </section>
          <section className="prose-block">
            <h2>Watch out for</h2>
            <p>{t.limitations}</p>
          </section>
        </article>

        <aside className="facts" aria-label="Quick facts">
          <dl>
            <div className="f"><dt>Starting price</dt><dd>{priceLabel(t)}</dd></div>
            <div className="f"><dt>Pricing model</dt><dd>{pricingModelLabel[t.pricing_model]}</dd></div>
            <div className="f"><dt>Free plan</dt><dd>{t.has_free_plan ? "Yes" : "No"}</dd></div>
            <div className="f"><dt>Last updated</dt><dd>{shortDate(t.updated_at)}</dd></div>
          </dl>
          <a className="btn btn-primary" href={visit.href} target="_blank" rel={visit.rel}>Visit website →</a>
          {sponsored ? <p className="disclose">We may earn a commission if you buy through this link. It does not change our picks.</p> : null}
        </aside>
      </div>

      {alts.length ? (
        <section className="section" aria-labelledby="alt-h">
          <div className="section-head" style={{ borderBottom: 0 }}><h2 id="alt-h">Alternatives</h2></div>
          <ToolTable rows={alts.map(toRow)} />
        </section>
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}
