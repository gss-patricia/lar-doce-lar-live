import { Interruptor } from "@/components/Interruptor";
import { MinhaConta } from "./MinhaConta";

export default function PaginaConta() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <MinhaConta />
      <Interruptor parada="janelas" />
    </div>
  );
}
