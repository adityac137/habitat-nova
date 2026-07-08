import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6F0",
        lavendermist: "#E8E1F5",
        skyblue: "#DCEEF7",
        mint: "#A8E6CF",
        peach: "#FFD9C0",
        lilac: "#C9B6E4",
        dusty: "#B7A8B3",
        sage: "#8FA98C",
        slateplum: "#3E3552",
        lavendergrey: "#8B839B",
        glow: "#EAFBFF",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        cozy: "22px",
        cozylg: "28px",
      },
      backdropBlur: {
        glass: "18px",
      },
      keyframes: {
        driftgradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        softpulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.06)", opacity: "1" },
        },
        cloudfloat: {
          "0%": { transform: "translateX(-6%)" },
          "50%": { transform: "translateX(6%)" },
          "100%": { transform: "translateX(-6%)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        risebloom: {
          "0%": { transform: "translateY(0)", opacity: "0.9" },
          "100%": { transform: "translateY(-40px)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        driftgradient: "driftgradient 30s ease-in-out infinite",
        twinkle: "twinkle 3.5s ease-in-out infinite",
        softpulse: "softpulse 3.2s ease-in-out infinite",
        cloudfloat: "cloudfloat 40s ease-in-out infinite",
        sway: "sway 6s ease-in-out infinite",
        risebloom: "risebloom 1.4s ease-out forwards",
        shimmer: "shimmer 6s linear infinite",
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(62, 53, 82, 0.15)",
        glass: "0 4px 24px rgba(62, 53, 82, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
