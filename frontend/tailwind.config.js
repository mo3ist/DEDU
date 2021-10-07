const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
	colors: {
		primary: {
			light: "#C89978",
			DEFAULT: "#C26B3A"
		},
		secondary: {
			light: "#C4C4C4",
			DEFAULT: "#353535"
		},
		black: colors.black,
		white: colors.white,
		gray: colors.trueGray,
		indigo: colors.indigo,
		red: colors.rose,
		yellow: colors.amber,
	}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}