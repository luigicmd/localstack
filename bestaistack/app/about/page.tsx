import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About BestAIStack",
  description: "Who runs BestAIStack, how we choose AI tools for small businesses, and how the site makes money.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="wrap">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <div className="page-head">
        <h1>About BestAIStack.</h1>
      </div>
      <div className="prose">
        <h2>Who runs this</h2>
        {/* TODO: add the founder's name, photo and one line of background. */}
        <p>BestAIStack is an independent directory run by one person, not a media company and not a software vendor. The goal is simple: help owners of restaurants, salons, clinics, garages, agencies and shops find AI tools worth paying for, and skip the rest.</p>

        <h2 id="selection">How we pick tools</h2>
        <p>A tool gets listed if it passes four checks:</p>
        <ul>
          <li>It solves one named business problem, such as bookings or invoicing.</li>
          <li>A non-technical owner can set it up without a developer.</li>
          <li>The price is public, or the vendor gives us one in writing.</li>
          <li>It has a real company behind it that answers email.</li>
        </ul>
        <p>Every listing says what the tool does badly, under "Watch out for". If we cannot find a weakness, we look harder. Prices and features are re-checked monthly, and the date on each page is the last check.</p>

        <h2 id="money">How we make money</h2>
        <p>Two ways, both disclosed:</p>
        <ul>
          <li><strong>Affiliate links.</strong> Some "Visit website" buttons are affiliate links, marked with a sponsored tag. If you buy, we may earn a commission at no extra cost to you.</li>
          <li><strong>Paid listings.</strong> Founders can pay for a faster review or a featured spot. See <Link href="/submit#plans">plans</Link>. Featured listings carry a FEATURED label.</li>
        </ul>
        <p>Paying does not change a tool's text, its "Watch out for" section or the picks. The "Best overall", "Best on a budget" and "Best free option" labels are editorial.</p>

        <h2>Corrections</h2>
        <p>Spotted an old price or a wrong claim? Tell us and we will fix it. Vendors can request a correction, but not a removal of the limitations section.</p>
      </div>
    </div>
  );
}
