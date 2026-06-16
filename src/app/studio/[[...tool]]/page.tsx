import Studio from "./Studio";

// Embedded Sanity Studio mounted at /studio inside the Next.js app.
// The actual Studio tree lives in the "use client" Studio.tsx wrapper
// (@sanity/ui uses React context at module scope and can't render in a
// Server Component). This file stays a Server Component so it can export
// the Studio's metadata/viewport.
export const dynamic = "force-dynamic";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
