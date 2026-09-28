import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Logo } from "./Logo";

export function Cabecalho() {
  return (
    <header className="sticky top-0 z-40 border-b border-areia bg-white/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Logo />
          </Link>
          <div className="hidden gap-7 text-sm font-medium text-stone-600 md:flex">
            <Link href="/" className="hover:text-pinho">Comprar</Link>
            <Link href="/" className="hover:text-pinho">Alugar</Link>
            <Link href="/" className="hover:text-pinho">Anunciar</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/corretor"
            className="flex items-center gap-1.5 rounded-full bg-pinho-claro px-4 py-2 text-sm font-medium text-pinho hover:bg-pinho hover:text-white"
          >
            <Sparkles className="h-4 w-4" /> Corretor IA
          </Link>
          <Link href="/conta" className="flex items-center gap-2 rounded-full border border-areia py-1 pl-1 pr-3 hover:border-pinho">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracota text-sm font-semibold text-white">
              AS
            </span>
            <span className="text-sm font-medium">Ana</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
