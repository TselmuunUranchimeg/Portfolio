module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        "12%": "12%",
        "4.5%": "4.5%"
      },
      borderRadius: {
        "half": "50%"
      },
      screens: {
        "mobile": "430px",
        "fold": "300px",
      },
      keyframes: {
        extend: {
          '0%': { width: '0%' },
          "100%": { width: '100%' }
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        }
      },
      animation: {
        extend: "extend 0.5s ease-in-out 1",
        fadeIn: "fadeIn 0.5s ease-in-out 1",
      }
    },
  },
  important: true,
  plugins: [],
}
