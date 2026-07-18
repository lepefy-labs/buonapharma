"use client";

import { useState, FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

const RETRY_DISABLE_SECONDS = 10;

export function ReplyForm({ postId }: { postId: string }) {
  const t = useTranslations("forum");
  const locale = useLocale();
  const router = useRouter();

  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/forum/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          body,
          locale: locale === "fr" ? "FR" : "EN",
        }),
      });

      if (res.status === 429) {
        setError(t("rateLimitError"));
        setSubmitting(false);
        setCooldown(true);
        setTimeout(() => setCooldown(false), RETRY_DISABLE_SECONDS * 1000);
        return;
      }

      if (!res.ok) {
        setError(t("genericError"));
        setSubmitting(false);
        return;
      }

      setBody("");
      setSubmitting(false);
      router.refresh();
    } catch {
      setError(t("genericError"));
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        rows={3}
        placeholder={t("replyPlaceholder")}
        className="w-full rounded-md border border-forest/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        minLength={5}
        maxLength={3000}
        required
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting || cooldown}
        className="self-start rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-forest-light disabled:opacity-60"
      >
        {t("reply")}
      </button>
    </form>
  );
}
