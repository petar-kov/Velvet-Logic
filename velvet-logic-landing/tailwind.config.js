/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===== VELVET LOGIC INDUSTRIAL DESIGN SYSTEM =====
        // Primary Brand Colors
        obsidian: "#1E293B",     // Slate 800 - Primary Text
        mercury: "#F8FAFC",      // Slate 50 - Primary Background (inverted from previous)
        violet: "#2563EB",       // Navy Blue - Primary Brand (keeps class name for compatibility)
        "logic-gray": "#475569", // Slate 600 - Secondary Text
        
        // New explicit industrial colors
        navy: "#2563EB",
        orange: "#F97316",
        slate: "#1E293B",
        surface: "#FFFFFF",
        
        // Legacy Compatibility
        primary: "#2563EB",      // Navy Blue
        cta: "#F97316",          // Safety Orange
        accent: "#2563EB",       // Navy Blue
        background: "#F8FAFC",   // Slate 50
        secondary: "#475569",    // Slate 600
        gray: "#64748B",         // Slate 500
      },
      
      boxShadow: {
        // Industrial smooth shadows (replaced neon glows)
        "neon-violet": "0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.06)",
        "neon-violet-intense": "0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05)",
        "neon-glow": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "neon-glow-lg": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "industrial": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      
      letterSpacing: {
        tight: "-0.025em",
        brand: "0.05em",
      },
      
      lineHeight: {
        relaxed: "1.6",
        brand: "1.4",
        tight: "1.2",
      },
      
      animation: {
        "ascent-reveal": "ascent-reveal 0.6s ease-out",
      },
      
      keyframes: {
        "ascent-reveal": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
}
