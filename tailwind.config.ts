import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
	  colors: {
        coral: {
          500: "#ff6f61",
        },
      },
      animation: {
		
        "fade-in": "fadeIn 0.8s ease forwards",
		"slide-in-top": "slideInTop 0.8s ease forwards",
        "slide-in-bottom": "slideInBottom 0.8s ease forwards",
        "pulse-slow": "pulseSlow 6s infinite",
        "pulse-fast": "pulseFast 0.8s infinite",
        float: "float 4s infinite ease-in-out",
        "on-scroll": "onScroll 0.6s ease forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
		slideInTop: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInBottom: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        pulseFast: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        onScroll: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
