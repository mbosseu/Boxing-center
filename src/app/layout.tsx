import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIGHT EVENT V — Festival du Fight | Boxing Trophy",
  description:
    "Inscrivez-vous au Boxing Trophy du FIGHT EVENT V / Festival du Fight. Boxeurs loisirs, accédez au ring dans des conditions professionnelles. Inscription gratuite avec achat de 2 places minimum.",
  keywords: "fight event, boxing trophy, boxe loisir, festival du fight, combat, inscription boxe",
  openGraph: {
    title: "FIGHT EVENT V — Festival du Fight",
    description: "Inscrivez-vous au Boxing Trophy. Vivez l'expérience du ring.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
