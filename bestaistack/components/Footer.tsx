import Link from "next/link";
import { industries, problems } from "@/lib/data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-cols">
          <div>
            <h2>Industries</h2>
            <ul>
              {industries.map((i) => (
                <li key={i.slug}><Link href={"/industry/" + i.slug}>{i.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Problems</h2>
            <ul>
              {problems.map((p) => (
                <li key={p.slug}><Link href={"/problem/" + p.slug}>{p.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>For founders</h2>
            <ul>
              <li><Link href="/submit">Get listed</Link></li>
              <li><Link href="/submit#plans">Plans and prices</Link></li>
            </ul>
          </div>
          <div>
            <h2>About</h2>
            <ul>
              <li><Link href="/about">Who runs this</Link></li>
              <li><Link href="/about#selection">How we pick tools</Link></li>
              <li><Link href="/about#money">How we make money</Link></li>
              <li><Link href="/tools">All tools</Link></li>
            </ul>
          </div>
        </div>
        <p className="meta foot-base">© {new Date().getUTCFullYear()} BestAIStack. Some links are affiliate links; see About.</p>
      </div>
    </footer>
  );
}
