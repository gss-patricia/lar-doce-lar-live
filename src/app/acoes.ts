"use server";

import { cookies } from "next/headers";
import { lerModo, type Parada } from "@/lib/modo";

export async function alternarModo(parada: Parada) {
  const atual = await lerModo(parada);
  (await cookies()).set(`modo-${parada}`, atual === "seguro" ? "vulneravel" : "seguro", { path: "/" });
}
