/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: {
        DEFAULT: "#00bbff",
        light: "#dcf8ff",
      },
      secondary: {
        DEFAULT: "#ff8e8e",
        light: "#ffebeb",
      },
      ascent: {
        DEFAULT: "#00374a",
        light: "#f0f6f9",
      },
      dark: {
        DEFAULT: "#160831",
        600: "#4d5b61",
        500: "#7e8588",
        400: "#a0a6a9",
        300: "#e4ebee",
        200: "#f0f4f5",
        100: "#f7fbfc",
      },
      info: {
        DEFAULT: "#00b4ff",
        light: "#deefff",
      },
      success: {
        DEFAULT: "#54cca1",
        light: "#dcf4ec",
      },
      warning: {
        DEFAULT: "#ffa826",
        light: "#fff2de",
      },
      danger: {
        DEFAULT: "#ff5c5c",
        light: "#ffedf3",
      },
      white: "#ffffff",
    },
  },
  plugins: [import("@tailwindcss/forms")],
};
