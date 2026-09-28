import { PROMPT_DO_CORRETOR, type Mensagem } from "@/lib/corretor";

// 🔒 PARADA 2 — a correção: o navegador fala com o NOSSO servidor,
// e só o servidor conhece a chave (variável SEM o prefixo NEXT_PUBLIC_).
export async function POST(request: Request) {
  const { mensagens } = (await request.json()) as { mensagens: Mensagem[] };

  const resposta = await fetch(process.env.IA_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.IA_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.IA_MODELO,
      messages: [{ role: "system", content: PROMPT_DO_CORRETOR }, ...mensagens],
    }),
  });
  const dados = await resposta.json();
  return Response.json({ resposta: dados.choices[0].message.content });
}
