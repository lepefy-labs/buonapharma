import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#103B3A",
          light: "#1B5654",
        },
        gold: "#C99A3E",
        paper: {
          DEFAULT: "#F5F7F1",
          warm: "#EFEEE4",
        },
        ink: "#1B1F1D",
      },
      fontFamily: {
        display: ["var(--font-fraunces)"],
        sans: ["var(--font-inter)"],
        mono: ["var(--font-plex-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
