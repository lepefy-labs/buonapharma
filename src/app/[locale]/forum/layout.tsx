import { Footer } from "@/components/Footer";
import { ForumHeader } from "@/components/forum/ForumHeader";

export default function ForumLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ForumHeader />
      {children}
      <Footer />
    </>
  );
}
