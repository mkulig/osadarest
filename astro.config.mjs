// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import compressor from "astro-compressor";
// import criticalCss from "astro-critical-css";
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
		// criticalCss(),
		compressor({ zstd: false, brotli: true, gzip: true }),
	],
	trailingSlash: "never",
	prefetch: false, // own logic for prefetch
	image: {
		// responsiveStyles: true,
		layout: "constrained",
		breakpoints: [380, 640, 960, 1280],
	},
	build: {
		inlineStylesheets: "always",
	},
	vite: {
		plugins: [tailwindcss({ optimize: true })],
		build: {
			rollupOptions: {
				output: {
					entryFileNames: "_astro/[hash:6].js",
					chunkFileNames: "_astro/[hash:6].js",
					assetFileNames: "_astro/[hash:6][extname]",
				},
			},
		},
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
