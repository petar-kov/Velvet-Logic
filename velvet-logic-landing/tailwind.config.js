/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // Indigo
        cta: "#10B981",     // Emerald
        accent: "#F59E0B",  // Amber
        background: "#FFFFFF",
        slate: "#1E293B",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
