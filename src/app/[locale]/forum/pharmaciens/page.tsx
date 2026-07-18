import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

// Spazio riservato: accessibile SOLO a utenti con ruolo PHARMACIST_VERIFIED o ADMIN.
// Il controllo è lato server (non solo UI) per evitare che un PATIENT o
// PHARMACIST_PENDING acceda ai contenuti semplicemente conoscendo l'URL.
export default async function PharmaciensSpace() {
  const session = await auth();
  const role = (session?.user as any)?.role;

  if (!session || (role !== "PHARMACIST_VERIFIED" && role !== "ADMIN")) {
    redirect("/auth/sign-in?callbackUrl=/forum/pharmaciens");
  }

  const t = await getTranslations("forum");
  const d = await getTranslations();

  const posts = await prisma.post.findMany({
    where: { space: "PHARMACIENS" },
    include: { author: true, category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <main id="main-content">
        <section className="bg-paper px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Forum
            </span>
            <h1 className="mt-3 font-display text-3xl font-medium text-forest md:text-4xl">
              {t("spacePharmacists")}
            </h1>
            <p className="mt-4 text-lg text-ink/80">{t("spacePharmacistsDesc")}</p>
          </div>
        </section>

        <section className="bg-paper-warm px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <ul className="flex flex-col gap-4">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="rounded-lg border border-forest/10 bg-white p-6 transition hover:shadow-sm"
                >
                  <strong className="font-display text-base font-medium text-forest">
                    {post.title}
                  </strong>{" "}
                  <span className="text-sm text-ink/60">— {post.author.name}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-lg bg-paper p-4">
              <p className="text-xs text-ink/60">{d("disclaimer")}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
