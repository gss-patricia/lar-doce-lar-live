import Image from "next/image";
import { Home as Casa, MapPin, Search, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { CartaoImovel, type ImovelNoCartao } from "@/components/CartaoImovel";
import { Interruptor } from "@/components/Interruptor";
import { imoveis, type Imovel } from "@/lib/dados";
import { lerModo } from "@/lib/modo";

// 🔒 Seleciona só os campos que o cartão mostra.
function paraCartao(imovel: Imovel): ImovelNoCartao {
  return {
    id: imovel.id,
    tipo: imovel.tipo,
    titulo: imovel.titulo,
    bairro: imovel.bairro,
    cidade: imovel.cidade,
    preco: imovel.preco,
    quartos: imovel.quartos,
    banheiros: imovel.banheiros,
    vagas: imovel.vagas,
    area: imovel.area,
    imagem: imovel.imagem,
    selo: imovel.selo,
  };
}

export default async function Home() {
  const modo = await lerModo("janelas");

  return (
    <>
      <section className="relative">
        <div className="relative h-[560px] overflow-hidden">
          <Image src="/imoveis/hero.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-pinho-escuro/85 via-pinho-escuro/50 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
            <p className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-white/80">
              <Sparkles className="h-4 w-4" /> Mais de 12 mil imóveis verificados
            </p>
            <h1 className="max-w-2xl font-display text-5xl font-semibold leading-tight text-white md:text-6xl">
              Encontre o lar que combina com você
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/85">
              Casas, apartamentos e chalés selecionados, com visita agendada em poucos cliques.
            </p>
          </div>
        </div>

        <form className="relative mx-auto -mt-12 grid max-w-5xl gap-2 rounded-3xl bg-white p-3 shadow-2xl md:grid-cols-[1.4fr_1fr_1fr_auto]">
          <label className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-creme">
            <MapPin className="h-5 w-5 text-terracota" />
            <span className="flex-1">
              <span className="block text-xs font-semibold text-stone-500">Localização</span>
              <input placeholder="Cidade ou bairro" className="w-full bg-transparent outline-none" />
            </span>
          </label>
          <label className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-creme">
            <Casa className="h-5 w-5 text-terracota" />
            <span className="flex-1">
              <span className="block text-xs font-semibold text-stone-500">Tipo</span>
              <select className="w-full bg-transparent outline-none">
                <option>Todos</option>
                <option>Casa</option>
                <option>Apartamento</option>
                <option>Chalé</option>
              </select>
            </span>
          </label>
          <label className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-creme">
            <Wallet className="h-5 w-5 text-terracota" />
            <span className="flex-1">
              <span className="block text-xs font-semibold text-stone-500">Preço até</span>
              <select className="w-full bg-transparent outline-none">
                <option>Qualquer valor</option>
                <option>R$ 800 mil</option>
                <option>R$ 1,5 milhão</option>
                <option>R$ 3 milhões</option>
              </select>
            </span>
          </label>
          <button type="button" className="flex items-center justify-center gap-2 rounded-2xl bg-pinho px-8 py-4 font-semibold text-white hover:bg-pinho-escuro">
            <Search className="h-5 w-5" /> Buscar
          </button>
        </form>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-terracota">Destaques</p>
            <h2 className="mt-1 font-display text-4xl font-semibold text-pinho-escuro">Imóveis selecionados</h2>
          </div>
          <p className="hidden items-center gap-2 text-sm text-stone-500 md:flex">
            <ShieldCheck className="h-4 w-4 text-pinho" /> Todos com documentação verificada
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {imoveis.map((imovel) =>
            modo === "vulneravel" ? (
              // 🔓 Passa o objeto inteiro para um Client Component.
              // O Next serializa TODAS as props no HTML (payload RSC) — inclusive
              // precoMinimoAceito e o CPF do anunciante, que a tela nem mostra.
              <CartaoImovel key={imovel.id} imovel={imovel} />
            ) : (
              // 🔒 Passa só o que a tela usa.
              <CartaoImovel key={imovel.id} imovel={paraCartao(imovel)} />
            ),
          )}
        </div>
      </section>

      <Interruptor parada="janelas" />
    </>
  );
}
