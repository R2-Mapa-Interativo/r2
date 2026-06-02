import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockOrders } from "@/infrastructure/mocs/ordersData";
import { OrderCard } from "@/presentation/components/freatures/historico/OrderCard";
import { OrderDetailsModal } from "@/presentation/components/freatures/historico/OrderDetailsModal";
import { Order } from "@/domain/models/types";

const HistoricoPedidos = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"ANDAMENTO" | "HISTORICO">("ANDAMENTO");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const andamentoOrders = mockOrders.filter(o => o.status === 'EM_PREPARO' || o.status === 'CINCO_MINUTOS' || o.status === 'PRONTO');
  const historicoOrders = mockOrders.filter(o => o.status === 'RETIRADO' || o.status === 'CANCELADO');

  const displayedOrders = activeTab === "ANDAMENTO" ? andamentoOrders : historicoOrders;

  return (
    <div className="min-h-screen bg-black text-foreground pb-10">
      <main className="mx-auto max-w-[720px] px-4 pt-6">
        <header className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
          >
            <ArrowLeft size={18} strokeWidth={3} />
          </button>
          <h1 className="text-2xl font-black text-white">Meus Pedidos</h1>
        </header>

        <div className="mb-6 flex rounded-[12px] bg-neutral-900 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("ANDAMENTO")}
            className={`flex-1 rounded-[10px] py-2.5 text-[14px] font-bold transition-colors ${
              activeTab === "ANDAMENTO" ? "bg-white text-black shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
          >
            Em Andamento
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("HISTORICO")}
            className={`flex-1 rounded-[10px] py-2.5 text-[14px] font-bold transition-colors ${
              activeTab === "HISTORICO" ? "bg-white text-black shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
          >
            Histórico
          </button>
        </div>

        <section className="space-y-3">
          {displayedOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <span className="text-[15px] font-medium text-neutral-500">
                Nenhum pedido encontrado nesta categoria.
              </span>
            </div>
          ) : (
            displayedOrders.map((order) => (
              <OrderCard key={order.id} order={order} onClick={setSelectedOrder} />
            ))
          )}
        </section>
      </main>

      <OrderDetailsModal 
        order={selectedOrder} 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  );
};

export default HistoricoPedidos;