"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link, useRouter } from "@/i18n/navigation";

type FormRole = "PATIENT" | "PHARMACIST";

const inputClasses =
  "w-full rounded-md border border-forest/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest";

export default function SignUpPage() {
  const t = useTranslations("auth");
  const router = useRouter();

  const [role, setRole] = useState<FormRole>("PATIENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError(t("passwordTooShort"));
      return;
    }
    if (password !== confirmPassword) {
      setError(t("passwordsDontMatch"));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          licenseNumber: role === "PHARMACIST" ? licenseNumber : undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? t("genericError"));
        setSubmitting(false);
        return;
      }

      router.push(`/auth/sign-in?signup=success`);
    } catch {
      setError(t("genericError"));
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-paper px-6 py-16 md:py-24">
          <div className="mx-auto max-w-md">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              {t("signUp")}
            </span>
            <h1 className="mt-3 font-display text-3xl font-medium text-forest md:text-4xl">
              {t("signUpTitle")}
            </h1>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-4 rounded-lg border border-forest/10 bg-white p-6"
            >
              <div className="flex gap-4 rounded-md border border-forest/15 p-3 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    checked={role === "PATIENT"}
                    onChange={() => setRole("PATIENT")}
                  />
                  {t("iAmPatient")}
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    checked={role === "PHARMACIST"}
                    onChange={() => setRole("PHARMACIST")}
                  />
                  {t("iAmPharmacist")}
                </label>
              </div>

              <input
                type="text"
                placeholder={t("name")}
                className={inputClasses}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
                minLength={8}
              />
              <input
                type="password"
                placeholder={t("confirmPassword")}
                className={inputClasses}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />

              {role === "PHARMACIST" && (
                <input
                  type="text"
                  placeholder={t("licenseNumber")}
                  className={inputClasses}
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  required
                />
              )}

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="self-start rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition hover:bg-forest-light disabled:opacity-60"
              >
                {t("signUpSubmit")}
              </button>

              <p className="text-sm text-ink/70">
                {t("alreadyHaveAccount")}{" "}
                <Link href="/auth/sign-in" className="text-forest underline hover:text-gold">
                  {t("signIn")}
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
