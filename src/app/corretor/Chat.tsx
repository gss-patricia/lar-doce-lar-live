"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizontal, Sparkles } from "lucide-react";
import { PROMPT_DO_CORRETOR, type Mensagem } from "@/lib/corretor";

// 🔓 PARADA 2 — CHAVE DEBAIXO DO TAPETE
// O navegador chama a IA direto, com a chave em NEXT_PUBLIC_*.
// No `next build`, o Next troca process.env.NEXT_PUBLIC_IA_API_KEY pelo valor real
// dentro do JavaScript enviado ao navegador. Qualquer visitante encontra a chave.
async function perguntarAoCorretor(mensagens: Mensagem[]): Promise<string> {
  const resposta = await fetch(process.env.NEXT_PUBLIC_IA_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_IA_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.NEXT_PUBLIC_IA_MODELO,
      messages: [{ role: "system", content: PROMPT_DO_CORRETOR }, ...mensagens],
    }),
  });
  const dados = await resposta.json();
  return dados.choices[0].message.content;
}

const SUGESTOES = ["Qual imóvel é o mais barato?", "Tem casa com piscina?", "Quais aceitam pets?"];

export function Chat() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [texto, setTexto] = useState("");
  const [pensando, setPensando] = useState(false);
  const fim = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fim.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, pensando]);

  async function enviar(pergunta: string) {
    if (!pergunta.trim() || pensando) return;
    const novas: Mensagem[] = [...mensagens, { role: "user", content: pergunta }];
    setMensagens(novas);
    setTexto("");
    setPensando(true);
    try {
      const resposta = await perguntarAoCorretor(novas);
      setMensagens([...novas, { role: "assistant", content: resposta }]);
    } catch {
      setMensagens([...novas, { role: "assistant", content: "Desculpe, estou indisponível agora. Tente de novo em instantes." }]);
    } finally {
      setPensando(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] min-h-[560px] flex-col overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-areia">
      <div className="flex items-center gap-4 border-b border-areia bg-pinho-escuro px-6 py-4 text-white">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-terracota">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <p className="font-semibold">Corretor IA</p>
          <p className="flex items-center gap-1.5 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Online · responde em segundos
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-creme/60 p-6">
        {mensagens.length === 0 && (
          <div className="mx-auto mt-10 max-w-md text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pinho-claro">
              <Sparkles className="h-7 w-7 text-pinho" />
            </span>
            <p className="mt-4 font-display text-2xl font-semibold text-pinho-escuro">Olá! Sou o seu corretor virtual.</p>
            <p className="mt-2 text-stone-500">Pergunte sobre preços, bairros ou características dos imóveis.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SUGESTOES.map((s) => (
                <button
                  key={s}
                  onClick={() => enviar(s)}
                  className="rounded-full border border-areia bg-white px-4 py-2 text-sm hover:border-pinho hover:text-pinho"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {mensagens.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="ml-auto max-w-[75%] rounded-3xl rounded-br-md bg-pinho px-5 py-3 text-white">
              {m.content}
            </div>
          ) : (
            <div key={i} className="flex max-w-[80%] gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracota">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <div className="whitespace-pre-wrap rounded-3xl rounded-tl-md bg-white px-5 py-3 shadow-sm ring-1 ring-areia">
                {m.content}
              </div>
            </div>
          ),
        )}

        {pensando && (
          <div className="flex gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracota">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <div className="flex gap-1 rounded-3xl bg-white px-5 py-4 ring-1 ring-areia">
              {[0, 150, 300].map((d) => (
                <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-stone-400" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={fim} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          enviar(texto);
        }}
        className="flex gap-3 border-t border-areia p-4"
      >
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escreva sua pergunta…"
          className="flex-1 rounded-2xl bg-creme px-5 py-3 outline-none ring-1 ring-areia focus:ring-pinho"
        />
        <button
          aria-label="Enviar"
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pinho text-white hover:bg-pinho-escuro disabled:opacity-50"
          disabled={pensando}
        >
          <SendHorizontal className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
