import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const Arrow = () => <span aria-hidden="true">→</span>;

export default async function HomePage() {
  const nav = await getTranslations("nav");
  const t = await getTranslations("home");
  const tp = await getTranslations("products");
  const tf = await getTranslations("forum");
  const locale = await getLocale();
  const isFr = locale === "fr";

  const latestPosts = await prisma.post
    .findMany({
      where: { space: "PATIENTS" },
      take: 3,
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
        _count: { select: { comments: true } },
      },
    })
    .catch(() => []);

  const trustItems = [
    { icon: "⌁", label: t("trust_lab") },
    { icon: "◇", label: t("trust_gmp") },
    { icon: "✓", label: isFr ? "Professionnels vérifiés" : "Verified professionals" },
    { icon: "◎", label: isFr ? "Information en FR / EN" : "Information in FR / EN" },
  ];

  const audiences = [
    {
      eyebrow: isFr ? "Santé & Produits" : "Health & Products",
      title: isFr ? "Trouver la solution adaptée" : "Find the right solution",
      text: t("hero_subtitle"),
      href: "/produits",
      cta: isFr ? "Trouver un produit" : "Find a product",
      icon: "✚",
    },
    {
      eyebrow: isFr ? "Patients" : "Patients",
      title: isFr ? "Une question de santé ?" : "A health question?",
      text: tf("spacePatientsDesc"),
      href: "/forum/patients/new",
      cta: isFr ? "Poser une question" : "Ask a question",
      icon: "◌",
    },
    {
      eyebrow: isFr ? "Professionnels de santé" : "Healthcare professionals",
      title: tf("spacePharmacists"),
      text: tf("spacePharmacistsDesc"),
      href: "/forum/pharmaciens",
      cta: isFr ? "Accéder à l’espace" : "Access the space",
      icon: "✓",
    },
  ];

  const categoryCards = [
    { title: tp("pharma_title"), text: tp("pharma_text"), href: "/produits#medicaments", marker: "01" },
    { title: tp("health_title"), text: tp("health_text"), href: "/produits#ligne-sante", marker: "02" },
    { title: tp("cosmetics_title"), text: tp("cosmetics_text"), href: "/produits#cosmetiques", marker: "03" },
  ];

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden border-b border-forest/10 bg-paper">
          <div className="dot-texture pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
          <div className="bp-shell relative grid min-h-[620px] items-center gap-10 py-14 md:grid-cols-[1.05fr_.95fr] md:py-20 lg:py-24">
            <div className="max-w-2xl">
              <span className="bp-eyebrow">BuonaPharma · Yaoundé</span>
              <h1 className="bp-title mt-5 text-[clamp(3rem,6vw,5.5rem)]">
                {isFr ? (
                  <>La santé, formulée avec <span className="text-gold">exigence.</span></>
                ) : (
                  <>Health, formulated with <span className="text-gold">excellence.</span></>
                )}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-ink/75 md:text-lg">{t("hero_subtitle")}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/produits" className="bp-button-primary">{t("cta_products")} <Arrow /></Link>
                <Link href="/forum/patients/new" className="bp-button-secondary">
                  {isFr ? "Poser une question à un pharmacien" : "Ask a pharmacist a question"}
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]" aria-hidden="true">
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold/15 blur-2xl" />
              <div className="absolute -bottom-10 -left-8 h-52 w-52 rounded-full bg-forest/10 blur-2xl" />
              <div className="bp-grid-texture relative aspect-[4/4.4] overflow-hidden rounded-[2rem] border border-forest/10 bg-white/80 p-7 shadow-[0_30px_80px_rgba(16,59,58,.12)]">
                <div className="flex h-full flex-col justify-between rounded-[1.5rem] bg-gradient-to-br from-forest to-forest-light p-7 text-paper">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl">Buona<span className="text-gold">Pharma</span></span>
                    <span className="rounded-full border border-paper/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest">Santé</span>
                  </div>
                  <div>
                    <div className="mb-8 h-px w-full bg-paper/15" />
                    <p className="max-w-sm font-display text-3xl leading-tight">
                      {isFr ? "Science locale. Standards exigeants. Information accessible." : "Local science. High standards. Accessible information."}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {["Médicaments", "Santé", "Cosmétiques"].map((item, index) => (
                      <div key={item} className="rounded-xl border border-paper/15 bg-paper/5 p-3">
                        <span className="font-mono text-[10px] text-gold">0{index + 1}</span>
                        <p className="mt-1 text-xs">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-forest/10 bg-white">
          <div className="bp-shell grid grid-cols-2 gap-px py-5 md:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item.label} className="flex min-h-16 items-center gap-3 px-2 py-2 md:px-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-warm text-sm font-semibold text-forest">{item.icon}</span>
                <span className="text-xs font-medium leading-5 text-ink/75">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-paper px-0 py-16 md:py-20">
          <div className="bp-shell">
            <div className="max-w-2xl">
              <span className="bp-eyebrow">{isFr ? "Votre point d’entrée" : "Your starting point"}</span>
              <h2 className="bp-title mt-3 text-3xl md:text-4xl">
                {isFr ? "Un écosystème de santé pensé pour chacun" : "A health ecosystem designed for everyone"}
              </h2>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {audiences.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group rounded-2xl p-6 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    index === 2 ? "bg-forest text-paper shadow-xl shadow-forest/10" : "bp-card"
                  }`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg ${index === 2 ? "bg-paper/10 text-gold" : "bg-paper-warm text-forest"}`}>{item.icon}</div>
                  <span className={`mt-7 block font-mono text-[10px] uppercase tracking-[.18em] ${index === 2 ? "text-gold" : "text-gold"}`}>{item.eyebrow}</span>
                  <h3 className={`mt-2 font-display text-2xl font-medium ${index === 2 ? "text-paper" : "text-forest"}`}>{item.title}</h3>
                  <p className={`mt-3 line-clamp-3 text-sm leading-6 ${index === 2 ? "text-paper/70" : "text-ink/70"}`}>{item.text}</p>
                  <span className={`mt-6 inline-flex items-center gap-2 text-sm font-medium ${index === 2 ? "text-paper" : "text-forest"}`}>{item.cta} <Arrow /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="bp-shell">
            <div className="flex items-end justify-between gap-5">
              <div>
                <span className="bp-eyebrow">{nav("products")}</span>
                <h2 className="bp-title mt-2 text-3xl md:text-4xl">{isFr ? "Nos catégories de produits" : "Our product categories"}</h2>
              </div>
              <Link href="/produits" className="hidden text-sm font-medium text-forest hover:underline sm:inline-flex">{isFr ? "Voir tout" : "View all"} <span className="ml-2">→</span></Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {categoryCards.map((category) => (
                <Link key={category.href} href={category.href} className="group overflow-hidden rounded-2xl border border-forest/10 bg-paper transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  <div className="bp-grid-texture flex h-36 items-end bg-paper-warm p-5">
                    <span className="font-display text-5xl text-forest/15">{category.marker}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-medium text-forest">{category.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/65">{category.text}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-forest">{isFr ? "Voir les produits" : "View products"} <Arrow /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-paper-warm py-16 md:py-20">
          <div className="bp-shell">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="bp-eyebrow">Community</span>
                <h2 className="bp-title mt-2 text-3xl md:text-4xl">{isFr ? "Questions récentes de la communauté" : "Recent community questions"}</h2>
              </div>
              <Link href="/forum/patients" className="hidden text-sm font-medium text-forest hover:underline sm:block">{t("forum_preview_cta")} →</Link>
            </div>

            {latestPosts.length > 0 ? (
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {latestPosts.map((post) => (
                  <Link key={post.id} href={`/forum/patients/${post.id}`} className="bp-card group flex min-h-56 flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-paper-warm px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-forest">{isFr ? "Question" : "Question"}</span>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${post.isAnswered ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
                        {post.isAnswered ? `✓ ${tf("answered")}` : tf("pending")}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-medium leading-snug text-forest group-hover:underline">{post.title}</h3>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-xs text-ink/55">
                      <span>{post.author?.name ?? (isFr ? "Membre" : "Member")}</span>
                      <span>{post._count.comments} {isFr ? "réponses" : "replies"}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bp-card mt-8 p-8 text-center">
                <p className="font-display text-xl font-medium text-forest">{t("forum_preview_empty_title")}</p>
                <Link href="/forum/patients/new" className="bp-button-primary mt-5">{t("forum_preview_empty_cta")} <Arrow /></Link>
              </div>
            )}
          </div>
        </section>

        <section className="bg-forest py-14 text-paper">
          <div className="bp-shell">
            <div className="text-center">
              <span className="font-mono text-[11px] uppercase tracking-[.18em] text-gold">{isFr ? "Notre engagement" : "Our commitment"}</span>
              <h2 className="mt-3 font-display text-3xl font-medium">{isFr ? "Votre confiance guide notre exigence" : "Your trust guides our standards"}</h2>
            </div>
            <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
              {[t("pillar1_title"), t("pillar2_title"), t("pillar3_title"), isFr ? "Éthique & transparence" : "Ethics & transparency"].map((item, index) => (
                <div key={item} className="bg-forest p-6 text-center">
                  <span className="font-mono text-xs text-gold">0{index + 1}</span>
                  <p className="mt-3 font-display text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
