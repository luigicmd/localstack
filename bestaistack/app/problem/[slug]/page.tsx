import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, problems } from "@/lib/data";
import { ListingPage } from "@/components/ListingPage";
import { autoPicks, generatedFaq, getProblem, joinNames, latestUpdate, monthYear, toolsFor } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => problems.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProblem((await params).slug);
  if (!p) return {};
  const list = toolsFor({ problem: p.slug });
  return {
    title: "Best AI Tools for " + p.name + " (" + monthYear(latestUpdate(list)) + ")",
    description: list.length + " AI tools for " + p.name.toLowerCase() + " in small businesses, compared by price and free plans. " + p.intro_text.split(". ")[0] + ".",
    alternates: { canonical: "/problem/" + p.slug },
  };
}

export default async function ProblemPage({ params }: Props) {
  const p = getProblem((await params).slug);
  if (!p) notFound();
  const list = toolsFor({ problem: p.slug });
  const picks = autoPicks(list);
  const names = picks.map((x) => x.tool.name);
  const intro = p.intro_text + (names.length ? " Top picks: " + joinNames(names) + "." : "");
  const present = industries.filter((i) => list.some((t) => t.industries.includes(i.slug)));
  return (
    <ListingPage
      crumbs={[{ label: "Home", href: "/" }, { label: "Problems", href: "/#problems" }, { label: p.name }]}
      title={"Best AI Tools for " + p.name}
      intro={intro}
      tools={list}
      picks={picks}
      faq={generatedFaq(p.name, list)}
      problemOptions={[]}
      industryOptions={present.map((i) => ({ slug: i.slug, name: i.short }))}
    />
  );
}
