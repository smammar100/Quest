import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

// Build a CDN URL for a Sanity image (respects hotspot/crop).
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
