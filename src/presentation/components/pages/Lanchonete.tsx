import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, History, Minus, Plus, Search, ShoppingCart, Trash2, X } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { restaurants } from "@/infrastructure/mocs/restaurantsData";
import { RestaurantCard } from "@/presentation/components/freatures/lanchonete/RestaurantCard";
import { CartState, Order, OrderStatus } from "@/domain/models/types";

const FILTERS = ["Restaurantes", "Bares", "Lanches Rápidos", "Sobremesas", "Sem Álcool", "Vegano/Vegetariano"];

const parsePrice = (priceStr: string) => {
  const numericStr = priceStr.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(numericStr) || 0;
};

const formatPrice = (value: number) => {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
};

const getNotificationMessage = (status: OrderStatus, restaurantName: string) => {
  if (status === 'CONFIRMADO') return `Seu pedido em ${restaurantName} foi confirmado e enviado à cozinha.`;
  if (status === 'EM_PREPARO') return `O restaurante ${restaurantName} começou a preparar seu pedido.`;
  if (status === 'CINCO_MINUTOS') return `Faltam 5 minutos! Aproxime-se do balcão de ${restaurantName}.`;
  if (status === 'PRONTO') return `Seu pedido de ${restaurantName} está pronto para retirada no balcão.`;
  if (status === 'RETIRADO') return `Pedido retirado. Bom apetite!`;
  if (status === 'CANCELADO') return `Seu pedido em ${restaurantName} foi cancelado.`;
  return "Nenhuma notificação no momento.";
};

