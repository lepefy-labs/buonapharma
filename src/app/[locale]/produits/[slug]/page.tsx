import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) notFound();

  const locale = await getLocale();
  const isFr = locale === "fr";
  const description = isFr ? product.descriptionFr : product.descriptionEn;
  const categoryLabel = product.category === "health"
    ? (isFr ? "Ligne Santé" : "Health Line")
    : (isFr ? "Cosmétiques" : "Cosmetics");

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="border-b border-forest/10 bg-paper py-8">
          <div className="bp-shell">
            <nav aria-label={isFr ? "Fil d’Ariane" : "Breadcrumb"} className="flex flex-wrap items-center gap-2 text-xs text-ink/55">
              <Link href="/produits" className="hover:text-forest hover:underline">{isFr ? "Produits" : "Products"}</Link>
              <span aria-hidden="true">/</span>
              <span>{categoryLabel}</span>
              <span aria-hidden="true">/</span>
              <span className="text-forest">{product.name}</span>
            </nav>
          </div>
        </section>

        <section className="bg-white py-14 md:py-20">
          <div className="bp-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div className="bp-grid-texture flex aspect-square max-w-xl items-center justify-center rounded-[2rem] border border-forest/10 bg-paper-warm p-8">
              <div className="flex aspect-[4/5] w-2/3 max-w-[280px] flex-col justify-between rounded-2xl bg-forest p-6 text-paper shadow-2xl shadow-forest/20">
                <div>
                  <p className="font-display text-2xl">Buona<span className="text-gold">Pharma</span></p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper/60">{categoryLabel}</p>
                </div>
                <div>
                  <div className="mb-4 h-px bg-paper/15" />
                  <p className="font-display text-2xl leading-tight">{product.name}</p>
                </div>
              </div>
            </div>

            <div>
              <span className="bp-eyebrow">{categoryLabel}</span>
              <h1 className="bp-title mt-3 text-4xl md:text-5xl">{product.name}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">{description}</p>

              <div className="mt-8 rounded-2xl border border-forest/10 bg-paper p-5">
                <p className="font-mono text-[10px] uppercase tracking-[.18em] text-gold">{isFr ? "Information produit" : "Product information"}</p>
                <p className="mt-3 text-sm leading-6 text-ink/70">
                  {isFr
                    ? "Cette page présente les informations disponibles dans le catalogue BuonaPharma. Pour l’utilisation, la posologie ou toute question liée à votre situation de santé, demandez conseil à un professionnel de santé."
                    : "This page presents the information available in the BuonaPharma catalogue. For use, dosage or any question related to your health situation, ask a healthcare professional for advice."}
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/forum/patients/new" className="bp-button-primary">
                  {isFr ? "Poser une question" : "Ask a question"} →
                </Link>
                <Link href="/produits" className="bp-button-secondary">
                  {isFr ? "Retour au catalogue" : "Back to catalogue"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-paper-warm py-14 md:py-16">
          <div className="bp-shell grid gap-5 md:grid-cols-3">
            {[
              [isFr ? "Information claire" : "Clear information", isFr ? "Une présentation concise pour identifier rapidement la gamme et le produit." : "A concise presentation to quickly identify the range and product."],
              [isFr ? "Conseil professionnel" : "Professional advice", isFr ? "Les informations en ligne ne remplacent pas le conseil d’un professionnel de santé." : "Online information does not replace advice from a healthcare professional."],
              [isFr ? "Échange FR / EN" : "FR / EN discussion", isFr ? "Le forum BuonaPharma permet de poser des questions dans les deux langues." : "The BuonaPharma forum lets you ask questions in both languages."],
            ].map(([title, text]) => (
              <div key={title} className="bp-card p-6">
                <h2 className="font-display text-xl font-medium text-forest">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/65">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
