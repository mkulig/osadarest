// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import purgecss from "astro-purgecss";

// https://astro.build/config
export default defineConfig({
	site: "https://osadarest.pl",
	integrations: [mdx(), sitemap(), purgecss()],
	trailingSlash: "never",

	vite: {
		plugins: [tailwindcss()],
	},
	experimental: {
		fonts: [
			{
				provider: "local",
				name: "Satoshi",
				cssVariable: "--font-satoshi",
				variants: [
					{
						weight: 300,
						src: [
							"./src/assets/fonts/Satoshi-Light.woff2",
							"./src/assets/fonts/Satoshi-Light.woff",
						],
					},
					{
						weight: 400,
						src: [
							"./src/assets/fonts/Satoshi-Regular.woff2",
							"./src/assets/fonts/Satoshi-Regular.woff",
						],
					},
					{
						weight: 600,
						src: [
							"./src/assets/fonts/Satoshi-Medium.woff2",
							"./src/assets/fonts/Satoshi-Medium.woff",
						],
					},
					{
						weight: 700,
						src: [
							"./src/assets/fonts/Satoshi-Bold.woff2",
							"./src/assets/fonts/Satoshi-Bold.woff",
						],
					},
				],
			},
		],
	},
});
