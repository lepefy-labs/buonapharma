import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

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
    <main>
      <h1>{t("spacePharmacists")}</h1>
      <p>{t("spacePharmacistsDesc")}</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong> — {post.author.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
