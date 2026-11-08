"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Option, PricingModel, ToolRowData } from "@/lib/types";
import { Logo } from "./Logo";

type SortKey = "name" | "price" | "date";

const MODEL_LABEL: Record<PricingModel, string> = {
  free: "Free",
  freemium: "Freemium",
  subscription: "Subscription",
  "one-time": "One-time",
};

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className="toggle" aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}

export function ToolTable({
  rows,
  problemOptions = [],
  industryOptions = [],
  withSearch = false,
  sortable = false,
  initialQuery = "",
}: {
  rows: ToolRowData[];
  problemOptions?: Option[];
  industryOptions?: Option[];
  withSearch?: boolean;
  sortable?: boolean;
  initialQuery?: string;
}) {
  const [q, setQ] = useState(initialQuery);
  const [problem, setProblem] = useState("");
  const [industry, setIndustry] = useState("");
  const [model, setModel] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 } | null>(
    sortable ? { key: "name", dir: 1 } : null,
  );

  const models = useMemo(
    () => Array.from(new Set(rows.map((r) => r.pricing_model))),
    [rows],
  );

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = rows.filter(
      (r) =>
        (!needle || r.haystack.includes(needle)) &&
        (!problem || r.problems.includes(problem)) &&
        (!industry || r.industries.includes(industry)) &&
        (!model || r.pricing_model === model) &&
        (!freeOnly || r.has_free_plan),
    );
    if (sort) {
      const { key, dir } = sort;
      out.sort((a, b) => {
        if (key === "name") return a.name.localeCompare(b.name) * dir;
        if (key === "price") return (a.price - b.price || a.name.localeCompare(b.name)) * dir;
        return (a.created_at.localeCompare(b.created_at) || a.name.localeCompare(b.name)) * dir;
      });
    }
    return out;
  }, [rows, q, problem, industry, model, freeOnly, sort]);

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s && s.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: key === "date" ? -1 : 1 }));

  const head = (key: SortKey, label: string) => {
    if (!sortable) return label;
    const active = sort?.key === key;
    return (
      <button type="button" className="sort-btn" aria-pressed={active} onClick={() => toggleSort(key)}>
        {label}
        {active ? (sort!.dir === 1 ? " ↑" : " ↓") : ""}
      </button>
    );
  };

  const hasFilters = problemOptions.length > 1 || industryOptions.length > 1 || models.length > 1 || rows.some((r) => r.has_free_plan);

  return (
    <div>
      {withSearch ? (
        <div className="search" style={{ marginTop: 8, maxWidth: 560 }}>
          <label htmlFor="tool-q" className="skip">Search tools</label>
          <input
            id="tool-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tools, e.g. bookings, invoices, salon"
          />
        </div>
      ) : null}

      {hasFilters ? (
        <div className="filters" role="group" aria-label="Filters">
          {industryOptions.length > 1 ? (
            <div className="filter-group">
              <span className="fl">Industry</span>
              <Toggle on={!industry} onClick={() => setIndustry("")}>All</Toggle>
              {industryOptions.map((o) => (
                <Toggle key={o.slug} on={industry === o.slug} onClick={() => setIndustry(industry === o.slug ? "" : o.slug)}>
                  {o.name}
                </Toggle>
              ))}
            </div>
          ) : null}
          {problemOptions.length > 1 ? (
            <div className="filter-group">
              <span className="fl">Problem</span>
              <Toggle on={!problem} onClick={() => setProblem("")}>All</Toggle>
              {problemOptions.map((o) => (
                <Toggle key={o.slug} on={problem === o.slug} onClick={() => setProblem(problem === o.slug ? "" : o.slug)}>
                  {o.name}
                </Toggle>
              ))}
            </div>
          ) : null}
          {models.length > 1 ? (
            <div className="filter-group">
              <span className="fl">Pricing</span>
              <Toggle on={!model} onClick={() => setModel("")}>Any</Toggle>
              {models.map((m) => (
                <Toggle key={m} on={model === m} onClick={() => setModel(model === m ? "" : m)}>
                  {MODEL_LABEL[m]}
                </Toggle>
              ))}
            </div>
          ) : null}
          <div className="filter-group">
            <span className="fl">Free plan</span>
            <Toggle on={!freeOnly} onClick={() => setFreeOnly(false)}>Any</Toggle>
            <Toggle on={freeOnly} onClick={() => setFreeOnly(true)}>Has a free plan</Toggle>
          </div>
        </div>
      ) : null}

      <p className="meta" style={{ margin: "14px 0 10px" }} aria-live="polite">
        {shown.length} of {rows.length} {rows.length === 1 ? "tool" : "tools"}
      </p>

      {shown.length === 0 ? (
        <p className="empty">Nothing matches. Clear a filter or try a different word.</p>
      ) : (
        <div className="table-wrap">
          <table className="t">
            <thead>
              <tr>
                <th scope="col">{head("name", "Tool")}</th>
                <th scope="col">What it does</th>
                <th scope="col">Best for</th>
                <th scope="col">{head("price", "From")}</th>
                <th scope="col">Free plan</th>
                {sortable ? <th scope="col">{head("date", "Added")}</th> : null}
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.slug}>
                  <td>
                    <Link href={"/tool/" + r.slug} className="tcell">
                      <Logo initials={r.initials} src={r.logo_url} />
                      <span>
                        <span className="tname">{r.name}</span>
                        {r.featured ? <> <span className="featured-label">FEATURED</span></> : null}
                      </span>
                    </Link>
                  </td>
                  <td className="desc">{r.tagline}</td>
                  <td>{r.best_for}</td>
                  <td className="num">{r.price_label}</td>
                  <td className="num">{r.has_free_plan ? "Yes" : "No"}</td>
                  {sortable ? <td className="num">{r.added_label}</td> : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