const Lanchonete = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const [openPanel, setOpenPanel] = useState<"cart" | "notification" | null>(null);
  const [cartState, setCartState] = useState<CartState>({ restaurantId: null, items: [] });
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedCart = localStorage.getItem("na_praia_cart");
      if (storedCart) {
        try { setCartState(JSON.parse(storedCart)); } catch (e) {}
      }

      const storedOrder = localStorage.getItem("na_praia_active_order");
      if (storedOrder) {
        try { setActiveOrder(JSON.parse(storedOrder)); } catch (e) {}
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const cartCount = cartState.items.reduce((acc, item) => acc + item.quantity, 0);
  
  const cartTotal = cartState.items.reduce((acc, item) => {
    return acc + (parsePrice(item.price) * item.quantity);
  }, 0);

  const updateCartQty = (name: string, delta: number) => {
    const newItems = cartState.items.map((i) => {
      if (i.name === name) {
        return { ...i, quantity: Math.max(0, i.quantity + delta) };
      }
      return i;
    }).filter(i => i.quantity > 0);

    const newCart = { ...cartState, items: newItems };
    localStorage.setItem("na_praia_cart", JSON.stringify(newCart));
    setCartState(newCart);
  };

  const removeCartItem = (name: string) => {
    const newItems = cartState.items.filter(i => i.name !== name);
    const newCart = { ...cartState, items: newItems };
    localStorage.setItem("na_praia_cart", JSON.stringify(newCart));
    setCartState(newCart);
  };

  const advanceOrderStatus = () => {
    if (!activeOrder) return;
    let nextStatus: OrderStatus = 'CONFIRMADO';
    
    if (activeOrder.status === 'CONFIRMADO') nextStatus = 'EM_PREPARO';
    if (activeOrder.status === 'EM_PREPARO') nextStatus = 'CINCO_MINUTOS';
    if (activeOrder.status === 'CINCO_MINUTOS') nextStatus = 'PRONTO';
    if (activeOrder.status === 'PRONTO') nextStatus = 'RETIRADO';
    if (activeOrder.status === 'RETIRADO') nextStatus = 'CONFIRMADO';

    const updatedOrder = { ...activeOrder, status: nextStatus };
    localStorage.setItem("na_praia_active_order", JSON.stringify(updatedOrder));
    setActiveOrder(updatedOrder);
  };

  const filteredRestaurants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return restaurants.filter((restaurant) => {
      const matchesSearch =
        !normalizedQuery ||
        [restaurant.name, restaurant.category].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        );

      const matchesFilter = !activeFilter || restaurant.tags.includes(activeFilter as any);

      return matchesSearch && matchesFilter;
    });
  }, [query, activeFilter]);

  const hasUnreadNotification = activeOrder && activeOrder.status !== 'RETIRADO' && activeOrder.status !== 'CANCELADO';

  return (
    <main className="min-h-screen bg-black text-white"> 
      <div className="mx-auto min-h-screen max-w-[720px] overflow-hidden bg-black">
        <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#112D66_0%,#1F5C9A_45%,#0E2A50_72%,#020202_100%)] px-[clamp(20px,5.4vw,39px)] pb-[clamp(30px,7vw,50px)] pt-[clamp(28px,6.4vw,46px)]">
          <div className="pointer-events-none absolute left-[-18%] top-[14%] h-[clamp(118px,27vw,194px)] w-[clamp(290px,70vw,504px)] rotate-[-14deg] rounded-full bg-[#823612]" />
          <div className="pointer-events-none absolute right-[-20%] top-[10%] h-[clamp(180px,38vw,274px)] w-[clamp(180px,38vw,274px)] rounded-full bg-[#db98c5]" />
          <div className="pointer-events-none absolute left-[8%] top-[31%] h-[clamp(58px,13vw,94px)] w-[clamp(260px,64vw,461px)] rotate-[8deg] rounded-[999px] bg-[#02023c]" />
          <div className="pointer-events-none absolute right-[4%] top-[43%] h-[clamp(92px,19vw,137px)] w-[clamp(118px,26vw,187px)] rotate-[-10deg] rounded-[18px] bg-[#823612]" />
          <div className="pointer-events-none absolute left-[-12%] bottom-[21%] h-[clamp(110px,24vw,173px)] w-[clamp(110px,24vw,173px)] rounded-full bg-[#f0eadf]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black from-[50%] via-black/88 via-[72%] to-transparent" />

          <header className="relative z-10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Voltar"
              className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(52px,10.8vw,78px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur"
            >
              <ArrowLeft size={18} strokeWidth={3} />
            </button>

            <div className="flex gap-[clamp(8px,2vw,14px)]">
              <button
                type="button"
                onClick={() => navigate("/na-praia/historico")}
                aria-label="Histórico"
                className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(46px,9.6vw,70px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
              >
                <History size={17} strokeWidth={3} />
              </button>
              <button
                type="button"
                onClick={() => setOpenPanel("notification")}
                aria-label="Notificações"
                className="relative flex h-[clamp(36px,7.6vw,55px)] w-[clamp(46px,9.6vw,70px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
              >
                <Bell size={17} strokeWidth={3} />
                {hasUnreadNotification && (
                  <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-red-500 shadow-sm" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setOpenPanel("cart")}
                aria-label="Carrinho"
                className="relative flex h-[clamp(36px,7.6vw,55px)] w-[clamp(58px,12.2vw,88px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
              >
                <ShoppingCart size={18} strokeWidth={3} />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#db98c5] text-[10px] font-bold text-white shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </header>

          <div className="relative z-10 mt-[clamp(34px,8vw,58px)]">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                  Na Praia
                </p>
                <h1 className="mt-2 text-[clamp(30px,7.2vw,52px)] font-black leading-none">
                  Lanchonete
                </h1>
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen((value) => !value)}
                aria-label="Pesquisar"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-white text-neutral-950 shadow-lg"
              >
                <Search size={18} strokeWidth={3} />
              </button>
            </div>

            {searchOpen && (
              <label className="mt-5 block">
                <span className="sr-only">Pesquisar restaurante</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Pesquisar"
                  className="h-11 w-full rounded-[12px] border border-white/15 bg-black/35 px-4 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/45"
                />
              </label>
            )}
          </div>

          <div className="relative z-10 mt-6">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-2 px-2 py-2 pb-4">
                {FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                    className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 ${
                      activeFilter === filter
                        ? "border-transparent bg-white text-[#0E2A50]"
                        : "border-white/10 bg-[#0E2A50] text-white/90 hover:bg-white/20"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </div>

          <section className="relative z-10 mt-2 grid grid-cols-2 gap-3" aria-label="Restaurantes">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </section>

          {openPanel && (
            <div 
              className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 px-2 pb-2 backdrop-blur-sm sm:px-4 sm:pb-4"
              onClick={() => setOpenPanel(null)}
            >
              <section 
                className="flex w-full max-w-[680px] max-h-[85vh] flex-col overflow-hidden rounded-[24px] bg-[#F8F8F8] text-neutral-950 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex shrink-0 items-start justify-between border-b border-neutral-200/60 p-5 pb-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                      {openPanel === "cart" ? "Carrinho" : "Notificações"}
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-neutral-900">
                      {openPanel === "cart" ? "Seu pedido" : "Avisos em tempo real"}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenPanel(null)}
                    aria-label="Fechar"
                    className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-neutral-200/80 transition-colors hover:bg-neutral-300"
                  >
                    <X size={18} strokeWidth={3} />
                  </button>
                </div>

                {openPanel === "cart" && (
                  <>
                    <div className="flex-1 overflow-y-auto p-5">
                      <div className="space-y-4">
                        {cartState.items.length === 0 && (
                          <div className="flex flex-col items-center justify-center py-10">
                            <ShoppingCart size={48} className="text-neutral-300 mb-4" strokeWidth={1.5} />
                            <p className="text-[15px] font-medium text-neutral-500">Seu carrinho está vazio.</p>
                          </div>
                        )}
                        
                        {cartState.items.map((item) => (
                          <div key={item.name} className="group relative flex gap-4 rounded-[18px] bg-white p-3 shadow-sm border border-neutral-100/80 transition-all hover:shadow-md">
                            {item.imageUrl && (
                              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[12px] bg-neutral-100">
                                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                              </div>
                            )}
                            <div className="flex flex-1 flex-col py-1">
                              <div className="flex justify-between items-start pr-8">
                                <span className="text-[15px] font-bold leading-tight text-neutral-900">{item.name}</span>
                              </div>
                              
                              <span className="mt-1 text-[13px] font-semibold text-neutral-500">{item.price}</span>
                              
                              <div className="mt-auto flex items-center justify-between pt-3">
                                <div className="flex items-center gap-3 rounded-[10px] bg-[#F4F4F5] p-1 border border-neutral-200/50">
                                  <button 
                                    type="button" 
                                    onClick={() => updateCartQty(item.name, -1)} 
                                    className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 active:bg-neutral-100"
                                  >
                                    <Minus size={14} strokeWidth={2.5} />
                                  </button>
                                  <span className="w-4 text-center text-[13px] font-bold text-neutral-800">{item.quantity}</span>
                                  <button 
                                    type="button" 
                                    onClick={() => updateCartQty(item.name, 1)} 
                                    className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 active:bg-neutral-100"
                                  >
                                    <Plus size={14} strokeWidth={2.5} />
                                  </button>
                                </div>
                                
                                <span className="text-[15px] font-black text-[#059669]">
                                  {formatPrice(parsePrice(item.price) * item.quantity)}
                                </span>
                              </div>
                            </div>

                            <button 
                              onClick={() => removeCartItem(item.name)}
                              className="absolute right-3 top-3 p-2 text-neutral-300 transition-colors hover:text-red-500"
                              aria-label="Remover item"
                            >
                              <Trash2 size={16} strokeWidth={2.5} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {cartState.items.length > 0 && (
                      <div className="shrink-0 bg-white p-5 border-t border-neutral-200/60 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
                        <div className="mb-4 flex items-center justify-between">
                          <span className="text-sm font-bold text-neutral-500">Total do pedido</span>
                          <span className="text-2xl font-black text-neutral-900">{formatPrice(cartTotal)}</span>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => navigate("/na-praia/checkout")}
                          className="flex h-[56px] w-full items-center justify-center gap-2 rounded-[16px] bg-neutral-950 text-[15px] font-bold tracking-wide text-white shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_20px_rgba(0,0,0,0.2)] active:translate-y-0"
                        >
                          <ShoppingCart size={18} strokeWidth={2.5} />
                          Finalizar pedido
                        </button>
                      </div>
                    )}
                  </>
                )}

                {openPanel === "notification" && (
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div className="rounded-[16px] bg-white p-5 text-[15px] font-medium leading-relaxed text-neutral-800 shadow-sm border border-neutral-100">
                      {activeOrder 
                        ? getNotificationMessage(activeOrder.status, activeOrder.restaurantName) 
                        : "Você não possui pedidos ativos no momento."}
                    </div>
                    
                    {activeOrder && (
                      <button 
                        type="button"
                        onClick={advanceOrderStatus}
                        className="mt-6 rounded-[12px] bg-blue-50/50 py-3 text-[12px] font-bold text-blue-600 transition-colors hover:bg-blue-100/50 border border-blue-100 border-dashed"
                      >
                        [DEV] Simular Próximo Status
                      </button>
                    )}
                  </div>
                )}
              </section>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Lanchonete;