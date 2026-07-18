"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  postId?: string;
  commentId?: string;
  targetLocale: "FR" | "EN";
  originalText: string;
};

// Pulsante "Traduire / Translate": azione esplicita dell'utente.
// Il contenuto resta salvato in lingua originale nel DB — questo componente
// mostra solo, on-demand, una traduzione a schermo (con cache lato server).
export function TranslateButton({ postId, commentId, targetLocale, originalText }: Props) {
  const t = useTranslations("forum");
  const [translated, setTranslated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (translated) {
      setTranslated(null); // toggle: torna al testo originale
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, commentId, targetLocale }),
      });
      const data = await res.json();
      setTranslated(data.text ?? null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-0">
      <p className="break-words">{translated ?? originalText}</p>
      <button
        type="button"
        onClick={handleTranslate}
        disabled={loading}
        className="mt-2 flex min-h-[44px] items-center text-sm font-medium text-forest underline-offset-4 hover:underline disabled:opacity-60"
      >
        {loading ? "..." : translated ? t("originalText") : t("translate")}
      </button>
    </div>
  );
}
