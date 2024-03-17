/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        DraggedElementEnter: {
          "0%": { opacity: 0, transform: "translateX(-5px) scale(0.7)" },
          "70%": { transform: "scale(1.2)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        DraggedElementEnter: {
          "0%": { opacity: 1, transform: "translateX(0) scale(1)" },

          "100%": { opacity: 0, transform: "translateY(10px) scale(1)" },
        },
      },
      animation: {
        DraggedElementEnter: "DraggedElementEnter 0.2s ease-out forwards",
        DraggedElementLeave: "DraggedElementLeave 0.2s ease-out forwards",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".flex-center": {
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
        },
        ".shadow": {
          filter: "drop-shadow(2px 8px 4px #05050570)",
        },
        ".flex-between": {
          display: "flex",
          "align-items": "center",
          "justify-content": "space-between",
        },
        ".border-dark": {
          border: "1px solid #282828",
        },
        ".border-light": {
          border: "1px solid #69696951",
        },
        ".flex-col": {
          display: "flex",
          "flex-direction": "column",
        },

        ".flex-row": {
          display: "flex",
          "flex-direction": "row",
        },
        ".button-hover": {
          color: "#F28C28",
          "border-radius": "4px",
          "transition-property": "all",
          "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
          "transition-duration": "150ms",
          background: "rgb(38 38 38)",
          cursor: "pointer",
        },
      }
      addUtilities(newUtilities, ["responsive", "hover"])
    },
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities({
        "col-gap": (value) => {
          return {
            display: "flex",
            "flex-direction": "column",
            gap: value,
          }
        },
      })
    }),
  ],
}
