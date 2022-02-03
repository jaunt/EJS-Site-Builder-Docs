module.exports = {
  content: ["./src/index.html", "./src/**/index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
