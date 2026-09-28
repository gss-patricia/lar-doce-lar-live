import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lar Doce Lar — Imóveis para viver bem",
  description: "App de demonstração da live Segurança no Front-end",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Cabecalho />
        <main className="flex-1">{children}</main>
        <Rodape />
      </body>
    </html>
  );
}
