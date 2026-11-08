import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/ListingPage";
import {
  autoPicks, comboParams, generatedFaq, getIndustry, getProblem, joinNames, latestUpdate, monthYear, toolsFor,
} from "@/lib/queries";

type Props = { params: Promise<{ slug: string; problem: string }> };

export const generateStaticParams = () => comboParams();
export const dynamicParams = false;

async function load(params: Props["params"]) {
  const { slug, problem } = await params;
  const ind = getIndustry(slug);
  const prob = getProblem(problem);
  if (!ind || !prob) return null;
  const list = toolsFor({ industry: slug, problem });
  if (!list.length) return null;
  return { ind, prob, list };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await load(params);
  if (!d) return {};
  const title = "AI " + d.prob.name + " Tools for " + d.ind.name;
  return {
    title: title + " (" + monthYear(latestUpdate(d.list)) + ")",
    description: d.list.length + " AI tools for " + d.prob.name.toLowerCase() + " in " + d.ind.name.toLowerCase() + ", compared by price and free plans.",
    alternates: { canonical: "/industry/" + d.ind.slug + "/" + d.prob.slug },
  };
}

export default async function ComboPage({ params }: Props) {
  const d = await load(params);
  if (!d) notFound();
  const { ind, prob, list } = d;
  const picks = autoPicks(list);
  const top = picks[0]?.tool;
  const subject = prob.name.toLowerCase() + " in " + ind.name.toLowerCase();
  const intro =
    "If " + prob.name.toLowerCase() + " is your headache in " + ind.name.toLowerCase() + ", " +
    (top ? top.name + " is where we'd start: " + top.tagline.charAt(0).toLowerCase() + top.tagline.slice(1) + " " : "") +
    (picks.length > 1 ? "Others worth a look: " + joinNames(picks.slice(1).map((x) => x.tool.name)) + "." : "");
  return (
    <ListingPage
      crumbs={[
        { label: "Home", href: "/" },
        { label: ind.name, href: "/industry/" + ind.slug },
        { label: prob.name },
      ]}
      title={"AI " + prob.name + " Tools for " + ind.name}
      intro={intro}
      tools={list}
      picks={picks}
      faq={generatedFaq(subject, list)}
      problemOptions={[]}
    />
  );
}
