"use client";

import { useState } from "react";
import type { Option } from "@/lib/types";

type State = "idle" | "sending" | "done" | "error";

export function SubmitForm({ industries, problems }: { industries: Option[]; problems: Option[] }) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      name: String(fd.get("name") ?? ""),
      url: String(fd.get("url") ?? ""),
      email: String(fd.get("email") ?? ""),
      description: String(fd.get("description") ?? ""),
      plan: String(fd.get("plan") ?? "free"),
      industries: fd.getAll("industries").map(String),
      problems: fd.getAll("problems").map(String),
    };
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setState("done");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done")
    return (
      <p className="notice" role="status">
        Got it. We will email you once we have reviewed the listing. Paid plans: we will send the payment link then. You have not been charged.
      </p>
    );

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="f-name">Tool name</label>
        <input id="f-name" name="name" type="text" required maxLength={80} />
      </div>
      <div className="field">
        <label htmlFor="f-url">Website URL</label>
        <input id="f-url" name="url" type="url" required placeholder="https://" />
      </div>
      <div className="field">
        <label htmlFor="f-email">Contact email <span className="hint">(not published)</span></label>
        <input id="f-email" name="email" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="f-desc">What does it do, in plain words?</label>
        <textarea id="f-desc" name="description" required maxLength={800} />
        <p className="hint small" style={{ marginTop: 6 }}>Who is it for, what does it cost, and what does it not do well?</p>
      </div>
      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="lbl">Industries</legend>
        <div className="checks">
          {industries.map((o) => (
            <label key={o.slug}><input type="checkbox" name="industries" value={o.slug} /> {o.name}</label>
          ))}
        </div>
      </fieldset>
      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="lbl">Problems it solves</legend>
        <div className="checks">
          {problems.map((o) => (
            <label key={o.slug}><input type="checkbox" name="problems" value={o.slug} /> {o.name}</label>
          ))}
        </div>
      </fieldset>
      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="lbl">Plan</legend>
        <div className="plan-pick">
          <label><input type="radio" name="plan" value="free" defaultChecked /> Free</label>
          <label><input type="radio" name="plan" value="fast-track" /> Fast Track, $29</label>
          <label><input type="radio" name="plan" value="featured" /> Featured, $79/mo</label>
        </div>
        <p className="hint small" style={{ marginTop: 6 }}>Payment is not connected yet. Choosing a paid plan does not charge you.</p>
      </fieldset>
      {state === "error" ? <p className="err" role="alert">{error}</p> : null}
      <div>
        <button className="btn btn-primary" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Submit tool"}
        </button>
      </div>
    </form>
  );
}
