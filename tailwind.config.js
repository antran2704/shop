/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f8796c",
        white: "#ffffff",
        dark: "#000000",
        transparent: "transparent",
        borderColor: "#ededed",
      },
    },
  },
  plugins: [],
};
