import { Ticket, Mic } from "lucide-react";

const FestivalTab = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        className="flex flex-col items-start gap-2 rounded-2xl bg-white p-4 text-left text-neutral-900 shadow-lg transition-transform hover:scale-[0.99]"
      >
        <Ticket size={22} />
        <span className="text-sm font-medium">Comprar Ingresso</span>
      </button>
      <button
        type="button"
        className="flex flex-col items-start gap-2 rounded-2xl bg-white p-4 text-left text-neutral-900 shadow-lg transition-transform hover:scale-[0.99]"
      >
        <Mic size={22} />
        <span className="text-sm font-medium">Horários</span>
      </button>
    </div>
  );
};

export default FestivalTab;
