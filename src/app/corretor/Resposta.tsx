import DOMPurify from "dompurify";
import type { Modo } from "@/lib/modo";

// Transforma o "markdown" da IA em HTML: **negrito** e quebras de linha.
function formatar(texto: string): string {
  return texto.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
}

export function Resposta({ texto, modo }: { texto: string; modo: Modo }) {
  // 🔓 PARADA 7 — O MORDOMO
  // A resposta da IA vira HTML direto na página. Se a IA "responder" um
  // <img onerror=...>, o navegador executa: XSS vindo da IA (OWASP LLM05).
  // 🔒 Corrigido: a saída da IA é tratada como input não confiável.
  // O DOMPurify remove scripts e atributos como onerror, e mantém o <strong>.
  const html = modo === "vulneravel" ? formatar(texto) : DOMPurify.sanitize(formatar(texto));

  return (
    <div
      className="rounded-3xl rounded-tl-md bg-white px-5 py-3 shadow-sm ring-1 ring-areia"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
