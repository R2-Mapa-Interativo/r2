interface OrderCardProps {
  order: any;
  onClick: (order: any) => void;
}

const statusConfig: Record<string, { label: string; colorClass: string; bgClass: string }> = {
  created: { label: "Recebido", colorClass: "text-blue-600", bgClass: "bg-blue-100" },
  preparing: { label: "Preparando", colorClass: "text-amber-600", bgClass: "bg-amber-100" },
  ready: { label: "Pronto", colorClass: "text-emerald-600", bgClass: "bg-emerald-100" },
  finished: { label: "Concluído", colorClass: "text-neutral-500", bgClass: "bg-neutral-100" },
};

export const OrderCard = ({ order, onClick }: OrderCardProps) => {
  const statusInfo = statusConfig[order.status] || { label: "Processando", colorClass: "text-neutral-500", bgClass: "bg-neutral-100" };
  const formatPrice = (val: number) => `R$ ${Number(val).toFixed(2).replace('.', ',')}`;
  
  const establishmentName = order.establishment?.name || "Restaurante";
  const dateStr = new Date(order.created_at).toLocaleDateString('pt-BR');
  const itemsCount = order.items ? order.items.length : 0;
  const isSingular = itemsCount === 1;
  const itemLabel = isSingular ? 'item' : 'itens';

  return (
    <button
      type="button"
      onClick={() => onClick(order)}
      className="flex w-full flex-col gap-3 rounded-[16px] bg-[#F8F8F8] p-4 text-left shadow-sm border border-neutral-100/80 transition-transform hover:-translate-y-0.5 active:translate-y-0"
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 rounded-[10px] bg-gradient-to-br from-neutral-800 to-neutral-900" />
          <div className="flex flex-col">
            <span className="text-[15px] font-black leading-tight text-neutral-900">{establishmentName}</span>
            <span className="mt-0.5 text-[12px] font-semibold text-neutral-500">Pedido #{order.id}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[15px] font-black text-neutral-900">{formatPrice(order.total_amount)}</span>
          <span className="mt-0.5 text-[11px] font-bold text-neutral-400">{dateStr}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-neutral-200/50 pt-3">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${statusInfo.bgClass} ${statusInfo.colorClass}`}>
          {statusInfo.label}
        </span>
        <span className="text-[11px] font-bold text-neutral-500">
          {itemsCount} {itemLabel}
        </span>
      </div>
    </button>
  );
};