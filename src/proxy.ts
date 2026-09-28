import { NextResponse, type NextRequest } from "next/server";

// Simula o login da Ana: um cookie de sessão SEM HttpOnly,
// então qualquer script na página consegue ler com document.cookie (parada 7).
export function proxy(request: NextRequest) {
  const resposta = NextResponse.next();
  if (!request.cookies.has("sessao")) {
    resposta.cookies.set("sessao", "sess_7f2a9c4e1b8d3f6a0e5c", { path: "/" });
  }
  return resposta;
}

export const config = {
  matcher: ["/((?!_next|api|imoveis/.*\\.jpg|favicon.ico).*)"],
};
