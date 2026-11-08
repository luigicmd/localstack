import type { MetadataRoute } from "next";
import { industries, problems } from "@/lib/data";
import { SITE_URL, comboParams, latestUpdate, published } from "@/lib/queries";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = latestUpdate();
  const page = (path: string, lastModified = now) => ({ url: SITE_URL + path, lastModified });
  return [
    page(""),
    page("/tools"),
    page("/submit"),
    page("/about"),
    ...industries.map((i) => page("/industry/" + i.slug)),
    ...problems.map((p) => page("/problem/" + p.slug)),
    ...comboParams().map((c) => page("/industry/" + c.slug + "/" + c.problem)),
    ...published().map((t) => page("/tool/" + t.slug, t.updated_at)),
  ];
}
