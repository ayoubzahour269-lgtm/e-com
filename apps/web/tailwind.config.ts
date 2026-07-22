import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        garnet: "#6E1414",
        gold: "#C9A227",
        goldlight: "#F4E1A6",
        paper: "#F7F6F4",
        ink: "#1A0B0B",
      },
    },
  },
  plugins: [],
} satisfies Config;
