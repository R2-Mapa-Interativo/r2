import { CartItem } from "@/domain/models/types";

interface CheckoutSummaryProps {
  items: CartItem[];
  formatPrice: (val: number) => string;
  parsePrice: (val: string) => number;
}

export const CheckoutSummary = ({ items, formatPrice, parsePrice }: CheckoutSummaryProps) => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.name} className="flex items-center justify-between rounded-[16px] bg-white p-3 shadow-sm border border-neutral-100/80">
          <div className="flex items-center gap-3">
            {item.imageUrl && (
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[8px] bg-neutral-100">
                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-[14px] font-bold leading-tight text-neutral-900">{item.name}</span>
              <span className="mt-0.5 text-[12px] font-semibold text-neutral-500">Qtd: {item.quantity}</span>
            </div>
          </div>
          <span className="text-[14px] font-black text-[#059669]">
            {formatPrice(parsePrice(item.price) * item.quantity)}
          </span>
        </div>
      ))}
    </div>
  );
};