import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "520px",
      md: "820px",
      lg: "1100px",
      xl: "1280px",
    },
    extend: {
      colors: {
        ink: "#1a1d23",
        slate: "#5b6270",
        mist: "#e7e9ed",
        paper: "#fafaf9",
        surface: "#ffffff",
        action: {
          DEFAULT: "#3452eb",
          hover: "#2c44c9",
          subtle: "#eef0fd",
        },
        success: {
          DEFAULT: "#1c8a5b",
          bg: "#e7f5ee",
        },
        warning: {
          DEFAULT: "#b9740a",
          bg: "#fbf1e2",
        },
        error: {
          DEFAULT: "#c43a3a",
          bg: "#fbeaea",
        },
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
      },
      boxShadow: {
        card: "0 8px 30px rgba(26, 29, 35, 0.08)",
        sheet: "0 -8px 40px rgba(0, 0, 0, 0.12)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
