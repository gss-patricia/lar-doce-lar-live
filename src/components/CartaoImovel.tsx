"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bath, BedDouble, Car, Heart, Ruler } from "lucide-react";
import { formatarPreco } from "@/lib/dados";

// Só isto é usado pela tela.
export type ImovelNoCartao = {
  id: string;
  tipo: string;
  titulo: string;
  bairro: string;
  cidade: string;
  preco: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  area: number;
  imagem: string;
  selo?: string;
};

export function CartaoImovel({ imovel }: { imovel: ImovelNoCartao }) {
  const [favorito, setFavorito] = useState(false);

  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-areia transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imovel.imagem}
          alt={imovel.titulo}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-pinho-escuro">{imovel.tipo}</span>
          {imovel.selo && (
            <span className="rounded-full bg-terracota px-3 py-1 text-xs font-semibold text-white">{imovel.selo}</span>
          )}
        </div>
        <button
          onClick={() => setFavorito(!favorito)}
          aria-label="Favoritar"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow transition hover:scale-110"
        >
          <Heart className={`h-5 w-5 ${favorito ? "fill-terracota text-terracota" : "text-stone-600"}`} />
        </button>
      </div>

      <Link href={`/imoveis/${imovel.id}`} className="block p-5">
        <p className="font-display text-2xl font-semibold text-pinho-escuro">{formatarPreco(imovel.preco)}</p>
        <h2 className="mt-1 font-medium">{imovel.titulo}</h2>
        <p className="text-sm text-stone-500">
          {imovel.bairro} · {imovel.cidade}
        </p>
        <div className="mt-4 flex gap-4 border-t border-areia pt-4 text-sm text-stone-600">
          <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" />{imovel.quartos}</span>
          <span className="flex items-center gap-1.5"><Bath className="h-4 w-4" />{imovel.banheiros}</span>
          <span className="flex items-center gap-1.5"><Car className="h-4 w-4" />{imovel.vagas}</span>
          <span className="flex items-center gap-1.5"><Ruler className="h-4 w-4" />{imovel.area} m²</span>
        </div>
      </Link>
    </article>
  );
}
