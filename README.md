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
│   ├── models/            # TypeScript types for domain objects
│   └── posthog-server.ts  # Server-side PostHog singleton (posthog-node)
├── middleware.ts           # Route protection (runs before page render)
└── types/                 # Shared type re-exports
instrumentation-client.ts  # Client-side PostHog init (Next.js 15.3+ pattern)
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

---

## Security model

### Session cookie (`__session`)

Firebase Hosting only forwards one cookie to Cloud Run: **`__session`**. All other cookies are stripped at the CDN layer. Do not rename this cookie or introduce a second session mechanism.

The cookie is issued exclusively by the server (`POST /api/auth/session`) after verifying a Firebase ID token with the Admin SDK. It is set with `HttpOnly` and `Secure` flags — client JavaScript cannot read or write it. Never set it via `document.cookie`.

```
Sign-in flow
  Firebase onAuthStateChanged (client)
    → getIdToken()
    → POST /api/auth/session  { idToken }   ← verifyIdToken() runs here
    → Set-Cookie: __session=1; HttpOnly; Secure; SameSite=Lax
    → middleware reads cookie → grants access to protected routes

Sign-out flow
  Firebase signOut() (client)
    → onAuthStateChanged fires with null
    → DELETE /api/auth/session
    → Set-Cookie: __session=; Max-Age=0
```

### API route authentication

Every route handler that touches user data must:

1. Extract the `Authorization: Bearer <idToken>` header
2. Call `verifyIdToken()` from `src/lib/firebase/admin.ts`
3. Assert that the verified `uid` matches the `userId` in the request body or query params before proceeding

The session cookie is for **page-level routing only** (middleware redirects). It is not a substitute for token verification inside API routes — those are independent security boundaries.

### Agent API routes

The three agent routes (`/api/agent/sessions`, `/api/agent/run`, `/api/agent/sessions/result`) all enforce the above pattern. Requests to the upstream ADK agent are authenticated via GCP OIDC (fetched from the Cloud Run metadata server). Locally, the OIDC header is omitted; configure the dev agent to allow unauthenticated requests for local development.

### Cookie scope and the Firebase Hosting constraint

Firebase Hosting acts as a CDN in front of Cloud Run. To enable caching, it strips all cookies from forwarded requests — **except `__session`**, which is a hardcoded whitelist. This means:

| Cookie type | Any name allowed? | Readable server-side (middleware / route handlers)? |
|---|---|---|
| Client-side only (theme, preferences, analytics) | Yes | No — but you don't need it to be |
| Server-readable (auth, middleware checks) | **No — must be `__session`** | Yes |

Purely client-side cookies (e.g. `theme=dark`) work normally — client JS reads and writes them, and no server involvement is needed. You only hit the restriction when you need middleware or a route handler to read the value.

If you need to carry additional server-readable state in future (e.g. a user's country code for SSR), encode it inside `__session` as a JSON payload or signed JWT rather than adding a second cookie. The cookie name must stay `__session` for Firebase Hosting to forward it.

### Key security files

| File | Role |
|---|---|
| `src/middleware.ts` | Reads `__session` cookie; redirects unauthenticated users away from protected routes |
| `src/app/api/auth/session/route.ts` | Issues and clears the `__session` cookie server-side |
| `src/lib/firebase/admin.ts` | Firebase Admin SDK singleton; exports `verifyIdToken()` |
| `src/lib/gcp/oidc.ts` | Fetches a GCP OIDC token for agent-to-agent auth on Cloud Run |
| `src/context/AuthContext.tsx` | Calls the session route on auth state changes; never touches `document.cookie` |

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

## PostHog analytics

PostHog is integrated for product analytics, session replay, and error tracking.

### Required env vars

```bash
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=<your_token>
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Add these to `.env.local` for local development and to your deployment environment (Vercel / Cloud Run) before going live.

### How it works

- **Client-side** — `instrumentation-client.ts` at the project root initialises `posthog-js` once on page load. `$pageview` is captured automatically on every navigation. Custom events (`user_logged_in`, `user_signed_up`, `post_quest_completed`, etc.) are captured from components and controllers.
- **Server-side** — `src/lib/posthog-server.ts` provides a `getPostHogClient()` singleton used in API routes to capture server-side events (`server_user_signup`, `server_waitlist_signup`).
- **Reverse proxy** — `next.config.ts` rewrites `/ingest/*` to PostHog's ingest endpoint so events are less likely to be blocked by ad blockers.
- **User identity** — `posthog.identify(uid, { email })` is called on login and signup, and `posthog.reset()` on sign-out.

### Tracked events

| Event | Where |
|---|---|
| `user_logged_in` | `AuthScreen.tsx` — email, Google, Apple |
| `user_signed_up` | `AuthScreen.tsx` — email, Google, Apple |
| `user_logged_out` | `useAuth.ts` |
| `signup_method_selected` | `AuthScreen.tsx` |
| `post_quest_prompt_submitted` | `usePostQuest.ts` |
| `post_quest_completed` | `usePostQuest.ts` |
| `post_quest_failed` | `usePostQuest.ts` |
| `home_prompt_submitted` | `HireHumanPrompt.tsx` |
| `home_suggestion_clicked` | `HireHumanPrompt.tsx` |
| `browse_category_changed` | `QuestList.tsx` |
| `browse_load_more_clicked` | `QuestList.tsx` |
| `agent_waitlist_submitted` | `AgentWaitlistForm.tsx` |
| `server_user_signup` | `api/auth/signup/route.ts` |
| `server_waitlist_signup` | `api/waitlist/route.ts` |

---

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
