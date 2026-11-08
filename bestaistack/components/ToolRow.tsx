import Link from "next/link";
import type { Tool } from "@/lib/types";
import { industryNames, initials, priceLabel } from "@/lib/queries";
import { Logo } from "./Logo";

export function ToolRow({ tool, showFeatured }: { tool: Tool; showFeatured?: boolean }) {
  return (
    <li>
      <Link href={"/tool/" + tool.slug} className="row">
        <Logo initials={initials(tool.name)} src={tool.logo_url} />
        <span>
          <span className="row-name">
            {tool.name}
            {showFeatured && tool.featured ? <span className="featured-label">FEATURED</span> : null}
          </span>
          <span className="row-desc">{tool.tagline}</span>
        </span>
        <span className="row-ind">{industryNames(tool)}</span>
        <span className="row-price">{priceLabel(tool)}</span>
        <span className="row-arrow" aria-hidden="true">→</span>
      </Link>
    </li>
  );
}
