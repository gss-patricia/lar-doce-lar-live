import { alternarModo } from "@/app/acoes";
import { lerModo, PARADAS, type Parada } from "@/lib/modo";

// Botão flutuante para a apresentadora trocar entre o código vulnerável e o corrigido.
export async function Interruptor({ parada }: { parada: Parada }) {
  const modo = await lerModo(parada);
  const seguro = modo === "seguro";

  return (
    <form action={alternarModo.bind(null, parada)} className="fixed bottom-6 right-6 z-50">
      <button
        type="submit"
        className="group flex items-center gap-3 rounded-2xl bg-stone-900/95 py-2.5 pl-3 pr-4 text-left text-white shadow-2xl ring-1 ring-white/10 backdrop-blur transition hover:bg-stone-800"
      >
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${
            seguro ? "bg-emerald-500/20" : "bg-rose-500/20"
          }`}
        >
          {seguro ? "🔒" : "🔓"}
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] font-medium uppercase tracking-widest text-stone-400">
            Vistoria · {PARADAS[parada]}
          </span>
          <span className={`block font-semibold ${seguro ? "text-emerald-400" : "text-rose-400"}`}>
            {seguro ? "Corrigido" : "Vulnerável"}
          </span>
        </span>
        <span
          className={`ml-2 flex h-6 w-11 items-center rounded-full p-0.5 transition ${
            seguro ? "justify-end bg-emerald-500" : "justify-start bg-rose-500"
          }`}
        >
          <span className="h-5 w-5 rounded-full bg-white shadow" />
        </span>
      </button>
    </form>
  );
}
