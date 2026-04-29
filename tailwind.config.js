/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#d24a34",
        "accent-second": "#df452c",
        text: "#303030",
        light: "#fdfdfd",
        "border-input": "#bebebe",
        ingredients: "#959595",
        "accent-light": "#faedeb",
        "light-grey": "#ededed",
        bg: "#292929",
        "bg-inputs": "#f4f4f4",
      },
    },
  },
  plugins: [],
};
