// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import compressor from "astro-compressor";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
	site: "https://osadarest.pl",
	integrations: [
		mdx(),
		sitemap(),
		robotsTxt({
			host: "osadarest.pl",
		}),
		compressor(),
	],
	trailingSlash: "never",
	prefetch: true,
	image: {
		// responsiveStyles: true,
		layout: "constrained",
	},

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
