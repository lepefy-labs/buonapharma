import { useTranslations } from "next-intl";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// NOTE: il numero di telefono del vecchio sito (+39 059 472 1789, prefisso italiano)
// era quasi certamente un refuso del template mai sostituito. Da confermare con il cliente
// prima del lancio — per ora placeholder esplicito.
const CONTACT = {
  address: "Rond point Damas, BP 16588 Yaoundé, Cameroun",
  phone: "+237 XXX XXX XXX", // TODO: confermare numero reale con il cliente
  email: "info@buonapharma.com",
};

const inputClasses =
  "w-full rounded-md border border-forest/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-paper px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Contact
            </span>
            <h1 className="mt-3 font-display text-3xl font-medium text-forest md:text-4xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-ink/80">{t("text")}</p>
          </div>
        </section>

        <section className="bg-paper-warm px-6 py-14">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="rounded-lg border border-forest/10 bg-white p-6 transition hover:shadow-sm">
                <h3 className="font-mono text-xs uppercase tracking-widest text-gold">
                  {t("address_title")}
                </h3>
                <p className="mt-2 text-sm text-ink/80">{CONTACT.address}</p>
              </div>
              <div className="rounded-lg border border-forest/10 bg-white p-6 transition hover:shadow-sm">
                <h3 className="font-mono text-xs uppercase tracking-widest text-gold">
                  {t("phone_title")}
                </h3>
                <p className="mt-2 text-sm text-ink/80">{CONTACT.phone}</p>
              </div>
              <div className="rounded-lg border border-forest/10 bg-white p-6 transition hover:shadow-sm">
                <h3 className="font-mono text-xs uppercase tracking-widest text-gold">
                  {t("email_title")}
                </h3>
                <p className="mt-2 text-sm text-ink/80">{CONTACT.email}</p>
              </div>
            </div>

            <form className="flex flex-col gap-4 rounded-lg border border-forest/10 bg-white p-6">
              <input type="text" name="name" placeholder={t("form_name")} className={inputClasses} />
              <input type="email" name="email" placeholder={t("form_email")} className={inputClasses} />
              <input type="tel" name="phone" placeholder={t("form_phone")} className={inputClasses} />
              <textarea
                name="message"
                placeholder={t("form_message")}
                rows={5}
                className={inputClasses}
              />
              <button
                type="submit"
                className="self-start rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition hover:bg-forest-light"
              >
                {t("form_submit")}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
