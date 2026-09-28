import { CANARIO, PROMPT_DO_CORRETOR, PROMPT_SEGURO, type Mensagem } from "@/lib/corretor";
import { lerModo } from "@/lib/modo";

// 🔒 Filtro na saída: confere a resposta ANTES de ela sair do servidor.
function vazouOPrompt(resposta: string, prompt: string) {
  const texto = resposta.toLowerCase();
  if (texto.includes(CANARIO.toLowerCase())) return true;
  return prompt
    .split("\n")
    .filter((linha) => linha.length > 30 && !linha.startsWith("-"))
    .some((linha) => texto.includes(linha.toLowerCase()));
}

// 🔒 PARADA 2 — a correção: o navegador fala com o NOSSO servidor,
// e só o servidor conhece a chave (variável SEM o prefixo NEXT_PUBLIC_).
export async function POST(request: Request) {
  const { mensagens } = (await request.json()) as { mensagens: Mensagem[] };
  const seguro = (await lerModo("mordomo")) === "seguro";
  const prompt = seguro ? PROMPT_SEGURO : PROMPT_DO_CORRETOR;

  const resposta = await fetch(process.env.IA_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.IA_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.IA_MODELO,
      messages: [{ role: "system", content: prompt }, ...mensagens],
    }),
  });
  const dados = await resposta.json();
  const texto: string = dados.choices[0].message.content;

  if (seguro && vazouOPrompt(texto, prompt)) {
    return Response.json({ resposta: "Desculpe, não posso ajudar com isso. Quer saber de algum imóvel?" });
  }
  return Response.json({ resposta: texto });
}
