export function Logo({ initials, src, large }: { initials: string; src?: string | null; large?: boolean }) {
  return (
    <span className={large ? "logo logo-lg" : "logo"} aria-hidden="true">
      {src ? <img src={src} alt="" /> : initials}
    </span>
  );
}
