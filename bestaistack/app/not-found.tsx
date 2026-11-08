import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap hero">
      <h1>Page not found.</h1>
      <p className="sub">That page does not exist, or the tool was removed. Try <Link href="/tools" style={{ textDecoration: "underline" }}>the full list</Link>.</p>
    </div>
  );
}
