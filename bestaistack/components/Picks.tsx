import Link from "next/link";
import type { Picks as PicksData } from "@/lib/queries";
import { priceLabel } from "@/lib/queries";

export function Picks({ picks }: { picks: PicksData }) {
  if (!picks.length) return null;
  return (
    <div className="picks">
      {picks.map(({ label, tool }) => (
        <Link key={label} href={"/tool/" + tool.slug} className="pick">
          <span className="label">{label}</span>
          <span className="pname">{tool.name}</span>
          <p>{tool.tagline}</p>
          <span className="meta">{priceLabel(tool)}{tool.has_free_plan ? " · free plan" : ""}</span>
        </Link>
      ))}
    </div>
  );
}
