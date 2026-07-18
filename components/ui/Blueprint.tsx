type Corner = "tl" | "tr" | "bl" | "br";

const positions: Record<Corner, string> = {
  tl: "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  tr: "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  bl: "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  br: "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
};

/** Registration-mark crosshair, positioned at a corner of a relatively-positioned parent. */
export function Crosshair({
  corner,
  className = "",
}: {
  corner: Corner;
  className?: string;
}) {
  return <span className={`crosshair absolute ${positions[corner]} ${className}`} aria-hidden />;
}

/** Drawing-sheet style eyebrow label, e.g. "SHT.02 — INDUSTRIES" */
export function DrawingTag({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-3">{children}</p>;
}
