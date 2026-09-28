import { cookies } from "next/headers";

// As paradas da vistoria que têm interruptor 🔓/🔒.
// (A parada 2 — chave — e a 5 — headers — são corrigidas em live coding.)
export const PARADAS = {
  janelas: "1. Janelas",
} as const;

export type Parada = keyof typeof PARADAS;
export type Modo = "vulneravel" | "seguro";

export async function lerModo(parada: Parada): Promise<Modo> {
  const valor = (await cookies()).get(`modo-${parada}`)?.value;
  return valor === "seguro" ? "seguro" : "vulneravel";
}
