# Quest Website

## Project structure

```
src/
├── app/
│   ├── (public)/          # Unprotected routes (no auth required)
│   ├── (protected)/       # Auth-guarded routes
│   ├── layout.tsx         # Root layout
│   └── globals.css
├── components/
│   ├── layout/            # SiteHeader, SiteFooter, Nav
│   └── sections/          # Page-section components
├── controllers/           # Custom hooks connecting views to models
├── context/               # Global state providers (AuthContext, etc.)
├── lib/
│   ├── data/              # Static/seed data
│   ├── firebase/          # Firebase init, auth helpers, Firestore helpers
│   └── models/            # TypeScript types for domain objects
├── middleware.ts           # Route protection (runs before page render)
└── types/                 # Shared type re-exports
```

## Flutter → Next.js concept map

For developers coming from a Flutter background:

| Flutter concept | Next.js / React equivalent | Where it lives |
|---|---|---|
| `Navigator` + route guards | Route groups + `middleware.ts` | `src/app/(public)/`, `src/app/(protected)/`, `src/middleware.ts` |
| `StreamProvider` / `onAuthStateChanged` | `AuthContext` + `useEffect` | `src/context/AuthContext.tsx` |
| Controller / BLoC | Custom hook | `src/controllers/` |
| Service / Repository | Firebase helper module | `src/lib/firebase/` |
| Model class | TypeScript type | `src/lib/models/` |
| Widget (stateless) | Server Component (default) | `src/components/` |
| Widget (stateful) | Client Component (`'use client'`) | `src/components/` |
| `BuildContext` | React context via `useContext` | `src/context/` |
| `setState` | `useState` / `useReducer` | Inside Client Components |
| `initState` / `dispose` | `useEffect(() => { … return cleanup }, [])` | Inside Client Components |

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sanity CMS

Content for the `/quests/[category]` pages (hero copy, earnings data, FAQs, quest listings) is managed in Sanity.

- **Project ID:** `2pg6mq7a`
- **Dataset:** `production`
- **Studio:** `/studio` (embedded in the Next.js app — requires auth)
- **Hosted Studio:** [quest-inc.sanity.studio](https://quest-inc.sanity.studio)

### Schema

The `category` document type lives in `schemaTypes/category.ts`. After editing the schema, deploy it:

```bash
npx sanity schema deploy
```

### Accessing the Studio

Navigate to `/studio` in the running dev server and sign in with the `hello@quest-inc.co` Google account. Each category page (`field-data`, `errands`, `content`, `events`, `home`) has a document in the Studio where you can edit all CMS-driven content.
