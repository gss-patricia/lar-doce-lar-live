import { usuarioLogado } from "@/lib/dados";
import { lerModo } from "@/lib/modo";

export async function GET() {
  const modo = await lerModo("janelas");

  if (modo === "vulneravel") {
    // 🔓 Devolve o registro inteiro do banco. A tela só mostra nome e e-mail,
    // mas a aba Network mostra TUDO: hash da senha, CPF, token, notas internas...
    return Response.json(usuarioLogado);
  }

  // 🔒 DTO: a API devolve só o que a tela precisa.
  return Response.json({ nome: usuarioLogado.nome, email: usuarioLogado.email });
}
