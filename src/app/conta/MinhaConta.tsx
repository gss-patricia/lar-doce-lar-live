"use client";

import { useEffect, useState } from "react";
import { Bell, CalendarDays, Heart, LogOut, Settings, User } from "lucide-react";

type Perfil = { nome: string; email: string };

const visitas = [
  { imovel: "Casa com varanda e jardim", bairro: "Vila Madalena", data: "Sáb, 11 out · 10h00", corretor: "Paulo R." },
  { imovel: "Chalé com lareira na serra", bairro: "Gramado", data: "Sex, 17 out · 15h30", corretor: "Luiza T." },
];

const menu = [
  { icone: User, rotulo: "Perfil", ativo: true },
  { icone: CalendarDays, rotulo: "Minhas visitas" },
  { icone: Heart, rotulo: "Favoritos" },
  { icone: Bell, rotulo: "Alertas" },
  { icone: Settings, rotulo: "Configurações" },
];

export function MinhaConta() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then((dados) => {
        // 🔓 Log de debug esquecido — qualquer um vê no Console.
        // (No modo corrigido, a API nem manda esses dados.)
        console.log("[debug] usuário carregado:", dados);
        setPerfil(dados);
      });
  }, []);

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-3xl bg-white p-3 ring-1 ring-areia">
        {menu.map(({ icone: Icone, rotulo, ativo }) => (
          <span
            key={rotulo}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium ${
              ativo ? "bg-pinho-claro text-pinho" : "text-stone-600"
            }`}
          >
            <Icone className="h-4 w-4" /> {rotulo}
          </span>
        ))}
        <span className="mt-2 flex items-center gap-3 border-t border-areia px-4 py-3 text-sm font-medium text-stone-400">
          <LogOut className="h-4 w-4" /> Sair
        </span>
      </aside>

      <section className="space-y-8">
        <div className="flex items-center gap-5 rounded-3xl bg-pinho-escuro p-8 text-white">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-terracota font-display text-3xl font-semibold">
            AS
          </span>
          {perfil ? (
            <div>
              <p className="text-sm text-white/60">Bem-vinda de volta</p>
              <p className="font-display text-3xl font-semibold">{perfil.nome}</p>
              <p className="text-white/70">{perfil.email}</p>
            </div>
          ) : (
            <div className="h-16 w-64 animate-pulse rounded-xl bg-white/10" />
          )}
        </div>

        <div>
          <h2 className="mb-4 font-display text-2xl font-semibold text-pinho-escuro">Próximas visitas</h2>
          <div className="space-y-3">
            {visitas.map((v) => (
              <div key={v.imovel} className="flex items-center justify-between rounded-2xl bg-white p-5 ring-1 ring-areia">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pinho-claro">
                    <CalendarDays className="h-5 w-5 text-pinho" />
                  </span>
                  <div>
                    <p className="font-medium">{v.imovel}</p>
                    <p className="text-sm text-stone-500">
                      {v.bairro} · com {v.corretor}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-creme px-4 py-2 text-sm font-medium">{v.data}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
