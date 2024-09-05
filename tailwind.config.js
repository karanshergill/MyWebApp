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
				'footer': ['"Exo 2"', 'system-ui', 'sans-serif']
			},
			backgroundImage: {
				'home-background': "url('/home-background.png')",
				'gradient-hero': "linear-gradient(to right, #facc15 0%, #ec4899 30%, #4f46e5 40%, #0ea5e9 60%, #10b981 60%, #4f46e5 90%, #ec4899 100%)",
			},
			keyframes: {
				rubberBand: {
					from: { transform: 'scale3d(1, 1, 1)', },
					'30%': { transform: 'scale3d(1.25, 0.75, 1)', },
					'40%': { transform: 'scale3d(0.75, 1.25, 1)', },
					'50%': { transform: 'scale3d(1.15, 0.85, 1)', },
					'65%': { transform: 'scale3d(0.95, 1.05, 1)', },
					'75%': { transform: 'scale3d(1.05, 0.95, 1)', },
					to: { transform: 'scale3d(1, 1, 1)', },
				},
				jello: {
					'from, 11.1%,to': { transform: 'translate3d(0, 0, 0)', },
					'22.2%': { transform: 'skewX(-12.5deg) skewY(-12.5deg)', },
					'33.3%': { transform: 'skewX(6.25deg) skewY(6.25deg)', },
					'44.4%': { transform: 'skewX(-3.125deg) skewY(-3.125deg)', },
					'55.5%': { transform: 'skewX(1.5625deg) skewY(1.5625deg)', },
					'66.6%': { transform: 'skewX(-0.78125deg) skewY(-0.78125deg)', },
					'77.7%': { transform: 'skewX(0.390625deg) skewY(0.390625deg)', },
					'88.8%': { transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)', },
				},
			},
			animation: {
				rubberBand: 'rubberBand 1s infinite',
				jello: 'jello 1.5s infinite'
			}
		},
		plugins: [],
	}
}
