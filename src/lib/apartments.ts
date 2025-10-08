import type { CollectionEntry } from "astro:content";

export function toCardProps(entry: CollectionEntry<"apartmenty">) {
	const { data } = entry;
	const url = `/apartamenty/${data.slug}/`;
	return {
		slug: data.slug,
		title: data.title,
		description: data.description,
		color: data.color,
		cover: data.cover,
		coverAlt: data.coverAlt,
		capacity: data.capacity,
		areaM2: data.areaM2,
		beds: data.beds,
		priceFrom: data.priceFrom,
		currency: data.currency,
		amenities: data.amenities,
		ctaLabel: "Zobacz szczegóły",
		url,
	};
}

export function toOfferLD(entry: CollectionEntry<"apartmenty">) {
	const { data } = entry;
	const url = `/apartamenty/${data.slug}/`;
	return {
		"@type": "Offer",
		url,
		itemOffered: {
			"@type": "Accommodation",
			name: data.title,
			floorSize: {
				"@type": "QuantitativeValue",
				value: data.areaM2,
				unitCode: "MTK",
			},
			occupancy: { "@type": "QuantitativeValue", value: data.capacity },
			bed: data.beds,
			amenityFeature: data.amenities.map((a) => ({
				"@type": "LocationFeatureSpecification",
				name: a.label,
				value: true,
			})),
			image: data.cover.jpg,
		},
		priceSpecification: data.priceFrom
			? {
					"@type": "PriceSpecification",
					price: data.priceFrom,
					priceCurrency: data.currency,
				}
			: undefined,
		availability: "https://schema.org/InStock",
	};
}
