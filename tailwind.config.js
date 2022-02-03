module.exports = {
  content: ["./src/index.html", "./src/**/index.html", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
