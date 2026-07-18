"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export function VerificationActions({ userId }: { userId: string }) {
  const t = useTranslations("admin");
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleAction(action: "approve" | "reject") {
    setPending(true);
    await fetch("/api/admin/verify-pharmacist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action }),
    });
    setPending(false);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => handleAction("approve")}
        className="min-h-[44px] min-w-[44px] rounded-full bg-forest px-5 py-2 text-sm font-medium text-paper transition hover:bg-forest-light disabled:opacity-60"
      >
        {t("approve")}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => handleAction("reject")}
        className="min-h-[44px] min-w-[44px] rounded-full border border-forest/30 px-5 py-2 text-sm font-medium text-forest transition hover:bg-forest/5 disabled:opacity-60"
      >
        {t("reject")}
      </button>
    </div>
  );
}
