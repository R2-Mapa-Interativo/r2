import { Order, OrderStatus } from "@/domain/models/types";

interface OrderCardProps {
  order: Order;
  onClick: (order: Order) => void;
}

const statusConfig: Record<OrderStatus, { label: string; colorClass: string; bgClass: string }> = {
  EM_PREPARO: { label: "Em preparo", colorClass: "text-blue-600", bgClass: "bg-blue-100" },
  CINCO_MINUTOS: { label: "Fica pronto em 5 min", colorClass: "text-amber-600", bgClass: "bg-amber-100" },
  PRONTO: { label: "Pronto para retirar", colorClass: "text-emerald-600", bgClass: "bg-emerald-100" },
  RETIRADO: { label: "Retirado", colorClass: "text-neutral-500", bgClass: "bg-neutral-100" },
  CANCELADO: { label: "Cancelado", colorClass: "text-red-600", bgClass: "bg-red-100" },
};

export const OrderCard = ({ order, onClick }: OrderCardProps) => {
  const statusInfo = statusConfig[order.status];
  const formatPrice = (val: number) => `R$ ${val.toFixed(2).replace('.', ',')}`;

  return (
    <button
      type="button"
      onClick={() => onClick(order)}
      className="flex w-full flex-col gap-3 rounded-[16px] bg-[#F8F8F8] p-4 text-left shadow-sm border border-neutral-100/80 transition-transform hover:-translate-y-0.5 active:translate-y-0"
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-3">
          <div className={`h-12 w-12 shrink-0 rounded-[10px] bg-gradient-to-br ${order.restaurantColor}`} />
          <div className="flex flex-col">
            <span className="text-[15px] font-black leading-tight text-neutral-900">{order.restaurantName}</span>
            <span className="mt-0.5 text-[12px] font-semibold text-neutral-500">Pedido #{order.id}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[15px] font-black text-neutral-900">{formatPrice(order.total)}</span>
          <span className="mt-0.5 text-[11px] font-bold text-neutral-400">{order.date}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-neutral-200/50 pt-3">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${statusInfo.bgClass} ${statusInfo.colorClass}`}>
          {statusInfo.label}
        </span>
        <span className="text-[11px] font-bold text-neutral-500">
          {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
        </span>
      </div>
    </button>
  );
};