import { Check } from "lucide-react";

interface PaymentMethodProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const PaymentMethod = ({ id, title, description, icon, selected, onSelect }: PaymentMethodProps) => {
  const containerClass = selected
    ? "border-neutral-900 bg-neutral-900 shadow-md"
    : "border-neutral-200/50 bg-white hover:border-neutral-300";

  const iconContainerClass = selected 
    ? "bg-white/10 text-white" 
    : "bg-neutral-100 text-neutral-700";

  const titleClass = selected ? "text-white" : "text-neutral-900";
  const descClass = selected ? "text-white/70" : "text-neutral-500";

  const checkClass = selected 
    ? "border-transparent bg-[#059669] text-white" 
    : "border-neutral-300 bg-transparent";

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`relative flex w-full items-center gap-4 rounded-[16px] border p-4 text-left transition-all ${containerClass}`}
    >
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] ${iconContainerClass}`}>
        {icon}
      </div>
      <div className="flex flex-1 flex-col">
        <span className={`text-[15px] font-black leading-tight ${titleClass}`}>
          {title}
        </span>
        <span className={`mt-1 text-[13px] font-medium ${descClass}`}>
          {description}
        </span>
      </div>
      <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${checkClass}`}>
        {selected && <Check size={14} strokeWidth={4} />}
      </div>
    </button>
  );
};