import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { NewPostForm } from "@/components/forum/NewPostForm";
import { Link } from "@/i18n/navigation";

export const dynamic = "force-dynamic";

export default async function NewPatientPost() {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in?callbackUrl=/forum/patients/new");
  }

  const t = await getTranslations("forum");
  const categories = await prisma.category.findMany({ where: { space: "PATIENTS" } });

  return (
    <main id="main-content">
      <section className="bg-paper px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <Link href="/forum/patients" className="text-sm text-forest underline-offset-4 hover:underline">
            {t("backToList")}
          </Link>
          <h1 className="mt-3 font-display text-3xl font-medium text-forest md:text-4xl">
            {t("newPost")}
          </h1>

          <div className="mt-8">
            <NewPostForm space="PATIENTS" categories={categories} />
          </div>
        </div>
      </section>
    </main>
  );
}
