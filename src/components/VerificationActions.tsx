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
    <>
      <button disabled={pending} onClick={() => handleAction("approve")}>
        {t("approve")}
      </button>
      <button disabled={pending} onClick={() => handleAction("reject")}>
        {t("reject")}
      </button>
    </>
  );
}
