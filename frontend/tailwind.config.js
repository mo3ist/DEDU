const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
		fontFamily: {
			'cairo': 'Cairo',
		},
		typography: {
			DEFAULT: {
				css: {
					color: "#353535",
					"line-height": "1",
					h1: {
						color: "#353535"
					},
					h2: {
						color: "#353535"
					},
					h3: {
						color: "#353535"
					},
					ul: {
						margin: 0,
						padding: 0,
						"list-style-type": "circle",
						"list-style-position": "inside"
					},
					"li::before": {
						display: "none"
					}
					
				}
			}
		}
	},
	colors: {
		primary: {
			100: "#C89978",
			DEFAULT: "#C26B3A"
		},
		secondary: {
			100: "#C4C4C4",
			200: "#858585",
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
  plugins: [
	require('@tailwindcss/typography'),
  ],
}