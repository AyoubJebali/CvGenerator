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
          primary: "var(--primary)",
          "primary-container": "var(--primary-container)",
          "primary-fixed": "var(--primary-fixed)",
          "on-primary": "var(--on-primary)",
          secondary: "var(--secondary)",
          tertiary: "var(--tertiary)",
          "tertiary-fixed": "var(--tertiary-fixed)",
          surface: "var(--surface)",
          "surface-container-low": "var(--surface-container-low)",
          "surface-container": "var(--surface-container)",
          "surface-container-high": "var(--surface-container-high)",
          "surface-container-highest": "var(--surface-container-highest)",
          "surface-container-lowest": "var(--surface-container-lowest)",
          "outline-variant": "var(--outline-variant)",
          "on-surface": "var(--on-surface)",
          "on-surface-variant": "var(--on-surface-variant)",
          "on-primary-fixed-variant": "var(--on-primary-fixed-variant)",
        },
      fontFamily: {
        headline: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        a4: "0 20px 40px rgba(9, 20, 38, 0.05)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  variants: {
    extend: {
      display: ['print'],
      margin: ['print'],
      padding: ['print'],
      fontSize: ['print'],
      width: ['print'],
      height: ['print'],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        curatorlight: {
          primary: "#091426",
          "primary-content": "#ffffff",
          secondary: "#0051d5",
          "secondary-content": "#ffffff",
          accent: "#1c0048",
          "accent-content": "#ffffff",
          neutral: "#191c1d",
          "neutral-content": "#f8f9fa",
          "base-100": "#f8f9fa",
          "base-200": "#f3f4f5",
          "base-300": "#edeeef",
          "base-content": "#191c1d",
          info: "#0051d5",
          success: "#2a8c52",
          warning: "#c97d00",
          error: "#d84545",
        },
      },
      {
        curatordark: {
          primary: "#adc6ff",
          "primary-content": "#002e6a",
          secondary: "#4d8eff",
          "secondary-content": "#001737",
          accent: "#ffb786",
          "accent-content": "#3f1e00",
          neutral: "#131b2e",
          "neutral-content": "#e9edff",
          "base-100": "#0b1326",
          "base-200": "#131b2e",
          "base-300": "#1d2438",
          "base-content": "#e9edff",
          info: "#8db3ff",
          success: "#4fd08b",
          warning: "#ffca80",
          error: "#ff8c8c",
        },
      },
    ],
  },
};
export default config;
