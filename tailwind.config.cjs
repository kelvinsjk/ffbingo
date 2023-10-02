const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [daisyui, require('@tailwindcss/typography')],

	daisyui: {
		themes: ['light']
	}
};

module.exports = config;
