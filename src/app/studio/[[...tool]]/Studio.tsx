"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// Client boundary for the embedded Studio. @sanity/ui uses React context
// at module scope, so the Studio tree must live inside a "use client"
// component (otherwise SSR throws "createContext only works in Client
// Components").
export default function Studio() {
  return <NextStudio config={config} />;
}
