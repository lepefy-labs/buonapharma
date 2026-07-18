"use client";

import { useState, FormEvent, Suspense } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link, useRouter } from "@/i18n/navigation";

const inputClasses =
  "w-full rounded-md border border-forest/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest";

function SignInForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const signupSuccess = searchParams.get("signup") === "success";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result || result.error) {
      setError(t("invalidCredentials"));
      setSubmitting(false);
      return;
    }

    const callbackUrl = searchParams.get("callbackUrl");
    router.push(callbackUrl || "/");
  }

  return (
    <section className="bg-paper px-6 py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
          {t("signIn")}
        </span>
        <h1 className="mt-3 font-display text-3xl font-medium text-forest md:text-4xl">
          {t("signInTitle")}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-4 rounded-lg border border-forest/10 bg-white p-6"
        >
          {signupSuccess && (
            <p className="text-sm text-forest">{t("signUpSuccess")}</p>
          )}

          <input
            type="email"
            placeholder={t("email")}
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t("password")}
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="self-start rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition hover:bg-forest-light disabled:opacity-60"
          >
            {t("signInSubmit")}
          </button>

          <p className="text-sm text-ink/70">
            {t("noAccountYet")}{" "}
            <Link href="/auth/sign-up" className="text-forest underline hover:text-gold">
              {t("signUp")}
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default function SignInPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
