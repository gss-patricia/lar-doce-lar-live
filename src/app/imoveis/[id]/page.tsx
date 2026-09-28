import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bath, BedDouble, CalendarDays, Car, Check, MapPin, Ruler, Sparkles } from "lucide-react";
import { buscarImovel, formatarPreco } from "@/lib/dados";

export default async function PaginaImovel({ params }: PageProps<"/imoveis/[id]">) {
  const { id } = await params;
  const imovel = buscarImovel(id);
  if (!imovel) notFound();

  const caracteristicas = [
    { icone: BedDouble, valor: imovel.quartos, rotulo: "quartos" },
    { icone: Bath, valor: imovel.banheiros, rotulo: "banheiros" },
    { icone: Car, valor: imovel.vagas, rotulo: "vagas" },
    { icone: Ruler, valor: `${imovel.area} m²`, rotulo: "área útil" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-pinho">
        <ArrowLeft className="h-4 w-4" /> Voltar para os imóveis
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="rounded-full bg-pinho-claro px-3 py-1 text-xs font-semibold text-pinho">{imovel.tipo}</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-pinho-escuro">{imovel.titulo}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-stone-500">
            <MapPin className="h-4 w-4" /> {imovel.bairro} · {imovel.cidade}
          </p>
        </div>
      </div>

      <div className="relative mt-6 aspect-[21/9] overflow-hidden rounded-3xl">
        <Image src={imovel.imagem} alt={imovel.titulo} fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {caracteristicas.map(({ icone: Icone, valor, rotulo }) => (
              <div key={rotulo} className="rounded-2xl bg-white p-4 ring-1 ring-areia">
                <Icone className="h-5 w-5 text-terracota" />
                <p className="mt-3 text-xl font-semibold">{valor}</p>
                <p className="text-sm text-stone-500">{rotulo}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 font-display text-2xl font-semibold text-pinho-escuro">Sobre o imóvel</h2>
          <p className="mt-3 text-lg leading-relaxed text-stone-700">{imovel.descricao}</p>

          <h2 className="mt-10 font-display text-2xl font-semibold text-pinho-escuro">Comodidades</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {imovel.comodidades.map((c) => (
              <li key={c} className="flex items-center gap-2 text-stone-700">
                <Check className="h-5 w-5 text-pinho" /> {c}
              </li>
            ))}
          </ul>

          {/* Parada 3 (Porta): avaliações dos visitantes entram aqui na próxima fatia */}
        </div>

        <aside className="h-fit rounded-3xl bg-white p-6 shadow-lg ring-1 ring-areia lg:sticky lg:top-24">
          <p className="text-sm text-stone-500">Valor de venda</p>
          <p className="font-display text-4xl font-semibold text-pinho-escuro">{formatarPreco(imovel.preco)}</p>
          <dl className="mt-5 space-y-2 border-t border-areia pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">Condomínio</dt>
              <dd className="font-medium">{imovel.condominio ? `${formatarPreco(imovel.condominio)}/mês` : "Isento"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">IPTU</dt>
              <dd className="font-medium">{formatarPreco(imovel.iptu)}/mês</dd>
            </div>
          </dl>
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-pinho py-4 font-semibold text-white hover:bg-pinho-escuro">
            <CalendarDays className="h-5 w-5" /> Agendar visita
          </button>
          <Link
            href="/corretor"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-pinho py-4 font-semibold text-pinho hover:bg-pinho-claro"
          >
            <Sparkles className="h-5 w-5" /> Perguntar ao Corretor IA
          </Link>
        </aside>
      </div>
    </div>
  );
}
