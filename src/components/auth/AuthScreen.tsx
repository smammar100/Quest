"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/controllers/useAuth";
import {
  SOURCE_PLATFORMS,
} from "@/lib/data/dial-codes";
import s from "./auth.module.css";

type CountryDetectionResponse = {
  countryCode: string;
  source: "header" | "ipapi" | "ipinfo" | "country.is" | "fallback";
  detected: boolean;
  supported: boolean;
  message: string | null;
};

export type AuthMode = "login" | "signup";
export type AuthLayout = "centered" | "split" | "social";

const COPY = {
  login: {
    eyebrow: "Welcome back",
    title: "Log in to Quest",
    sub: "Pick up where you left off.",
    submit: "Log in",
    switchText: "New to Quest?",
    switchCta: "Create an account",
  },
  signup: {
    eyebrow: "Join Quest",
    title: "Create your account",
    sub: "Hire trusted humans, or start earning as one.",
    submit: "Create account",
    switchText: "Already have an account?",
    switchCta: "Log in",
  },
} as const;

const SPLIT_BENEFITS = [
  {
    icon: "verified",
    t: "Vetted, rated humans",
    b: "Every Hero has reviews and a track record you can see.",
  },
  {
    icon: "bolt",
    t: "Real work, done fast",
    b: "Hire a human in a sentence and get matched in minutes.",
  },
  {
    icon: "lock",
    t: "Payments held safely",
    b: "Funds release only when the job is done and you’re happy.",
  },
];

function GoogleIcon() {
  return (
    <svg className={s.glyph} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.27-4.74 3.27-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className={s.glyph} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.16-.47 7.84 1.3 10.4.86 1.26 1.89 2.67 3.24 2.62 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.28 3.14-2.55.99-1.46 1.4-2.87 1.42-2.94-.03-.01-2.72-1.05-2.74-4.17Zm-2.58-7.66c.72-.87 1.2-2.08 1.07-3.28-1.03.04-2.28.69-3.02 1.55-.66.77-1.24 2-.08 3.21.92.07 1.86-.61 2.61-1.48Z"
      />
    </svg>
  );
}

function Divider({ label = "or" }: { label?: string }) {
  return (
    <div className={s.divider} role="separator">
      <span>{label}</span>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: string;
  name?: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className={s.field} htmlFor={id}>
      <span className={s.fieldLabel}>{label}</span>
      <input
        id={id}
        name={name ?? id}
        className={s.input}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </label>
  );
}

function Select({
  id,
  label,
  defaultValue,
  placeholder,
  children,
}: {
  id: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={s.field} htmlFor={id}>
      <span className={s.fieldLabel}>{label}</span>
      <div className={s.selectWrap}>
        <select
          id={id}
          name={id}
          className={s.select}
          defaultValue={defaultValue ?? ""}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {children}
        </select>
        <span className={`material-symbols-outlined ${s.selectChevron}`} aria-hidden="true">
          expand_more
        </span>
      </div>
    </label>
  );
}

