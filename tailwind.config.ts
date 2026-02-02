import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        background: "#0A0A0F",
        surface: "#13131A",
        "surface-light": "#1C1C26",
        // Primary - Electric Purple
        primary: {
          DEFAULT: "#8B5CF6",
          light: "#A78BFA",
          dark: "#7C3AED",
          glow: "rgba(139, 92, 246, 0.4)",
        },
        // Secondary - Cyan
        secondary: {
          DEFAULT: "#06B6D4",
          light: "#22D3EE",
          dark: "#0891B2",
          glow: "rgba(6, 182, 212, 0.4)",
        },
        // Accent - Hot Pink
        accent: {
          DEFAULT: "#F43F5E",
          light: "#FB7185",
          dark: "#E11D48",
          glow: "rgba(244, 63, 94, 0.4)",
        },
        // Text colors
        "text-primary": "#FAFAFA",
        "text-secondary": "#A1A1AA",
        "text-muted": "#71717A",
      },
      fontFamily: {
        arabic: ["Tajawal", "sans-serif"],
        display: ["Tajawal", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(139, 92, 246, 0.4)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.3)",
        "glow-pink": "0 0 20px rgba(244, 63, 94, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)",
        "gradient-accent": "linear-gradient(135deg, #F43F5E 0%, #8B5CF6 100%)",
        "gradient-dark": "linear-gradient(180deg, #13131A 0%, #0A0A0F 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
