/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ===== VELVET LOGIC DESIGN SYSTEM (V3) =====
        // Primary Brand Colors
        obsidian: "#080808",     // Deep Black - Primary Background
        mercury: "#E5E5E5",      // Silver Mercury - Primary Text
        violet: "#7F00FF",       // Electric Violet - Brand Accent & CTA
        "logic-gray": "#888888", // Logic Gray - Secondary Text
        
        // Legacy Compatibility
        primary: "#7F00FF",      // Electric Violet
        cta: "#7F00FF",          // Electric Violet
        accent: "#7F00FF",       // Electric Violet
        background: "#080808",   // Obsidian Black
        slate: "#E5E5E5",        // Silver Mercury
        secondary: "#888888",    // Logic Gray
        gray: "#888888",         // Logic Gray
      },
      
      boxShadow: {
        // Neon Glow Effects
        "neon-violet": "0 0 20px rgba(127, 0, 255, 0.4), 0 0 40px rgba(127, 0, 255, 0.2)",
        "neon-violet-intense": "0 0 30px rgba(127, 0, 255, 0.8), 0 0 60px rgba(127, 0, 255, 0.4)",
        "neon-glow": "0 0 20px rgba(127, 0, 255, 0.4)",
        "neon-glow-lg": "0 0 40px rgba(127, 0, 255, 0.6), inset 0 0 30px rgba(127, 0, 255, 0.1)",
      },
      
      fontFamily: {
        heading: ["Inter Tight", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      
      letterSpacing: {
        tight: "-0.05em",
        brand: "0.15em",
      },
      
      lineHeight: {
        relaxed: "1.6",
        brand: "1.4",
        tight: "1.2",
      },
      
      animation: {
        glow: "glow 3s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2.8s ease-in-out infinite",
        "ascent-reveal": "ascent-reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
      },
      
      keyframes: {
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(127, 0, 255, 0.4), inset 0 0 5px rgba(127, 0, 255, 0.1)",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(127, 0, 255, 0.8), inset 0 0 10px rgba(127, 0, 255, 0.2)",
          },
        },
        "pulse-neon": {
          "0%, 100%": {
            boxShadow: "0 0 30px rgba(127, 0, 255, 0.5)",
            opacity: "1",
          },
          "50%": {
            boxShadow: "0 0 60px rgba(127, 0, 255, 1)",
            opacity: "0.8",
          },
        },
        "ascent-reveal": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
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
