import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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

  const posts = await prisma.post.findMany({
    where: { space: "PHARMACIENS" },
    include: { author: true, category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-display text-3xl font-medium text-forest md:text-4xl">
          {t("spacePharmacists")}
        </h1>
        <p className="mt-4 text-lg text-ink/80">{t("spacePharmacistsDesc")}</p>

        <ul className="mt-10 flex flex-col gap-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-lg border border-ink/10 bg-white p-5"
            >
              <strong className="font-display text-base font-medium text-forest">
                {post.title}
              </strong>{" "}
              <span className="text-sm text-ink/60">— {post.author.name}</span>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
