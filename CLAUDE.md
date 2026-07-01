@AGENTS.md

---

# Team Structure

This project is worked on by two distinct teams. Read the section relevant to your role.

---

## Designers

Designers own the visual language and design standards of the website. Your work defines how the product looks and feels — typography, color, spacing, motion, and component aesthetics.

- Decisions about visual style, layout, and interaction patterns belong here
- When you hand off designs, document design tokens and component specs clearly so developers can implement them without ambiguity
- Flag any deviations from the design system early — consistency across pages is a shared responsibility

---

## Developers

Developers on this team have a Flutter background and are comfortable with backend integration, state management, and Firebase Authentication — but may need guidance on how those concepts map to the Next.js framework.

### Authentication & Routing

We use **Firebase Authentication** for all auth. The routing model maps roughly to Flutter's concept of guarded routes:

- **Unprotected routes** are accessible without a session (e.g. marketing pages, login, signup)
- **Protected routes** require a valid Firebase session and must redirect unauthenticated users to login
- Middleware is the correct Next.js mechanism for enforcing route protection — apply auth checks there rather than inside individual pages

Read `node_modules/next/dist/docs/` for the current Next.js routing and middleware APIs before implementing any auth logic.

### Architecture: MVC with Separation of Concerns

Structure code to follow an MVC pattern with clear boundaries between layers:

- **Model** — data shapes, Firebase data access, and business logic. Keep this framework-agnostic where possible
- **View** — Next.js pages and components. Views should only handle rendering and user interaction; no business logic here
- **Controller** — the layer that connects views to models. In Next.js this typically lives in Server Actions, Route Handlers, or custom hooks depending on the operation

### Flutter → Next.js Concept Map

If you know Flutter, use this table to orient yourself before writing code.

| Flutter concept | Next.js / React equivalent | Where it lives in this project |
|---|---|---|
| `Navigator` + route guards | Route groups + `middleware.ts` | `src/app/(public)/`, `src/app/(protected)/`, `src/middleware.ts` |
| `StreamProvider` / `onAuthStateChanged` listener | `AuthContext` + `useEffect` | `src/context/AuthContext.tsx` |
| Controller / BLoC | Custom hook | `src/controllers/useAuth.ts`, etc. |
| Service / Repository | Firebase helper module | `src/lib/firebase/auth.ts`, `firestore.ts` |
| Model class | TypeScript type | `src/lib/models/user.ts`, `task.ts` |
| Widget (stateless) | Server Component (default in App Router) | `src/components/` |
| Widget (stateful) | Client Component (`'use client'`) | `src/components/` |
| `BuildContext` | React context via `useContext` | `src/context/` |
| `setState` | `useState` / `useReducer` | Inside Client Components |
| `initState` / `dispose` | `useEffect(() => { … return cleanup }, [])` | Inside Client Components |

### Security Rules

These rules exist because we've already been burned by the anti-patterns below. Do not introduce exceptions without explicit review.

**Session cookie — never touch `document.cookie`**
The `__session` cookie is `HttpOnly`. Client JS cannot read or write it. All cookie management goes through `POST /api/auth/session` (set) and `DELETE /api/auth/session` (clear). `AuthContext` already calls these — do not duplicate the logic elsewhere.

**API routes — always verify the Firebase ID token**
Every route handler that reads or writes user data must call `verifyIdToken()` from `src/lib/firebase/admin.ts` and assert the decoded `uid` matches the `userId` in the request. The session cookie is only for middleware redirects — it is not proof of identity inside an API route.

```ts
// Required pattern for every authenticated route handler
const decoded = await verifyIdToken(req.headers.get('Authorization') ?? '');
if (decoded.uid !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
```

**URL path segments — always `encodeURIComponent`**
When constructing upstream URLs with user-supplied values (userId, sessionId), always wrap them in `encodeURIComponent()`. Values that come from a verified Firebase token are safe alphanumeric strings, but the encoding is still required as a defence-in-depth convention.

**Error responses — never forward raw upstream bodies to the client**
Log upstream errors server-side. Return only a generic message to the caller. Detailed backend error bodies (stack traces, field names, service identifiers) are useful to attackers.

**`__session` cookie name — do not rename**
Firebase Hosting strips all cookies except `__session` before forwarding requests to Cloud Run. Renaming it will silently break middleware-based route protection in production.

**Other cookies are fine — the restriction is server-readability only**
The `__session` constraint applies only to cookies that need to be read server-side (middleware, route handlers). Client-side cookies — theme preferences, dismissed banners, analytics identifiers — can use any name and work normally. If you need to carry additional server-readable state in future (e.g. country code for SSR), encode it inside `__session` as a JSON payload rather than adding a second cookie.

### State Management

State changes should flow cleanly through the MVC layers:

- Local UI state stays in components
- Shared or server-derived state (including auth state) should be lifted to a context provider or a dedicated state layer that any component can subscribe to
- Firebase Auth state changes (sign-in, sign-out, token refresh) must propagate to the state layer immediately — avoid reading auth state directly in components; go through the controller/context layer instead
- When the model changes (e.g. a Firestore write), the state layer is responsible for reflecting that change in the UI without requiring a full page reload
