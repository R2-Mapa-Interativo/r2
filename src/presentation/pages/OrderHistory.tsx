import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OrderCard } from "@/presentation/components/features/history/OrderCard";
import { OrderDetailsModal } from "@/presentation/components/features/history/OrderDetailsModal";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"PROGRESS" | "HISTORY">("PROGRESS");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  
  const [inProgressOrders, setInProgressOrders] = useState<any[]>([]);
  const [historyOrders, setHistoryOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost/api/orders/user/1");
        const isInvalid = !response.ok;
        if (isInvalid) throw new Error("Failed to load history");
        
        const data = await response.json();
        
        setInProgressOrders(data.in_progress);
        setHistoryOrders(data.history);
      } catch (error) {
        setInProgressOrders([]);
        setHistoryOrders([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const displayedOrders = activeTab === "PROGRESS" ? inProgressOrders : historyOrders;

  return (
    <div className="min-h-screen bg-black text-foreground pb-10">
      <main className="mx-auto max-w-[720px] px-4 pt-6">
        <header className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] bg-neutral-800 text-white transition-colors hover:bg-neutral-700"
          >
            <ArrowLeft size={18} strokeWidth={3} />
          </button>
          <h1 className="text-2xl font-black text-white">Meus Pedidos</h1>
        </header>

        <div className="mb-6 flex rounded-[12px] bg-neutral-900 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("PROGRESS")}
            className={`flex-1 rounded-[10px] py-2.5 text-[14px] font-bold transition-colors ${
              activeTab === "PROGRESS" ? "bg-white text-black shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
          >
            Em Andamento
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("HISTORY")}
            className={`flex-1 rounded-[10px] py-2.5 text-[14px] font-bold transition-colors ${
              activeTab === "HISTORY" ? "bg-white text-black shadow-sm" : "text-neutral-400 hover:text-white"
            }`}
          >
            Histórico
          </button>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 text-center text-white">
            Carregando seus pedidos...
          </div>
        )}

        {!isLoading && (
          <section className="space-y-3">
            {displayedOrders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="text-[15px] font-medium text-neutral-500">
                  Nenhum pedido encontrado nesta categoria.
                </span>
              </div>
            )}
            
            {displayedOrders.map((order) => (
              <OrderCard key={order.id} order={order} onClick={setSelectedOrder} />
            ))}
          </section>
        )}
      </main>

      <OrderDetailsModal 
        order={selectedOrder} 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </div>
  );
};

export default OrderHistory;