/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				border: "hsl(var(--border))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				paper: "hsl(var(--paper))",
				ink: "hsl(var(--ink))",
				accent: "hsl(var(--accent))",
			},
			fontFamily: {
				display: ["var(--font-display)"],
				body: ["var(--font-body)"],
			},
		},
	},
	plugins: [],
}
