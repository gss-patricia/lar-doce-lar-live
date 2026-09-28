import { Interruptor } from "@/components/Interruptor";
import { lerModo } from "@/lib/modo";
import { Chat } from "./Chat";

export default async function PaginaCorretor() {
  const modo = await lerModo("mordomo");

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Chat modo={modo} />
      <Interruptor parada="mordomo" />
    </div>
  );
}
