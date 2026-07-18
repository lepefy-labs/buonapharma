"use client";

import { useState, FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

type Category = { id: string; nameFr: string; nameEn: string; slug: string };
type Space = "PHARMACIENS" | "PATIENTS";

const inputClasses =
  "w-full rounded-md border border-forest/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest";

const RETRY_DISABLE_SECONDS = 10;
const SPACE_PATH: Record<Space, string> = {
  PHARMACIENS: "pharmaciens",
  PATIENTS: "patients",
};

export function NewPostForm({ space, categories }: { space: Space; categories: Category[] }) {
  const t = useTranslations("forum");
  const locale = useLocale();
  const router = useRouter();

  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          space,
          categoryId,
          title,
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

      const data = await res.json();
      router.push(`/forum/${SPACE_PATH[space]}/${data.id}`);
    } catch {
      setError(t("genericError"));
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border border-forest/10 bg-white p-6"
    >
      {categories.length > 0 && (
        <div className="flex flex-col gap-1">
          <label htmlFor="categoryId" className="text-xs font-medium text-ink/70">
            {t("category")}
          </label>
          <select
            id="categoryId"
            className={inputClasses}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {locale === "fr" ? cat.nameFr : cat.nameEn}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-xs font-medium text-ink/70">
          {t("postTitle")}
        </label>
        <input
          id="title"
          type="text"
          className={inputClasses}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          minLength={3}
          maxLength={150}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="body" className="text-xs font-medium text-ink/70">
          {t("postBody")}
        </label>
        <textarea
          id="body"
          rows={6}
          className={inputClasses}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          minLength={10}
          maxLength={5000}
          required
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting || cooldown}
        className="self-start rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition hover:bg-forest-light disabled:opacity-60"
      >
        {submitting ? t("publishing") : t("submitPost")}
      </button>
    </form>
  );
}
