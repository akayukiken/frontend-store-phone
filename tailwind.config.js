/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // aktifkan dark mode dengan class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2c2c2c",
        secondary: "#7DA4A1",
        accent: "#4F46E5", // tambahan warna aksen
        darkbg: "#1a1a1a", // tambahan warna background dark
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"), // plugin scrollbar-hide
  ],
};
