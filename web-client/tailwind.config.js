/** @type {import('tailwindcss').Config} */

import tailwindFormPlugin from "@tailwindcss/forms"

module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.{ts,tsx}", "index.html"],
  prefix: "",
  theme: {
    extend: {
      width: {
        75: "18.75rem",
      },
      fontSize: {
        "2xs": [
          "0.75rem",
          {
            lineHeight: 1.5,
            fontWeight: 700,
          },
        ],
        xs: [
          "0.8125rem",
          {
            lineHeight: 1.77,
            fontWeight: 500,
          },
        ],
        base: [
          "0.9375rem",
          {
            lineHeight: 1.5,
            fontWeight: 700,
          },
        ],
        lg: [
          "1.125rem",
          {
            lineHeight: 1.5,
            fontWeight: 700,
          },
        ],
        xl: [
          "1.5rem",
          {
            lineHeight: 1.5,
            fontWeight: 700,
          },
        ],
      },
      backgroundImage: {
        "gradient-light":
          "linear-gradient(180deg, hsla(219,63%,95%,1) 0%, hsla(218,66%,95%,0.5) 100%)",
        "gradient-dark":
          "linear-gradient(180deg, hsla(234, 13%, 19%, 1) 0%, hsla(234, 13%, 19%, 0.5) 100%)",
      },
      colors: {
        custom: {
          "dark-purple": "hsl(242, 48%, 58%)",
          "light-purple": "hsl(243, 100%, 82%)",
          "light-purple-10": "hsla(242, 48%, 58%, 0.1)",
          "light-purple-25": "hsla(242, 48%, 58%, 0.25)",
          black: "hsl(237, 100%, 4%)",
          "black-50": "hsla(0, 100%, 0%, 0.50)",
          "very-dark-grey": "hsl(235, 16%, 15%)",
          "dark-grey": "hsl(235, 12%, 19%)",
          "dark-lines": "hsl(236, 11%, 27%)",
          "medium-grey": "hsl(216, 15%, 57%)",
          "medium-grey-25": "hsla(216, 15%, 57%, 0.25)",
          "medium-lines": "hsl(221, 69%, 94%)",
          "light-lines": "hsl(196, 69%, 94%)",
          "light-grey": "hsl(220, 69%, 97%)",
          white: "hsl(0, 0%, 100%)",
          "white-25": "hsla(0, 0%, 100%, 0.25)",
          red: "hsl(0, 78%, 63%)",
          "light-red": "hsl(0, 100%, 80%)",
          "gradient-grey-start": "hsla(219, 63%, 95%, 1)",
          "gradient-grey-end": "hsla(218, 66%, 95%, 0.5)",
        },
      },
      fontFamily: {
        "plus-jakarta-sans": ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [tailwindFormPlugin],
}
