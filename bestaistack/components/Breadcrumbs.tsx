import Link from "next/link";
import { SITE_URL } from "@/lib/queries";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: SITE_URL + c.href } : {}),
    })),
  };
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((c, i) => (
          <li key={i} aria-current={i === items.length - 1 ? "page" : undefined}>
            {c.href && i < items.length - 1 ? <Link href={c.href}>{c.label}</Link> : c.label}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </nav>
  );
}
