import { Plus } from "lucide-react";
import { MenuItem } from "@/domain/models/types";

interface ProductCardProps {
  item: MenuItem;
  color: string;
  onOpen: (item: MenuItem) => void;
}

export const ProductCard = ({ item, color, onOpen }: ProductCardProps) => {
  return (
    <article
      onClick={() => onOpen(item)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[18px] border border-neutral-100 bg-[#F8F8F8] text-neutral-950 shadow-[0_6px_24px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgb(0,0,0,0.12)]"
    >
      <div className={`relative h-28 w-full bg-gradient-to-br ${color}`}>
        {item.imageUrl && (
          <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <h2 className="text-sm font-black leading-tight text-neutral-900">{item.name}</h2>
          <p className="mt-1.5 line-clamp-2 text-[11px] font-medium leading-relaxed text-neutral-500">
            {item.description}
          </p>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <p className="text-xl font-black tracking-tight text-[#059669]">{item.price}</p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(item);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-neutral-900 text-white shadow-sm transition-colors group-hover:bg-neutral-700"
            aria-label="Adicionar"
          >
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
    </article>
  );
};