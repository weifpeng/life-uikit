/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "../../packages/**/*.tsx","./.storybook/preview.tsx"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#1677ff",
      },
    },
  },
  plugins: [],
};
