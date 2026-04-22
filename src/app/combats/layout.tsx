import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau des Combats — FIGHT EVENT V",
  description: "Consultez le tableau des combats du Boxing Trophy. Matchs confirmés et en attente.",
};

export default function CombatsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
