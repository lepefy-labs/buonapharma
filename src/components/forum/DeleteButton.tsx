"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export function DeleteButton({
  type,
  id,
  redirectAfter,
}: {
  type: "post" | "comment";
  id: string;
  redirectAfter?: string;
}) {
  const t = useTranslations("forum");
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!window.confirm(t("confirmDelete"))) return;

    setPending(true);
    const res = await fetch("/api/forum/moderate", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id }),
    });
    setPending(false);

    if (!res.ok) return;

    if (redirectAfter) {
      router.push(redirectAfter);
    } else {
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="text-xs font-medium text-red-600/70 underline-offset-4 hover:text-red-600 hover:underline disabled:opacity-50"
    >
      {type === "post" ? t("deletePost") : t("deleteComment")}
    </button>
  );
}
