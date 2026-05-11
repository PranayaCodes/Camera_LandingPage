import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111318",
        graphite: "#20242c",
        signal: "#f04438",
        aqua: "#00a6a6",
        saffron: "#f7b731"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(17, 19, 24, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
