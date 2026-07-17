import { useTranslations } from "next-intl";

// NOTE: il numero di telefono del vecchio sito (+39 059 472 1789, prefisso italiano)
// era quasi certamente un refuso del template mai sostituito. Da confermare con il cliente
// prima del lancio — per ora placeholder esplicito.
const CONTACT = {
  address: "Rond point Damas, BP 16588 Yaoundé, Cameroun",
  phone: "+237 XXX XXX XXX", // TODO: confermare numero reale con il cliente
  email: "info@buonapharma.com",
};

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("text")}</p>

      <section>
        <div>
          <h3>{t("address_title")}</h3>
          <p>{CONTACT.address}</p>
        </div>
        <div>
          <h3>{t("phone_title")}</h3>
          <p>{CONTACT.phone}</p>
        </div>
        <div>
          <h3>{t("email_title")}</h3>
          <p>{CONTACT.email}</p>
        </div>
      </section>

      <form>
        <input type="text" name="name" placeholder={t("form_name")} />
        <input type="email" name="email" placeholder={t("form_email")} />
        <input type="tel" name="phone" placeholder={t("form_phone")} />
        <textarea name="message" placeholder={t("form_message")} />
        <button type="submit">{t("form_submit")}</button>
      </form>
    </main>
  );
}
