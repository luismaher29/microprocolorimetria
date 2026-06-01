import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"]
      },
      colors: {
        ivory: "#fbf7f0",
        champagne: "#efe1cd",
        sand: "#d7b98f",
        cocoa: "#6f4935",
        wine: "#4a1728",
        plum: "#30162f",
        rosewood: "#7b3f48",
        ink: "#24191b"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(74, 23, 40, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
