import { Logo } from "./Logo";

export function Rodape() {
  return (
    <footer className="mt-24 bg-pinho-escuro text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo clara />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
            Conectamos pessoas aos lugares onde elas vão viver as melhores histórias.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold text-white">Imóveis</p>
          <ul className="space-y-2">
            <li>Comprar</li>
            <li>Alugar</li>
            <li>Lançamentos</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold text-white">Institucional</p>
          <ul className="space-y-2">
            <li>Sobre nós</li>
            <li>Trabalhe conosco</li>
            <li>Privacidade</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-stone-500">
        © 2026 Lar Doce Lar · App fictício de demonstração da live Segurança no Front-end
      </div>
    </footer>
  );
}
