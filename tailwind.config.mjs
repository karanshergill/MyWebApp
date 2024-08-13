/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'heading': ['"Russo One"', 'system-ui', 'sans-serif'],
				'sub-heading': ['"Belanosima"', 'system-ui', 'sans-serif'],
				'description': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				'paragraph': ['"Rajdhani"', 'system-ui', 'sans-serif'],
				'footer' : ['"Exo 2"', 'system-ui', 'sans-serif']
			},
			backgroundImage: {
				'img-home': "url('/src/assets/images/bg-home.png')",
				'gradient-hero': "linear-gradient(to right, #facc15 0%, #ec4899 30%, #4f46e5 40%, #0ea5e9 60%, #10b981 60%, #4f46e5 90%, #ec4899 100%)"
			}
		},
	},
	plugins: [],
}
