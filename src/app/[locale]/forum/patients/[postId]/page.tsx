import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ReplyForm } from "@/components/forum/ReplyForm";
import { DeleteButton } from "@/components/forum/DeleteButton";
import { TranslateButton } from "@/components/TranslateButton";

export const dynamic = "force-dynamic";

export default async function PatientPostDetail({
  params: { postId, locale },
}: {
  params: { postId: string; locale: string };
}) {
  const session = await auth();
  const role = (session?.user as any)?.role;
  const t = await getTranslations("forum");
  const d = await getTranslations();
  const targetLocale = locale === "fr" ? "EN" : "FR";

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      comments: { include: { author: true }, orderBy: { createdAt: "asc" } },
    },
  });

  if (!post || post.space !== "PATIENTS") {
    notFound();
  }

  const isAdmin = role === "ADMIN";

  return (
    <main id="main-content">
      <section className="bg-paper px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Link href="/forum/patients" className="text-sm text-forest underline-offset-4 hover:underline">
            {t("backToList")}
          </Link>

          <div className="mt-3 flex items-start justify-between gap-4">
            <h1 className="font-display text-3xl font-medium text-forest md:text-4xl">
              {post.title}
            </h1>
            {isAdmin && (
              <DeleteButton type="post" id={post.id} redirectAfter="/forum/patients" />
            )}
          </div>

          <p className="mt-2 text-sm text-ink/60">
            {t("postedBy")} {post.author.name} ·{" "}
            <span className="font-mono text-xs uppercase tracking-widest text-gold">
              {post.isAnswered ? t("answered") : t("pending")}
            </span>
          </p>
          <div className="mt-6">
            <TranslateButton
              postId={post.id}
              targetLocale={targetLocale as "FR" | "EN"}
              originalText={post.body}
            />
          </div>
        </div>
      </section>

      <section className="bg-paper-warm px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-xl font-medium text-forest">{t("commentsTitle")}</h2>

          <ul className="mt-6 flex flex-col gap-4">
            {post.comments.length === 0 && (
              <p className="text-sm text-ink/60">{t("noComments")}</p>
            )}
            {post.comments.map((comment) => (
              <li key={comment.id} className="rounded-lg border border-forest/10 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <TranslateButton
                    commentId={comment.id}
                    targetLocale={targetLocale as "FR" | "EN"}
                    originalText={comment.body}
                  />
                  {isAdmin && <DeleteButton type="comment" id={comment.id} />}
                </div>
                <p className="mt-2 text-xs text-ink/60">
                  — {comment.author.name}
                  {comment.isFromPharmacist && (
                    <span className="ml-2 rounded-full bg-forest/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-forest">
                      {t("verifiedBadge")}
                    </span>
                  )}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {session ? (
              <ReplyForm postId={post.id} />
            ) : (
              <Link
                href={`/auth/sign-in?callbackUrl=/forum/patients/${post.id}`}
                className="inline-block rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition hover:bg-forest-light"
              >
                {t("signInToReply")}
              </Link>
            )}
          </div>

          <div className="mt-8 rounded-lg bg-paper p-4">
            <p className="text-xs text-ink/60">{d("disclaimer")}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
