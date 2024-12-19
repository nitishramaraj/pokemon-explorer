import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        linearGradient1: "#12100E",
        linearGradient2: "#2B4162",
      },
      animation: {
        border: "border-glow 3s linear infinite",
      },
      keyframes: {},
    },
  },
  plugins: [],
} satisfies Config;
