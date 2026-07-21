"use client";

export function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string; // Kept in signature for backwards compatibility
}) {
  return (
    <div
      className={`group relative bg-card text-card-foreground border border-border rounded-none overflow-hidden transition-all duration-150 hover:bg-muted/30 ${className}`}
    >
      {children}
    </div>
  );
}
