import Link from "next/link";
import { industries, problems } from "@/lib/data";
import { ToolRow } from "@/components/ToolRow";
import { Logo } from "@/components/Logo";
import {
  byNewest,
  industryCount,
  initials,
  latestUpdate,
  monthYear,
  priceLabel,
  published,
  shortDate,
} from "@/lib/queries";

export default function Home() {
  const all = published();
  const featured = all.filter((t) => t.featured).slice(0, 5);
  const recent = byNewest(all).slice(0, 10);
  return (
    <div className="wrap">
      <section className="hero">
        <h1>AI tools that actually help small businesses.</h1>
        <p className="sub">Sorted by industry, priced honestly, updated monthly.</p>
        <form className="search" action="/tools" role="search">
          <label htmlFor="home-q" className="skip">Search tools</label>
          <input id="home-q" name="q" type="search" placeholder="Search by tool, industry or problem" />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
        <p className="meta" style={{ marginTop: 18 }}>
          {all.length} tools · {industries.length} industries · Updated {monthYear(latestUpdate(all))}
        </p>
      </section>

      <section className="section" id="industries" aria-labelledby="ind-h">
        <div className="section-head"><h2 id="ind-h">Browse by industry</h2></div>
        <ul className="index">
          {industries.map((i) => (
            <li key={i.slug}>
              <Link href={"/industry/" + i.slug}>
                <span>{i.name}</span>
                <span className="meta">{industryCount(i.slug)} tools</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" id="problems" aria-labelledby="prob-h">
        <div className="section-head"><h2 id="prob-h">Browse by problem</h2></div>
        <ul className="linklist">
          {problems.map((p) => (
            <li key={p.slug}><Link href={"/problem/" + p.slug}>{p.name}</Link></li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="feat-h">
        <div className="section-head"><h2 id="feat-h">Featured this month</h2></div>
        <ul className="rows">
          {featured.map((t) => <ToolRow key={t.slug} tool={t} showFeatured />)}
        </ul>
      </section>

      <section className="section" aria-labelledby="new-h">
        <div className="section-head"><h2 id="new-h">Recently added</h2></div>
        <div className="table-wrap">
          <table className="t">
            <thead>
              <tr>
                <th scope="col">Tool</th>
                <th scope="col">What it does</th>
                <th scope="col">From</th>
                <th scope="col">Added</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((t) => (
                <tr key={t.slug}>
                  <td>
                    <Link href={"/tool/" + t.slug} className="tcell">
                      <Logo initials={initials(t.name)} src={t.logo_url} />
                      <span className="tname">{t.name}</span>
                    </Link>
                  </td>
                  <td className="desc">{t.tagline}</td>
                  <td className="num">{priceLabel(t)}</td>
                  <td className="num">{shortDate(t.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="band">
          <p>Built an AI tool for small businesses?</p>
          <Link href="/submit">Get listed →</Link>
        </div>
      </section>
    </div>
  );
}
