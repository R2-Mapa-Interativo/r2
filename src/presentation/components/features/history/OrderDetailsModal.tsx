import { CheckCircle2, Clock, X } from "lucide-react";

interface OrderDetailsModalProps {
  order: any | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusOrder = ['created', 'preparing', 'ready', 'finished'];

const getStatusIndex = (status: string) => {
  return statusOrder.indexOf(status);
}

export const OrderDetailsModal = ({ order, isOpen, onClose }: OrderDetailsModalProps) => {
  if (!order || !isOpen) return null;

  const currentIndex = getStatusIndex(order.status);
  const formatPrice = (val: number) => `R$ ${Number(val).toFixed(2).replace('.', ',')}`;
  
  const establishmentName = order.establishment?.name || "Restaurante";
  const dateObj = new Date(order.created_at);
  const dateStr = dateObj.toLocaleDateString('pt-BR');
  const timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div 
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 px-2 pb-2 backdrop-blur-sm sm:px-4 sm:pb-4"
      onClick={onClose}
    >
      <section 
        className="flex w-full max-w-[680px] max-h-[85vh] flex-col overflow-hidden rounded-[24px] bg-[#F8F8F8] text-neutral-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between border-b border-neutral-200/60 p-5 pb-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              Detalhes do Pedido
            </p>
            <h2 className="mt-1 text-xl font-black text-neutral-900">#{order.id}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-neutral-200/80 transition-colors hover:bg-neutral-300"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="mb-6 flex items-center gap-4 rounded-[16px] bg-white p-4 shadow-sm border border-neutral-100/80">
            <div className="h-14 w-14 shrink-0 rounded-[12px] bg-gradient-to-br from-neutral-800 to-neutral-900" />
            <div className="flex flex-col">
              <span className="text-[16px] font-black leading-tight text-neutral-900">{establishmentName}</span>
              <div className="mt-1 flex items-center gap-2 text-[12px] font-medium text-neutral-500">
                <span className="flex items-center gap-1"><Clock size={12} /> {dateStr} às {timeStr}</span>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-[16px] bg-white p-5 shadow-sm border border-neutral-100/80">
            <h3 className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em] text-neutral-400">Linha do Tempo</h3>
            
            <div className="relative pl-3">
              <div className="absolute bottom-0 left-[19px] top-2 w-[2px] bg-neutral-100" />
              
              <div className="relative mb-6 flex items-start gap-4">
                <div className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full mt-1 ${currentIndex >= 0 ? 'bg-emerald-500' : 'bg-neutral-200'}`}>
                  {currentIndex >= 0 && <CheckCircle2 size={16} className="absolute text-emerald-500 bg-white rounded-full" />}
                </div>
                <div className="flex flex-col">
                  <span className={`text-[14px] font-bold ${currentIndex >= 0 ? 'text-neutral-900' : 'text-neutral-400'}`}>Pedido Recebido</span>
                  <span className="text-[12px] text-neutral-500">Aguardando confirmação.</span>
                </div>
              </div>

              <div className="relative mb-6 flex items-start gap-4">
                <div className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full mt-1 ${currentIndex >= 1 ? 'bg-emerald-500' : 'bg-neutral-200'}`}>
                  {currentIndex >= 1 && <CheckCircle2 size={16} className="absolute text-emerald-500 bg-white rounded-full" />}
                </div>
                <div className="flex flex-col">
                  <span className={`text-[14px] font-bold ${currentIndex >= 1 ? 'text-neutral-900' : 'text-neutral-400'}`}>Preparando</span>
                  <span className="text-[12px] text-neutral-500">Seu pedido está na cozinha.</span>
                </div>
              </div>

              <div className="relative mb-6 flex items-start gap-4">
                <div className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full mt-1 ${currentIndex >= 2 ? 'bg-emerald-500' : 'bg-neutral-200'}`}>
                  {currentIndex >= 2 && <CheckCircle2 size={16} className="absolute text-emerald-500 bg-white rounded-full" />}
                </div>
                <div className="flex flex-col">
                  <span className={`text-[14px] font-bold ${currentIndex >= 2 ? 'text-emerald-600' : 'text-neutral-400'}`}>Pronto para Retirada</span>
                  <span className="text-[12px] text-neutral-500">Por favor, dirija-se ao balcão.</span>
                </div>
              </div>

              <div className="relative flex items-start gap-4">
                <div className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full mt-1 ${currentIndex >= 3 ? 'bg-emerald-500' : 'bg-neutral-200'}`}>
                  {currentIndex >= 3 && <CheckCircle2 size={16} className="absolute text-emerald-500 bg-white rounded-full" />}
                </div>
                <div className="flex flex-col">
                  <span className={`text-[14px] font-bold ${currentIndex >= 3 ? 'text-neutral-900' : 'text-neutral-400'}`}>Concluído</span>
                  <span className="text-[12px] text-neutral-500">Bom apetite!</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-neutral-400">Itens</h3>
            {order.items && order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-neutral-100 text-[12px] font-bold text-neutral-700">
                    {item.quantity}x
                  </span>
                  <span className="text-[14px] font-bold text-neutral-900">{item.product?.name || 'Item'}</span>
                </div>
                <span className="text-[13px] font-bold text-neutral-500">{formatPrice(item.unit_price)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0 bg-white p-5 border-t border-neutral-200/60 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-neutral-500">Total Pago</span>
            <span className="text-2xl font-black text-[#059669]">{formatPrice(order.total_amount)}</span>
          </div>
        </div>
      </section>
    </div>
  );
};