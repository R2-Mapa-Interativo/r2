import { MapPin, AlertTriangle, CheckCircle2 } from "lucide-react";

const MapaInterativoTab = () => {
  return (
    <section aria-label="Mapa Interativo" className="space-y-3">
      <div
        className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg,#1f3a5f 0%,#2a4d7a 50%,#3a6396 100%)",
        }}
        aria-label="Placeholder do mapa"
      >
        <MapPin size={36} className="text-white/70" />
        <span className="absolute bottom-2 right-3 text-[11px] text-white/60">
          Mapa Interativo
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="flex items-start gap-2 rounded-xl bg-white p-3 text-neutral-900 shadow-md">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-600" />
          <div className="min-w-0">
            <p className="text-xs font-semibold">Lotação Banheiro 1: 100%</p>
            <p className="text-[11px] text-neutral-600">Rota Alternativa Sugerida</p>
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-xl bg-white p-3 text-neutral-900 shadow-md">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
          <div className="min-w-0">
            <p className="text-xs font-semibold">Bar Principal: 20%</p>
            <p className="text-[11px] text-neutral-600">Fluxo Livre</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapaInterativoTab;
