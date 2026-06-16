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

## Post-quest flow

The post-quest flow lets a user describe what they need in plain text, then hands the conversation off to an AI agent that elicits the structured data needed to post a quest. Auth is deliberately deferred until after the first message so the entry point stays frictionless.

### Phase machine

The controller (`src/controllers/usePostQuest.ts`) drives the whole flow via a `phase` state:

```
prompt → auth → chat → posting → done
                              ↘ error
```

| Phase | What the user sees | What's happening |
|---|---|---|
| `prompt` | Landing page with the text input | Public, no auth required |
| `auth` | Auth screen (signup by default) | Prompt is stored in memory; waiting for sign-in |
| `chat` | Full-screen agent conversation | Authenticated; agent is eliciting quest fields turn by turn |
| `posting` | Chat locked, agent "typing" | Controller is submitting the completed quest to the backend |
| `done` | Success confirmation | Quest posted |
| `error` | Error state with retry | API call failed |

### Auth gate behaviour

When the user submits their first prompt:

1. `submitInitialPrompt()` stores the message and checks `isAuthenticated`
2. If not authenticated → `phase = 'auth'`; `PostQuestFlow` renders `AuthScreen` in-place (no page navigation, so the prompt stays in memory)
3. The user signs in or creates an account — this fires Firebase's `onAuthStateChanged`
4. `AuthContext` updates global `user` state → `isAuthenticated` becomes `true`
5. A `useEffect` in `usePostQuest` detects `phase === 'auth' && isAuthenticated` and automatically advances to `'chat'`, resuming the agent turn with the original message

The login ↔ signup toggle on the inline auth screen is handled via local `authMode` state in `PostQuestFlow` — no navigation occurs, so flow state is never lost.

### Key files

| File | Role |
|---|---|
| `src/app/(public)/post-quest/page.tsx` | Route entry point |
| `src/components/post-quest/PostQuestFlow.tsx` | View — phase router, renders the right screen per phase |
| `src/components/post-quest/PromptInput.tsx` | View — initial text input |
| `src/components/post-quest/QuestChat.tsx` | View — agent conversation UI |
| `src/components/auth/AuthScreen.tsx` | View — shared auth UI, rendered inline during `auth` phase |
| `src/controllers/usePostQuest.ts` | Controller — phase machine, agent calls, quest submission |
| `src/lib/api/agent.ts` | Model — sends chat history to the agent API |
| `src/lib/api/quests.ts` | Model — POSTs the completed quest to the backend |
| `src/lib/models/quest.ts` | Types — `ChatMessage`, `AgentTurnResponse`, `PostQuestPayload` |

### What's stubbed (TODOs before production)

- `src/lib/firebase/auth.ts` — Firebase functions are commented out; uncomment after `config.ts` is wired
- `src/context/AuthContext.tsx` — `onAuthStateChanged` listener is commented out; `user` is hardcoded `null`
- `src/controllers/usePostQuest.ts` — Firebase ID token passed as `''` to agent and quest APIs
- `src/components/auth/AuthScreen.tsx` — form `onSubmit` calls `e.preventDefault()` only; no real submission
- `src/middleware.ts` — session-cookie check is commented out; all protected routes pass through

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
# Quest
# Quest
