import { createClient } from "next-sanity";

// Read-only Sanity client for fetching published content into the Next app.
// projectId/dataset are public; mirrors sanity.config.ts.
export const sanityClient = createClient({
  // From .env.local (NEXT_PUBLIC_*), with the known values as a safe fallback
  // so the app works even if the deploy hasn't set env vars (all public).
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "2pg6mq7a",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-06-16",
  // Read straight from the API so published Studio edits show on reload.
  // For production scale, switch to useCdn:true + tag/webhook revalidation.
  useCdn: false,
});
