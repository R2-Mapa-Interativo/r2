import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, History, Search, ShoppingCart, X } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RestaurantCard } from "@/presentation/components/features/foodCourt/RestaurantCard";
import { useCartStore } from "@/domain/store/useCartStore";
import { useOrderStore } from "@/domain/store/useOrderStore";
import { useCatalogStore } from "@/domain/store/useCatalogStore";

const FILTER_OPTIONS = ["Restaurantes", "Bares", "Lanches Rápidos", "Sobremesas", "Sem Álcool", "Vegano/Vegetariano"];

const formatPrice = (value: number) => {
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
};

const getNotificationMessage = (status: string, establishmentName: string) => {
  const isCreated = status === 'created';
  if (isCreated) return `Seu pedido em ${establishmentName} foi recebido.`;

  const isPreparing = status === 'preparing';
  if (isPreparing) return `O restaurante ${establishmentName} começou a preparar seu pedido.`;

  const isReady = status === 'ready';
  if (isReady) return `Seu pedido de ${establishmentName} está pronto para retirada.`;

  const isFinished = status === 'finished';
  if (isFinished) return `Pedido retirado. Bom apetite!`;

  return "Nenhuma notificação no momento.";
};

const FoodCourt = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<"cart" | "notification" | null>(null);
  
  const { items, getItemCount, getTotal } = useCartStore();
  const { notifications, hasUnreadNotification, markNotificationsRead } = useOrderStore();
  const { establishments, isLoadingEstablishments, fetchEstablishments } = useCatalogStore();

  const cartCount = getItemCount();
  const cartTotal = getTotal();
  const unreadAlert = hasUnreadNotification();

  useEffect(() => {
    fetchEstablishments();
  }, [fetchEstablishments]);

  const filteredEstablishments = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return establishments.filter((establishment) => {
      const matchesSearch = !normalizedQuery || [establishment.name, establishment.type].some((value) => String(value).toLowerCase().includes(normalizedQuery));
      const matchesFilter = !activeFilter || establishment.type === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter, establishments]);

  const showSkeleton = isLoadingEstablishments && establishments.length === 0;

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
              aria-label="Back"
              className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(52px,10.8vw,78px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur"
            >
              <ArrowLeft size={18} strokeWidth={3} />
            </button>

            <div className="flex gap-[clamp(8px,2vw,14px)]">
              <button
                type="button"
                onClick={() => navigate("/na-praia/historico")}
                aria-label="History"
                className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(46px,9.6vw,70px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
              >
                <History size={17} strokeWidth={3} />
              </button>
              <button
                type="button"
                onClick={() => { markNotificationsRead(); setActivePanel("notification"); }}
                aria-label="Notifications"
                className="relative flex h-[clamp(36px,7.6vw,55px)] w-[clamp(46px,9.6vw,70px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
              >
                <Bell size={17} strokeWidth={3} />
                {unreadAlert && (
                  <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-red-500 shadow-sm" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setActivePanel("cart")}
                aria-label="Cart"
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
                onClick={() => setIsSearchOpen((value) => !value)}
                aria-label="Search"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-white text-neutral-950 shadow-lg"
              >
                <Search size={18} strokeWidth={3} />
              </button>
            </div>

            {isSearchOpen && (
              <label className="mt-5 block">
                <span className="sr-only">Search</span>
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Pesquisar"
                  className="h-11 w-full rounded-[12px] border border-white/15 bg-black/35 px-4 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/45"
                />
              </label>
            )}
          </div>

          <div className="relative z-10 mt-6">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-2 px-2 py-2 pb-4">
                {FILTER_OPTIONS.map((filter) => (
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

          {showSkeleton && (
            <section className="relative z-10 mt-2 grid grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex w-full flex-col overflow-hidden rounded-[18px] bg-white/5 backdrop-blur shadow-sm">
                  <div className="h-[110px] w-full animate-pulse bg-white/10" />
                  <div className="flex flex-col p-4 space-y-3">
                    <div className="h-4 w-[85%] animate-pulse rounded bg-white/20" />
                    <div className="h-3 w-[60%] animate-pulse rounded bg-white/20" />
                    <div className="mt-2 flex gap-2">
                      <div className="h-6 w-16 animate-pulse rounded-[6px] bg-white/20" />
                      <div className="h-6 w-16 animate-pulse rounded-[6px] bg-white/20" />
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {!showSkeleton && (
            <section className="relative z-10 mt-2 grid grid-cols-2 gap-3" aria-label="Restaurants">
              {filteredEstablishments.map((establishment) => (
                <RestaurantCard key={establishment.id} restaurant={establishment} />
              ))}
            </section>
          )}

          {activePanel && (
            <div 
              className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 px-2 pb-2 backdrop-blur-sm sm:px-4 sm:pb-4"
              onClick={() => setActivePanel(null)}
            >
              <section 
                className="flex w-full max-w-[680px] max-h-[85vh] flex-col overflow-hidden rounded-[24px] bg-[#F8F8F8] text-neutral-950 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex shrink-0 items-start justify-between border-b border-neutral-200/60 p-5 pb-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                      {activePanel === "cart" ? "Carrinho" : "Notificações"}
                    </p>
                    <h2 className="mt-1 text-2xl font-black text-neutral-900">
                      {activePanel === "cart" ? "Seu pedido" : "Avisos em tempo real"}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivePanel(null)}
                    aria-label="Close"
                    className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-neutral-200/80 transition-colors hover:bg-neutral-300"
                  >
                    <X size={18} strokeWidth={3} />
                  </button>
                </div>

                {activePanel === "cart" && (
                  <>
                    <div className="flex-1 overflow-y-auto p-5">
                      <div className="space-y-4">
                        {items.length === 0 && (
                          <div className="flex flex-col items-center justify-center py-10">
                            <ShoppingCart size={48} className="text-neutral-300 mb-4" strokeWidth={1.5} />
                            <p className="text-[15px] font-medium text-neutral-500">Seu carrinho está vazio.</p>
                          </div>
                        )}
                        
                        {items.map((item: any) => (
                          <div key={item.productId} className="group relative flex gap-4 rounded-[18px] bg-white p-3 shadow-sm border border-neutral-100/80 transition-all hover:shadow-md">
                            <div className="flex flex-1 flex-col py-1">
                              <div className="flex justify-between items-start pr-8">
                                <span className="text-[15px] font-bold leading-tight text-neutral-900">{item.name}</span>
                              </div>
                              <span className="mt-1 text-[13px] font-semibold text-neutral-500">{formatPrice(Number(item.price))}</span>
                              <div className="mt-auto pt-3">
                                <span className="text-[15px] font-black text-[#059669]">
                                  {formatPrice(Number(item.price) * item.quantity)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {items.length > 0 && (
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

                {activePanel === "notification" && (
                  <div className="flex-1 overflow-y-auto p-5">
                    {notifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-center">
                        <Bell size={48} className="text-neutral-300 mb-4" strokeWidth={1.5} />
                        <p className="text-[15px] font-medium text-neutral-500">Você ainda não tem notificações.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {notifications.map((n) => (
                          <div key={n.id} className="flex gap-3 rounded-[16px] border border-neutral-100 bg-white p-4 shadow-sm">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#059669]/10 text-[#059669]">
                              <Bell size={16} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[14px] font-black leading-tight text-neutral-900">{n.title}</span>
                              <span className="mt-1 text-[13px] font-medium text-neutral-600">{n.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
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

export default FoodCourt;