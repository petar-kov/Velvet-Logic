/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#1E293B",
        mercury: "#F8FAFC",
        violet: "#2563EB",
        navy: "#2563EB",
        orange: "#F97316",
        slate: "#1E293B",
        surface: "#FFFFFF",
        primary: "#2563EB",
        cta: "#F97316",
        accent: "#2563EB",
        background: "#F8FAFC",
        secondary: "#475569",
        gray: "#64748B",
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
