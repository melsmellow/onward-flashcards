/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { min: "0px", max: "265px" },
        // sm: { min: "266px", max: "411px" },
        // // => @media (min-width: 640px and max-width: 767px) { ... }
        // "2sm": { min: "412", max: "767px" },
        // // => @media (min-width: 640px and max-width: 767px) { ... }

        // md: { min: "768px", max: "1023px" },
        // // => @media (min-width: 768px and max-width: 1023px) { ... }

        // lg: { min: "1024px", max: "1279px" },
        // // => @media (min-width: 1024px and max-width: 1279px) { ... }

        // xl: { min: "1280px", max: "1535px" },
        // // => @media (min-width: 1280px and max-width: 1535px) { ... }

        // "2xl": { min: "1536px" },
        // // => @media (min-width: 1536px) { ... }
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        "fade-out": "fadeOut 1s ease-in-out",
      },
      boxShadow: {
        bottom: "0px 1.95px 2.6px rgba(0, 0, 0, 0.15)", // Bottom-only shadow
        "bottom-dark": "0px 1.95px 2.6px rgba(255, 255, 255, 0.1)",
        top: "0px -1.95px 2.6px rgba(0, 0, 0, 0.15)", // Top-only shadow
        "top-dark": "0px -1.95px 2.6px rgba(255, 255, 255, 0.1)",
      },
      colors: {
        foreground: "hsl(var(--foreground))",
        background: "hsl(var(--background))",
        tile: {
          start: "rgb(var(--tile-start-rgb))",
          end: "rgb(var(--tile-end-rgb))",
        },
        callout: "rgb(var(--callout-rgb))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  darkMode: "class", // Use class-based dark mode
  plugins: [require("tailwindcss-animate")],
};
