import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cybreon template colors
        background: "#FFFFFF",
        foreground: "#0F172A",
        brand: "#0F172A",
        "brand-foreground": "#FFFFFF",
        card: "#FFFFFF",
        "card-foreground": "#0F172A",
        popover: "#FFFFFF",
        "popover-foreground": "#0F172A",
        primary: "#E11D48",
        "primary-foreground": "#FFFFFF",
        secondary: "#64748B",
        "secondary-foreground": "#FFFFFF",
        muted: "#F8FAFC",
        "muted-foreground": "#64748B",
        accent: "#E11D48",
        "accent-foreground": "#FFFFFF",
        destructive: "#EF4444",
        "destructive-foreground": "#FFFFFF",
        border: "#E2E8F0",
        input: "#E2E8F0",
        ring: "#E11D48",
      },
      fontFamily: {
        sans: ["'Inter'", "var(--font-sans)", "sans-serif"],
        display: ["'Space Grotesk'", "var(--font-display)", "sans-serif"],
        mono: ["'Space Mono'", "var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "0px",
        md: "2px",
        lg: "4px",
        full: "9999px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "32px",
        xl: "64px",
      },
      transitionDuration: {
        fast: "150ms",
        base: "250ms",
        slow: "450ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
        emphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
