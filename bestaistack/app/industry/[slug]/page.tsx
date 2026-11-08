import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, problems } from "@/lib/data";
import { ListingPage } from "@/components/ListingPage";
import { getIndustry, industryPicks, monthYear, latestUpdate, toolsFor } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => industries.map((i) => ({ slug: i.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ind = getIndustry((await params).slug);
  if (!ind) return {};
  const list = toolsFor({ industry: ind.slug });
  return {
    title: "Best AI Tools for " + ind.name + " (" + monthYear(latestUpdate(list)) + ")",
    description: list.length + " AI tools for " + ind.name.toLowerCase() + ", compared by price, free plans and what each does. " + ind.intro_text.split(". ")[0] + ".",
    alternates: { canonical: "/industry/" + ind.slug },
  };
}

export default async function IndustryPage({ params }: Props) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();
  const list = toolsFor({ industry: ind.slug });
  const present = problems.filter((p) => list.some((t) => t.problems.includes(p.slug)));
  return (
    <ListingPage
      crumbs={[{ label: "Home", href: "/" }, { label: "Industries" , href: "/#industries" }, { label: ind.name }]}
      title={"Best AI Tools for " + ind.name}
      intro={ind.intro_text}
      tools={list}
      picks={industryPicks(ind)}
      faq={ind.faq}
      problemOptions={present.map((p) => ({ slug: p.slug, name: p.name }))}
    />
  );
}
