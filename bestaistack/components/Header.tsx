import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="wordmark">BestAIStack</Link>
        <nav className="nav" aria-label="Main">
          <Link href="/tools">All tools</Link>
          <Link href="/submit">Get listed</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
