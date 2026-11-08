import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SubmitForm } from "@/components/SubmitForm";
import { industries, problems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Get your AI tool listed",
  description: "Submit your AI tool to BestAIStack. Free listings are reviewed in 2 to 4 weeks. Fast Track is $29 once; Featured is $79 a month.",
  alternates: { canonical: "/submit" },
};

const plans = [
  { row: "Price", free: "$0", fast: "$29 one-time", feat: "$79 / month" },
  { row: "Time to go live", free: "2 to 4 weeks", fast: "48 hours", feat: "48 hours" },
  { row: "Backlink", free: "None", fast: "Dofollow", feat: "Dofollow" },
  { row: "Placement", free: "Standard", fast: "Standard", feat: "Top of category" },
  { row: "FEATURED label", free: "No", fast: "No", feat: "Yes" },
  { row: "Mention in our video series", free: "No", fast: "No", feat: "Yes" },
];

export default function SubmitPage() {
  return (
    <div className="wrap">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Get listed" }]} />
      <div className="page-head">
        <h1>Get your tool listed.</h1>
        <p className="intro">We list tools that save a small business real time or money. Paying gets you listed faster or placed higher. It never buys a better review.</p>
      </div>

      <section className="section" id="plans" aria-labelledby="plans-h">
        <div className="section-head" style={{ borderBottom: 0 }}><h2 id="plans-h">Plans</h2></div>
        <div className="table-wrap">
          <table className="t plans">
            <thead>
              <tr><th scope="col"></th><th scope="col">Free</th><th scope="col">Fast Track</th><th scope="col">Featured</th></tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.row}>
                  <td>{p.row}</td>
                  <td className="mono">{p.free}</td>
                  <td className="mono">{p.fast}</td>
                  <td className="mono">{p.feat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="form-h">
        <div className="section-head" style={{ borderBottom: 0 }}><h2 id="form-h">Submit a tool</h2></div>
        <SubmitForm
          industries={industries.map((i) => ({ slug: i.slug, name: i.name }))}
          problems={problems.map((p) => ({ slug: p.slug, name: p.name }))}
        />
      </section>
    </div>
  );
}
