"use client";

/**
 * Hand-drawn, single-weight technical icon set for MACPROTEC.
 * Deliberately drawn in the same "blueprint line art" language as the
 * plant_reactor.png diagram — 1.5px strokes, no fills, currentColor —
 * so every icon can sit inside the rose/slate palette already in use.
 */

type IconProps = {
  className?: string;
};

const base = "1.5";

export function IconCement({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <path d="M4 21V9l4-3 4 3v12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 21V6l4-3 4 3v18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 21h20" strokeLinecap="round" />
      <path d="M4 13h4M12 10h4" strokeLinecap="round" />
    </svg>
  );
}

export function IconMining({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <path d="M3 21l6-9 4 5 3-4 5 8H3z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8l3-5 3 5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="4" r="1" />
    </svg>
  );
}

export function IconAggregate({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <circle cx="7" cy="8" r="2.5" strokeLinecap="round" />
      <circle cx="16" cy="6" r="1.8" strokeLinecap="round" />
      <circle cx="12" cy="13" r="3" strokeLinecap="round" />
      <circle cx="18" cy="15" r="2.2" strokeLinecap="round" />
      <circle cx="6" cy="17" r="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconBulkHandling({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <path d="M2 8l10-4 10 4-10 4-10-4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 8v9l10 4 10-4V8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12v9" strokeLinecap="round" />
    </svg>
  );
}

export function IconPetrochem({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <path d="M9 2h6M10 2v5l-4.5 8.5A3 3 0 0 0 8.1 20h7.8a3 3 0 0 0 2.6-4.5L14 7V2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 15h10" strokeLinecap="round" />
    </svg>
  );
}

export function IconPower({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLime({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <path d="M12 3c3 3 5 6.2 5 9.5A5 5 0 0 1 7 12.5C7 9.2 9 6 12 3z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12.5V21" strokeLinecap="round" />
    </svg>
  );
}

export function IconIndustry40({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <rect x="4" y="4" width="7" height="7" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="13" y="4" width="7" height="7" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="4" y="13" width="7" height="7" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 13v3M15 15h3" strokeLinecap="round" />
    </svg>
  );
}

export function IconTailing({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <path d="M3 16h18" strokeLinecap="round" />
      <path d="M4 16c0-5 2-8 4-8s3 3 3 5 1 3 3 3 3-4 5-4 2 2 2 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 20h18" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

/* ---- Process / service icons ---- */

export function IconProcessEngineering({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <circle cx="9" cy="9" r="4" strokeLinecap="round" />
      <path d="M12.2 12.2 19 19" strokeLinecap="round" />
      <path d="M15 19h4v-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSystemIntegration({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <rect x="3" y="3" width="6" height="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="15" y="15" width="6" height="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 6h4a2 2 0 0 1 2 2v9" strokeLinecap="round" />
      <circle cx="18" cy="7" r="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconOperationalSupport({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <circle cx="12" cy="12" r="3" strokeLinecap="round" />
      <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18 6l-1.5 1.5M7.5 16.5 6 18M18 18l-1.5-1.5M7.5 7.5 6 6" strokeLinecap="round" />
    </svg>
  );
}

export function IconDesignSupport({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <path d="M4 20 15 9l3 3L7 23z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 6l2.5-2.5a1.8 1.8 0 0 1 2.5 0l2 2a1.8 1.8 0 0 1 0 2.5L17.5 10.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 21l1.2-4L7 20z" />
    </svg>
  );
}

export function IconProjectManagement({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <rect x="3" y="4" width="18" height="16" rx="0.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 9h18" strokeLinecap="round" />
      <path d="M7 13l2.5 2.5L15 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTraining({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <path d="M2 8l10-4 10 4-10 4-10-4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 8v6" strokeLinecap="round" />
    </svg>
  );
}

/* ---- Why choose us icons ---- */

export function IconLicensed({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMonitoring({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <path d="M3 17l4-6 3 3 5-8 6 11" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="21" cy="17" r="1.4" />
    </svg>
  );
}

export function IconTeam({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <circle cx="9" cy="8" r="3" strokeLinecap="round" />
      <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="8" r="2.2" strokeLinecap="round" />
      <path d="M15.5 14.7c2.6.3 4.5 2.3 4.5 5.3" strokeLinecap="round" />
    </svg>
  );
}

export function IconScalable({ className = "w-6 h-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={base} className={className}>
      <path d="M4 20V13M10 20V8M16 20V11M22 20V4" strokeLinecap="round" />
      <path d="M2 20h20" strokeLinecap="round" />
      <path d="M17.5 3l3.5 1v3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 4l-6.5 6.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconCheckSquare({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function IconChevronDown({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}
