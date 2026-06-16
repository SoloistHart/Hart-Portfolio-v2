import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // The palette evolves with the narrative: cool curiosity -> structured
        // systems -> warm human impact.
        ink: {
          950: "#05060a",
          900: "#080b14",
          800: "#0d1220",
        },
        curiosity: "#38bdf8",
        systems: "#818cf8",
        impact: "#fb923c",
        signal: "#22d3ee",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse2: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        pulse2: "pulse2 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
