import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { TranslateButton } from "@/components/TranslateButton";
import { Link } from "@/i18n/navigation";

export const dynamic = "force-dynamic";

export default async function PatientsSpace({ params: { locale } }: { params: { locale: string } }) {
  const session = await auth();
  const t = await getTranslations("forum");
  const d = await getTranslations();
  const targetLocale = locale === "fr" ? "EN" : "FR";
  const isFr = locale === "fr";

  const posts = await prisma.post.findMany({
    where: { space: "PATIENTS" },
    include: {
      author: true,
      category: true,
      comments: { include: { author: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main id="main-content">
      <section className="border-b border-forest/10 bg-paper py-12 md:py-16">
        <div className="bp-shell">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="bp-eyebrow">{t("spacePatients")}</span>
              <h1 className="bp-title mt-3 text-4xl md:text-5xl">
                {isFr ? "Vos questions, des réponses plus lisibles" : "Your questions, clearer answers"}
              </h1>
              <p className="mt-4 text-base leading-7 text-ink/70 md:text-lg">{t("spacePatientsDesc")}</p>
            </div>
            <Link
              href={session ? "/forum/patients/new" : "/auth/sign-in?callbackUrl=/forum/patients/new"}
              className="bp-button-primary shrink-0"
            >
              {session ? t("newPost") : t("signInToPost")} →
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
                  const pharmacistReplies = post.comments.filter((comment) => comment.isFromPharmacist).length;
                  const categoryName = locale === "fr" ? post.category.nameFr : post.category.nameEn;

                  return (
                    <li key={post.id} className="bp-card p-5 md:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-full bg-paper-warm px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-forest">
                          {categoryName}
                        </span>
                        {post.isAnswered ? (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-800">✓ {t("answered")}</span>
                        ) : (
                          <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-800">{t("pending")}</span>
                        )}
                      </div>

                      <Link
                        href={`/forum/patients/${post.id}`}
                        className="mt-4 block font-display text-2xl font-medium leading-snug text-forest hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      >
                        {post.title}
                      </Link>

                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink/55">
                        <span>{post.author.name}</span>
                        <span>{post.comments.length} {isFr ? "réponses" : "replies"}</span>
                        {pharmacistReplies > 0 ? (
                          <span className="font-medium text-emerald-800">✓ {pharmacistReplies} {isFr ? "réponse pharmacien" : "pharmacist reply"}</span>
                        ) : null}
                      </div>

                      <div className="mt-5 border-t border-forest/10 pt-4">
                        <TranslateButton postId={post.id} targetLocale={targetLocale as "FR" | "EN"} originalText={post.body} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="bp-card p-8 text-center">
                <h2 className="font-display text-2xl font-medium text-forest">{isFr ? "Aucune question pour le moment" : "No questions yet"}</h2>
                <p className="mt-2 text-sm text-ink/60">{isFr ? "Vous pouvez ouvrir la première discussion." : "You can start the first discussion."}</p>
                <Link href={session ? "/forum/patients/new" : "/auth/sign-in?callbackUrl=/forum/patients/new"} className="bp-button-primary mt-5">{t("newPost")} →</Link>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-forest p-6 text-paper">
              <span className="font-mono text-[10px] uppercase tracking-[.18em] text-gold">{isFr ? "Repère de confiance" : "Trust marker"}</span>
              <h2 className="mt-3 font-display text-2xl font-medium">✓ {t("verifiedBadge")}</h2>
              <p className="mt-3 text-sm leading-6 text-paper/70">
                {isFr
                  ? "Les réponses professionnelles sont signalées lorsqu’elles proviennent d’un compte pharmacien vérifié."
                  : "Professional replies are clearly marked when they come from a verified pharmacist account."}
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
