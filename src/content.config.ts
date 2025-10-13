import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.preprocess((val) => `@assets/${val}`, image()),
		}),
});

const apartments = defineCollection({
	loader: glob({ base: "./src/content/apartments", pattern: "**/*.{md,mdx}" }),
	// type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(), // nazwa apartamentu
			description: z.string().max(220), // teaser do kafelka
			slug: z.string().regex(/^[a-z0-9-]+$/), // kontrola slugów
			featured: z.boolean().default(false),
			order: z.number().default(0),
			color: z.object({
				text: z.string(),
				fill: z.string(),
				gradient: z.string(),
			}),

			capacity: z.number().int().positive(), // osoby
			areaM2: z.number().positive(),
			beds: z.string().optional(), // opis łóżek

			priceFrom: z.number().optional(),
			currency: z.string().default("PLN"),

			amenities: z
				.array(
					z.object({
						icon: z.string().optional(),
						label: z.string(),
					}),
				)
				.default([]),

			cover: z.preprocess((val) => `@assets/${val}`, image()),
			coverAlt: z.string(),
			gallery: z
				.array(
					z.object({
						src: z.preprocess((val) => `@assets/${val}`, image()),
						alt: z.string().optional(),
					}),
				)
				.default([]),

			// SEO
			seoTitle: z.string().optional(),
			seoDescription: z.string().optional(),
			canonical: z.string().url().optional(),
		}),
});

export const collections = { blog, apartments };
