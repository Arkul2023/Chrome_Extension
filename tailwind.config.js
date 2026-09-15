import animate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */

export default {

  darkMode: ["class"],

  content: [
    "./sidebar.html",
    "./src/**/*.{js,jsx}"
  ],

  theme: {

    extend: {

      colors: {

        /* Base */

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        surface: "hsl(var(--surface))",
        "surface-secondary": "hsl(var(--surface-secondary))",
        "surface-hover": "hsl(var(--surface-hover))",

        /* Cards */

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },

        /* Primary */

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          active: "hsl(var(--primary-active))",
          light: "hsl(var(--primary-light))"
        },

        /* Secondary */

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))"
        },

        /* Muted */

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },

        /* Success */

        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          light: "hsl(var(--success-light))"
        },

        /* Warning */

        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          light: "hsl(var(--warning-light))"
        },

        /* Error */

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          light: "hsl(var(--destructive-light))"
        },

        /* Info */

        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
          light: "hsl(var(--info-light))"
        }

      },

      borderRadius: {

        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)"

      },

      boxShadow: {

        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        glow: "var(--shadow-glow)",
        "glow-hover": "var(--shadow-glow-hover)"

      }

    }

  },

  plugins: [animate]

};