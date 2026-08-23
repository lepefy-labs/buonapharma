import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const dynamic = "force-dynamic";

export default async function PharmaciensSpace() {
  const session = await auth();
  const role = (session?.user as any)?.role;

  if (!session || (role !== "PHARMACIST_VERIFIED" && role !== "ADMIN")) {
    redirect("/auth/sign-in?callbackUrl=/forum/pharmaciens");
  }

  const t = await getTranslations("forum");
  const d = await getTranslations();
  const locale = await getLocale();
  const isFr = locale === "fr";

  const posts = await prisma.post.findMany({
    where: { space: "PHARMACIENS" },
    include: { author: true, category: true, _count: { select: { comments: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main id="main-content">
      <section className="bg-forest py-12 text-paper md:py-16">
        <div className="bp-shell">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[.18em] text-gold">{t("spacePharmacists")}</span>
                <span className="rounded-full bg-paper/10 px-3 py-1 text-[11px] font-medium text-paper">✓ {t("verifiedBadge")}</span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl">
                {isFr ? "Un espace professionnel, clairement distinct" : "A clearly distinct professional space"}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-paper/70">{t("spacePharmacistsDesc")}</p>
            </div>
            <Link href="/forum/pharmaciens/new" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-forest transition hover:bg-[#d8aa4e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper">
              {t("newPost")} →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper-warm py-12 md:py-16">
        <div className="bp-shell grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            {posts.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {posts.map((post) => {
                  const categoryName = locale === "fr" ? post.category.nameFr : post.category.nameEn;
                  return (
                    <li key={post.id} className="bp-card p-5 md:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-full bg-paper-warm px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-forest">{categoryName}</span>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-800">✓ {t("verifiedBadge")}</span>
                      </div>
                      <Link href={`/forum/pharmaciens/${post.id}`} className="mt-4 block font-display text-2xl font-medium leading-snug text-forest hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                        {post.title}
                      </Link>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink/55">
                        <span>{post.author.name}</span>
                        <span>{post._count.comments} {isFr ? "réponses" : "replies"}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="bp-card p-8 text-center">
                <h2 className="font-display text-2xl font-medium text-forest">{isFr ? "Aucune discussion pour le moment" : "No discussions yet"}</h2>
                <p className="mt-2 text-sm text-ink/60">{isFr ? "Ouvrez le premier échange professionnel." : "Start the first professional discussion."}</p>
                <Link href="/forum/pharmaciens/new" className="bp-button-primary mt-5">{t("newPost")} →</Link>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-forest/10 bg-white p-6">
              <span className="bp-eyebrow">{isFr ? "Espace réservé" : "Restricted space"}</span>
              <h2 className="mt-3 font-display text-2xl font-medium text-forest">{isFr ? "Professionnels vérifiés" : "Verified professionals"}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/65">
                {isFr
                  ? "L’accès est contrôlé côté serveur et réservé aux pharmaciens vérifiés et aux administrateurs."
                  : "Access is enforced server-side and limited to verified pharmacists and administrators."}
              </p>
            </div>
            <div className="rounded-2xl border border-gold/20 bg-gold/10 p-5">
              <p className="text-xs leading-5 text-ink/65">{d("disclaimer")}</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
