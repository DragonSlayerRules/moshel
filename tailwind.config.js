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
      fontFamily: {
        revxRegular: "revxRegular",
        revxSemiBold: "revxSemiBold",
      },
      screens: {
        xxs: "400px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "980px",
        xl: "1280px",
        "2xl": "1440px",
      },
      colors: {
        primary: "#F1F6F9",
        secondary: "#1F1F1F",
        tertiary: "#9BA4B4",
        stroke: "#000000",
        highlight: "lightGray",
      },
    },
  },
  plugins: [],
};
