import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        terracotta: {
          DEFAULT: "hsl(var(--terracotta))",
          light: "hsl(var(--terracotta-light))",
        },
        earth: {
          DEFAULT: "hsl(var(--earth))",
          light: "hsl(var(--earth-light))",
        },
        sand: {
          DEFAULT: "hsl(var(--sand))",
          light: "hsl(var(--sand-light))",
        },
        cream: "hsl(var(--cream))",
        sage: {
          DEFAULT: "hsl(var(--sage))",
          light: "hsl(var(--sage-light))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(15px) rotate(-2deg)" },
        },
        "particle-1": {
          "0%, 100%": { transform: "translate(0, 0)", opacity: "0.06" },
          "25%": { transform: "translate(10px, -15px)", opacity: "0.08" },
          "50%": { transform: "translate(5px, -25px)", opacity: "0.04" },
          "75%": { transform: "translate(-5px, -10px)", opacity: "0.07" },
        },
        "particle-2": {
          "0%, 100%": { transform: "translate(0, 0)", opacity: "0.04" },
          "33%": { transform: "translate(-15px, 10px)", opacity: "0.06" },
          "66%": { transform: "translate(10px, 20px)", opacity: "0.03" },
        },
        "particle-3": {
          "0%, 100%": { transform: "translate(0, 0)", opacity: "0.05" },
          "50%": { transform: "translate(-20px, -10px)", opacity: "0.07" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.03", transform: "scale(1)" },
          "50%": { opacity: "0.05", transform: "scale(1.1)" },
        },
        "pulse-slower": {
          "0%, 100%": { opacity: "0.02", transform: "scale(1)" },
          "50%": { opacity: "0.04", transform: "scale(1.15)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        "draw-line": {
          "0%": { strokeDasharray: "0, 1000" },
          "100%": { strokeDasharray: "1000, 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-reverse": "float-reverse 10s ease-in-out infinite",
        "particle-1": "particle-1 12s ease-in-out infinite",
        "particle-2": "particle-2 15s ease-in-out infinite",
        "particle-3": "particle-3 10s ease-in-out infinite",
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
        "pulse-slower": "pulse-slower 8s ease-in-out infinite",
        "slow-zoom": "slow-zoom 20s ease-out forwards",
        "draw-line": "draw-line 2s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
