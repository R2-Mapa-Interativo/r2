import { Clock } from "lucide-react";

const places = [
  { name: "Boteco da Praia", wait: 10 },
  { name: "Pizzaria do Mar", wait: 15 },
  { name: "Açaí da Areia", wait: 5 },
  { name: "Burger Litoral", wait: 20 },
];

const IfoodPraiaTab = () => {
  return (
    <section aria-label="Bares e Restaurantes" className="space-y-3">
      <h2 className="text-base font-semibold text-white">Bares e Restaurantes</h2>
      <ul className="space-y-2">
        {places.map((p) => (
          <li
            key={p.name}
            className="flex items-center gap-3 rounded-2xl bg-white p-3 text-neutral-900 shadow-md"
          >
            <div
              className="h-14 w-14 shrink-0 rounded-xl"
              style={{ background: "linear-gradient(135deg,#d4d4d8,#a1a1aa)" }}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{p.name}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-900">
                <Clock size={12} />
                Tempo de Espera: {p.wait} min
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IfoodPraiaTab;
