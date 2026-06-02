import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MenuItem } from "@/domain/models/types";

interface ProductModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  onAdd: () => void;
  restaurantColor: string;
}

export const ProductModal = ({ item, isOpen, onClose, quantity, setQuantity, onAdd, restaurantColor }: ProductModalProps) => {
  if (!item) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[90vw] max-w-[420px] overflow-hidden rounded-[24px] border-none bg-[#F8F8F8] p-0 text-neutral-950 shadow-2xl sm:rounded-[24px]">
        <DialogHeader className="hidden">
          <DialogTitle>Detalhes do Produto</DialogTitle>
        </DialogHeader>

        <div className="relative h-[240px] w-full bg-neutral-200">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/70"
            aria-label="Fechar"
          >
            <X size={18} strokeWidth={3} />
          </button>
          
          {item.imageUrl && (
            <img src={item.imageUrl} alt={item.name} className="h-full w-full rounded-t-[24px] object-cover" />
          )}
          {!item.imageUrl && (
            <div className={`h-full w-full rounded-t-[24px] bg-gradient-to-br ${restaurantColor}`} />
          )}
        </div>

        <div className="p-6 pt-5">
          <h2 className="text-2xl font-black leading-tight text-neutral-900">{item.name}</h2>
          
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-neutral-200/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-800">
              Popular
            </span>
            <span className="rounded-full bg-neutral-200/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-800">
              Preparo Rápido
            </span>
          </div>
          
          <p className="mt-4 text-sm font-medium leading-relaxed text-neutral-600">{item.description}</p>
          
          <div className="mt-5 mb-2 inline-flex items-center rounded-xl bg-green-50 px-4 py-2">
            <p className="text-3xl font-black text-[#059669]">{item.price}</p>
          </div>
          
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-neutral-200 pt-5">
            <div className="flex items-center gap-3 rounded-[12px] bg-white p-1.5 shadow-sm border border-neutral-100">
              <button 
                type="button" 
                onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-neutral-100 text-neutral-700 active:bg-neutral-200"
              >
                <Minus size={18} strokeWidth={3} />
              </button>
              <span className="w-6 text-center text-base font-bold">{quantity}</span>
              <button 
                type="button" 
                onClick={() => setQuantity(q => q + 1)} 
                className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-neutral-100 text-neutral-700 active:bg-neutral-200"
              >
                <Plus size={18} strokeWidth={3} />
              </button>
            </div>
            <Button 
              type="button" 
              onClick={onAdd} 
              className="h-14 flex-1 rounded-[14px] bg-neutral-950 text-[15px] font-bold tracking-wide text-white shadow-lg transition-transform hover:scale-[1.02] hover:bg-neutral-800"
            >
              Adicionar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};