// The shared form body: social buttons, divider, fields, submit, switch link.
function AuthForm({
  mode,
  layout,
  switchHref,
  onSwitch,
  onSubmit,
  onGoogleSignIn,
  errorMessage,
  busy,
  signupRestrictionMessage,
}: {
  mode: AuthMode;
  layout: AuthLayout;
  switchHref: string;
  onSwitch?: () => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn?: () => void;
  errorMessage?: string | null;
  busy?: boolean;
  signupRestrictionMessage?: string | null;
}) {
  const c = COPY[mode];
  const [showEmail, setShowEmail] = useState(layout !== "social");
  const [agreed, setAgreed] = useState(false);
  const stacked = layout === "social";
  const isSignup = mode === "signup";

  const social = (
    <div className={stacked ? s.socialStack : s.socialRow}>
      <button
        type="button"
        className={s.social}
        onClick={onGoogleSignIn}
        disabled={busy}
      >
        <GoogleIcon />
        <span>{stacked ? "Continue with Google" : "Google"}</span>
      </button>
      <button type="button" className={s.social} disabled={busy}>
        <AppleIcon />
        <span>{stacked ? "Continue with Apple" : "Apple"}</span>
      </button>
    </div>
  );

  const emailBlock = (
    <>
      {mode === "signup" && (
        <div className={s.row2}>
          <Field
            id="firstName"
            label="First name"
            placeholder="Jane"
            autoComplete="given-name"
          />
          <Field
            id="lastName"
            label="Last name"
            placeholder="Doe"
            autoComplete="family-name"
          />
        </div>
      )}
      <Field
        id="email"
        label="Email address"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
      />
      {isSignup ? (
        <div className={s.row2}>
          <Field
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <Field
            id="confirmPassword"
            label="Re-enter password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>
      ) : (
        <Field
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      )}
      {isSignup && (
        <>
          <div className={s.row2}>
            <Field
              id="dob"
              label="Date of birth"
              type="date"
              autoComplete="bday"
            />
            <Select
              id="source"
              label="How did you hear about us?"
              placeholder="Select an option"
            >
              {SOURCE_PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
          <label className={s.agree} htmlFor="agree">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              className={s.agreeBox}
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className={s.agreeMark} aria-hidden="true">
              <span className="material-symbols-outlined">check</span>
            </span>
            <span className={s.agreeText}>
              I agree to Quest&apos;s{" "}
              <Link href="/terms" className={s.agreeLink} target="_blank">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className={s.agreeLink} target="_blank">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </>
      )}
      <button
        type="submit"
        className={s.submit}
        disabled={busy || (isSignup && (!agreed || Boolean(signupRestrictionMessage)))}
      >
        {c.submit}
        <span className="material-symbols-outlined" aria-hidden="true">
          arrow_forward
        </span>
      </button>
      {isSignup && signupRestrictionMessage ? (
        <p className={s.warning} role="alert" aria-live="polite">
          {signupRestrictionMessage}
        </p>
      ) : null}
    </>
  );

  const switchEl = onSwitch ? (
    <button type="button" className={s.switchLink} onClick={onSwitch}>
      {c.switchCta}
    </button>
  ) : (
    <Link href={switchHref} className={s.switchLink}>
      {c.switchCta}
    </Link>
  );

  return (
    <form className={s.form} onSubmit={onSubmit ?? ((e) => e.preventDefault())}>
      {social}
      <Divider />
      {stacked && !showEmail ? (
        <button
          type="button"
          className={s.emailToggle}
          onClick={() => setShowEmail(true)}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            mail
          </span>
          Continue with email
        </button>
      ) : (
        emailBlock
      )}
      {errorMessage ? (
        <p className={s.error} role="alert" aria-live="polite">
          {errorMessage}
        </p>
      ) : null}
      <p className={s.switch}>
        {c.switchText} {switchEl}
      </p>
    </form>
  );
}

function Brandmark() {
  return (
    <Link href="/" className={s.brand} aria-label="Quest home">
      <img src="/images/logos/Logo.svg" alt="Quest" width={92} height={34} />
    </Link>
  );
}

export default function AuthScreen({
  mode,
  layout,
  switchHref: switchHrefProp,
  onSwitch,
}: {
  mode: AuthMode;
  layout: AuthLayout;
  switchHref?: string;
  onSwitch?: () => void;
}) {
  const c = COPY[mode];
  const router = useRouter();
  const {
    completeSignupProfile,
    deleteCurrentUser,
    getCurrentUser,
    refreshVerificationStatus,
    sendVerificationEmail,
    signIn,
    signInWithGoogle,
    signOut,
    signUp,
  } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [signupRestrictionMessage, setSignupRestrictionMessage] = useState<string | null>(null);
  const [verificationEmail, setVerificationEmail] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
  const other: AuthMode = mode === "login" ? "signup" : "login";
  // default switch link stays within the prototype set; real /login + /signup
  // routes pass an explicit switchHref to point at each other.
  const switchHref = switchHrefProp ?? `/prototype/auth/${other}-${layout}`;

  function mapLoginError(error: unknown) {
    if (!error || typeof error !== "object" || !("code" in error)) {
      return "Could not log in right now. Please try again.";
    }

    const code = String((error as { code?: unknown }).code ?? "");
    if (
      code === "auth/invalid-credential" ||
      code === "auth/user-not-found" ||
      code === "auth/wrong-password"
    ) {
      return "Incorrect email or password.";
    }
    if (code === "auth/too-many-requests") {
      return "Too many attempts. Please try again in a bit.";
    }
    if (code === "auth/popup-closed-by-user") {
      return "Google sign-in was cancelled.";
    }

    return "Could not log in right now. Please try again.";
  }

  function mapSignupError(error: unknown) {
    if (!error || typeof error !== "object" || !("code" in error)) {
      return "Could not create your account right now. Please try again.";
    }

    const code = String((error as { code?: unknown }).code ?? "");
    if (code === "auth/email-already-in-use") {
      return "This email is already registered. Please log in instead.";
    }
    if (code === "auth/weak-password") {
      return "Password must be at least 8 characters.";
    }
    if (code === "auth/network-request-failed") {
      return "Network error. Please check your connection and try again.";
    }
    if (code === "auth/too-many-requests") {
      return "Too many attempts. Please try again in a bit.";
    }

    return "Could not create your account right now. Please try again.";
  }

  async function detectCountry(): Promise<CountryDetectionResponse | null> {
    try {
      const response = await fetch("/api/geo/country", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        return null;
      }

      return (await response.json()) as CountryDetectionResponse;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    if (mode !== "signup") {
      return;
    }

    let cancelled = false;

    const initCountry = async () => {
      const detection = await detectCountry();
      if (cancelled) {
        return;
      }

      if (!detection || !detection.detected) {
        setSignupRestrictionMessage(
          "We could not verify your country yet. Please try again on a stable connection."
        );
        return;
      }

      setSignupRestrictionMessage(
        detection.supported
          ? null
          : detection.message ?? "Quest signup is not available in your country yet."
      );
    };

    void initCountry();

    return () => {
      cancelled = true;
    };
  }, [mode]);

  useEffect(() => {
    if (!verificationEmail || emailVerified) {
      return;
    }

    let active = true;
    const timer = window.setInterval(async () => {
      const user = getCurrentUser();
      if (!user) {
        return;
      }

      try {
        const verified = await refreshVerificationStatus(user);
        if (!active) {
          return;
        }

        if (verified) {
          setEmailVerified(true);
          setVerificationMessage(null);
        }
      } catch {
        // Ignore periodic refresh failures and let user retry manually.
      }
    }, 10000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [emailVerified, getCurrentUser, refreshVerificationStatus, verificationEmail]);

  async function handleVerifyNow() {
    const user = getCurrentUser();
    if (!user) {
      setVerificationMessage("Your session has expired. Please sign up again.");
      return;
    }

    try {
      setBusy(true);
      const verified = await refreshVerificationStatus(user);
      setEmailVerified(verified);
      setVerificationMessage(verified ? null : "Email not verified yet. Check your inbox and try again.");
      if (verified) {
        router.push("/browse-quest/list");
      }
    } catch {
      setVerificationMessage("We could not verify your email right now. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function handleResendVerification() {
    const user = getCurrentUser();
    if (!user) {
      setVerificationMessage("Your session has expired. Please sign up again.");
      return;
    }

    try {
      setBusy(true);
      await sendVerificationEmail(user);
      setVerificationMessage("Verification email sent again.");
    } catch {
      setVerificationMessage("Unable to resend verification email right now.");
    } finally {
      setBusy(false);
    }
  }

  async function handleUseDifferentEmail() {
    try {
      setBusy(true);
      await deleteCurrentUser();
    } catch {
      // Best effort cleanup. We still sign out and reset the local flow.
    } finally {
      await signOut().catch(() => undefined);
      setVerificationEmail(null);
      setEmailVerified(false);
      setVerificationMessage(null);
      setBusy(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (mode === "login") {
      if (!email || !password) {
        setErrorMessage("Please enter both email and password.");
        return;
      }

      try {
        setBusy(true);
        await signIn(email, password);

        router.push("/browse-quest/list");
      } catch (error) {
        setErrorMessage(mapLoginError(error));
      } finally {
        setBusy(false);
      }

      return;
    }

    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const dateOfBirth = String(formData.get("dob") ?? "").trim();
    const sourcePlatform = String(formData.get("source") ?? "").trim();

    if (!firstName || !lastName || !email || !password) {
      setErrorMessage("Please fill in your name, email, and password.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!dateOfBirth) {
      setErrorMessage("Please enter your date of birth.");
      return;
    }

    const detection = await detectCountry();
    if (!detection || !detection.detected) {
      setErrorMessage(
        "We could not verify your country yet. Please try again on a stable connection."
      );
      return;
    }

    if (!detection.supported) {
      setErrorMessage(
        detection.message ?? "Quest signup is not available in your country yet."
      );
      return;
    }

    setSignupRestrictionMessage(null);

    try {
      setBusy(true);
      const credential = await signUp(email, password);
      await completeSignupProfile(credential.user, {
        email,
        firstName,
        lastName,
        countryCode: detection.countryCode,
        dateOfBirth,
        sourcePlatform: sourcePlatform || undefined,
      });
      await sendVerificationEmail(credential.user);

      setVerificationEmail(email);
      setEmailVerified(credential.user.emailVerified);
      setVerificationMessage(
        "We sent a verification link to your email."
      );
    } catch (error) {
      setErrorMessage(mapSignupError(error));
    } finally {
      setBusy(false);
    }
  }

  const verificationStep = verificationEmail ? (
    <section className={s.verify}>
      <h2 className={s.verifyTitle}>Check your email for a verification link</h2>
      <p className={s.verifyBody}>
        A verification link has been sent to <strong>{verificationEmail}</strong>.
      </p>
      <p className={s.verifyBody}>Verify your email first, then continue.</p>
      <div className={s.verifyActions}>
        <button
          type="button"
          className={s.social}
          onClick={() => window.open("mailto:", "_self")}
          disabled={busy}
        >
          Open Email
        </button>
        <button
          type="button"
          className={s.social}
          onClick={handleResendVerification}
          disabled={busy}
        >
          Resend Email
        </button>
      </div>
      <button
        type="button"
        className={s.submit}
        disabled={busy || !emailVerified}
        onClick={() => router.push("/browse-quest/list")}
      >
        Continue
      </button>
      <button
        type="button"
        className={s.verifyCheck}
        onClick={handleVerifyNow}
        disabled={busy}
      >
        I have verified my email
      </button>
      {!emailVerified ? (
        <button
          type="button"
          className={s.verifyChange}
          onClick={handleUseDifferentEmail}
          disabled={busy}
        >
          Enter a different email address
        </button>
      ) : null}
      {verificationMessage ? (
        <p className={s.warning} role="status" aria-live="polite">
          {verificationMessage}
        </p>
      ) : null}
    </section>
  ) : null;

  async function handleGoogleSignIn() {
    if (mode !== "login") {
      return;
    }

    setErrorMessage(null);

    try {
      setBusy(true);
      await signInWithGoogle();
      router.push("/browse-quest/list");
    } catch (error) {
      setErrorMessage(mapLoginError(error));
    } finally {
      setBusy(false);
    }
  }

  // ── Split: coral brand panel + white form card ──
  if (layout === "split") {
    return (
      <main className={`${s.page} ${s.pageSplit}`}>
        <aside className={s.brandPanel}>
          <div className={s.brandPanelInner}>
            <Brandmark />
            <h2 className={s.brandHeadline}>
              The work AI can’t do,
              <br />
              done by real people.
            </h2>
            <ul className={s.benefits}>
              {SPLIT_BENEFITS.map((b) => (
                <li key={b.t} className={s.benefit}>
                  <span className={s.benefitIcon} aria-hidden="true">
                    <span className="material-symbols-outlined">{b.icon}</span>
                  </span>
                  <span>
                    <span className={s.benefitTitle}>{b.t}</span>
                    <span className={s.benefitBody}>{b.b}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className={s.brandFoot}>
              Trusted by teams at Meta, Google, Gojek &amp; Antler.
            </p>
          </div>
        </aside>

        <section className={s.formPanel}>
          <div className={s.card}>
            <h1 className={s.title}>{c.title}</h1>
            <p className={s.sub}>{c.sub}</p>
            {verificationStep ?? (
              <AuthForm
                mode={mode}
                layout={layout}
                switchHref={switchHref}
                onSwitch={onSwitch}
                onSubmit={handleSubmit}
                onGoogleSignIn={handleGoogleSignIn}
                errorMessage={errorMessage}
                busy={busy}
                signupRestrictionMessage={signupRestrictionMessage}
              />
            )}
          </div>
        </section>
      </main>
    );
  }

  // ── Centered card & Social-first: single centered column on a soft field ──
  const isSocial = layout === "social";
  return (
    <main className={`${s.page} ${isSocial ? s.pageSocial : s.pageCentered}`}>
      <div className={s.field0} aria-hidden="true" />
      <section
        className={`${s.card} ${isSocial ? s.cardSocial : s.cardCentered}`}
      >
        <Brandmark />
        <h1 className={s.title}>{c.title}</h1>
        <p className={s.sub}>{c.sub}</p>
        {verificationStep ?? (
          <AuthForm
            mode={mode}
            layout={layout}
            switchHref={switchHref}
            onSwitch={onSwitch}
            onSubmit={handleSubmit}
            onGoogleSignIn={handleGoogleSignIn}
            errorMessage={errorMessage}
            busy={busy}
            signupRestrictionMessage={signupRestrictionMessage}
          />
        )}
      </section>
    </main>
  );
}
