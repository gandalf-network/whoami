import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: {
          DEFAULT: "var(--muted)",
          gray: "var(--muted-gray)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          cyan: {
            DEFAULT: "var(--primary-cyan)",
            shade: "var(--primary-cyan-shade)",
          },
          green: "var(--primary-green)",
          yellow: "var(--primary-yellow)",
          amber: "var(--primary-amber)",
          pink: {
            DEFAULT: "var(--primary-pink)",
            shade: "var(--primary-pink-shade)",
          },
          orange: "var(--primary-orange)",
          lavender: "var(--primary-lavender)",
          purple: "var(--primary-purple)",
          blue: "var(--primary-blue)",
          tomatoe: "var(--primary-tomatoe)",
        },
        progress: "var(--progress)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
