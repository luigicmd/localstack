"use client";

import { useSearchParams } from "next/navigation";
import type { Option, ToolRowData } from "@/lib/types";
import { ToolTable } from "./ToolTable";

export function ToolsExplorer(props: { rows: ToolRowData[]; problemOptions: Option[]; industryOptions: Option[] }) {
  const q = useSearchParams().get("q") ?? "";
  return <ToolTable {...props} withSearch sortable initialQuery={q} />;
}
