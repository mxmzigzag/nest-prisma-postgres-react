module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./dist/index.html"],
  theme: {
    extend: {
      colors: {
        offWhite: "#f7f7f7",
        offWhiteLight: "#e6e6e6",
        bBrown: "#deb887",
        bBrownHover: "#d89e52",
        bAuthBg: "#a37340",
        bGray: "#969696",
        bGrayLight: "#cccccc",
        bModalBack: "rgba(0, 0, 0, 0.25);",
        bFooter: "#46321e",
        bInputBorder: "#755e3d;",
        bGreen: "#49a930",
        bRed: "#ff3333",
        bRequestBg: "#e6e6e6",
      },
      fontSize: {
        xxs: "10px",
      },
      backgroundImage: {
        bBgGradient: "linear-gradient(to bottom, transparent 0%, black 150%)",
      },
      boxShadow: {
        bShadow: "box-shadow: 0px 0px 10px rgb(0, 0, 0, 0.18)",
        bShadowHover: "box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);",
      },
      gridTemplateColumns: {
        bRequestGrid: "0.1fr 1fr 0.4fr 0.4fr 0.05fr",
        bCategoryGrid: "0.1fr 1fr 1fr",
      },
    },
  },
  plugins: [],
};
