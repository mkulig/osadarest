import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const apartments = defineCollection({
	loader: glob({ base: "./src/content/apartments", pattern: "**/*.{md,mdx}" }),
	// type: "content",
	schema: z.object({
		title: z.string(), // nazwa apartamentu
		description: z.string().max(220), // teaser do kafelka
		slug: z.string().regex(/^[a-z0-9-]+$/), // kontrola slugów
		featured: z.boolean().default(false),
		order: z.number().default(0),
		color: z.string(),

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

		// obrazy
		cover: z.string(),
		coverAlt: z.string(),
		gallery: z
			.array(
				z.object({
					src: z.string(),
					alt: z.string().optional(),
				}),
			)
			.default([]),

		// SEO (opcjonalne)
		seoTitle: z.string().optional(),
		seoDescription: z.string().optional(),
		canonical: z.string().url().optional(),

		// powiązane wpisy (opcjonalne, np. atrakcje)
		related: z.array(reference("apartments")).optional(),
	}),
});

export const collections = { blog, apartments };
