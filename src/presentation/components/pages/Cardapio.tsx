import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Bell, Clock, Map, MapPin, Plus, Minus, ShoppingCart, Trash2, X } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { restaurants } from "@/infrastructure/mocs/restaurantsData";
import { CartState, MenuItem, Order, OrderStatus } from "@/domain/models/types";
import { ProductCard } from "@/presentation/components/freatures/cardapio/ProductCard";
import { ProductModal } from "@/presentation/components/freatures/cardapio/ProductModal";

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

const Cardapio = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const restaurant = restaurants.find((item) => item.id === restaurantId);
  const { toast } = useToast();
  
  const [openPanel, setOpenPanel] = useState<"cart" | "notification" | null>(null);
  const [cartState, setCartState] = useState<CartState>({ restaurantId: null, items: [] });
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);

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

  if (!restaurant) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="text-center">
          <p className="text-lg font-semibold">Restaurante não encontrado</p>
          <Link to="/na-praia/lanchonete" className="mt-4 inline-flex rounded-[12px] bg-white px-4 py-2 text-sm font-bold text-black">
            Voltar para lanchonete
          </Link>
        </div>
      </main>
    );
  }

  const allSections = restaurant.menu.map((menuSection) => menuSection.section);
  const cartCount = cartState.items.reduce((acc, item) => acc + item.quantity, 0);
  
  const cartTotal = cartState.items.reduce((acc, item) => {
    return acc + (parsePrice(item.price) * item.quantity);
  }, 0);

  const handleOpenItem = (item: MenuItem) => {
    setSelectedItem(item);
    setModalQuantity(1);
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    const isDifferentRestaurant = cartState.restaurantId && cartState.restaurantId !== restaurantId;

    if (isDifferentRestaurant) {
      setConflictModalOpen(true);
      return;
    }

    const existingItemIndex = cartState.items.findIndex(i => i.name === selectedItem.name);
    const newItems = [...cartState.items];
    const isExisting = existingItemIndex >= 0;
    
    isExisting && (newItems[existingItemIndex].quantity += modalQuantity);
    !isExisting && newItems.push({ 
      name: selectedItem.name, 
      price: selectedItem.price, 
      quantity: modalQuantity,
      imageUrl: selectedItem.imageUrl
    });

    const newCart = { restaurantId: restaurantId!, items: newItems };
    localStorage.setItem("na_praia_cart", JSON.stringify(newCart));
    setCartState(newCart);
    
    toast({
      title: "Sucesso!",
      description: `${modalQuantity}x ${selectedItem.name} adicionada ao carrinho.`,
      variant: "default"
    });

    setSelectedItem(null);
  };

  const handleClearAndAdd = () => {
    if (!selectedItem) return;

    const newCart = { 
      restaurantId: restaurantId!, 
      items: [{ 
        name: selectedItem.name, 
        price: selectedItem.price, 
        quantity: modalQuantity,
        imageUrl: selectedItem.imageUrl
      }] 
    };

    localStorage.setItem("na_praia_cart", JSON.stringify(newCart));
    setCartState(newCart);
    setConflictModalOpen(false);
    setSelectedItem(null);

    toast({
      title: "Carrinho atualizado",
      description: `${modalQuantity}x ${selectedItem.name} adicionada.`,
      variant: "default"
    });
  };

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

  const hasUnreadNotification = activeOrder && activeOrder.status !== 'RETIRADO' && activeOrder.status !== 'CANCELADO';

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto min-h-screen max-w-[720px] overflow-hidden bg-black">
        <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#1A3974_0%,#164F82_44%,#071D3D_72%,#020202_100%)] px-[clamp(20px,5.4vw,39px)] pb-[clamp(30px,7vw,50px)] pt-[clamp(28px,6.4vw,46px)]">
          <div className={`pointer-events-none absolute right-[-22%] top-[9%] h-[clamp(220px,48vw,346px)] w-[clamp(220px,48vw,346px)] rounded-full bg-gradient-to-br ${restaurant.color}`} />
          <div className="pointer-events-none absolute left-[-20%] top-[25%] h-[clamp(72px,16vw,115px)] w-[clamp(340px,78vw,562px)] rotate-[-12deg] rounded-full bg-[#02023c]" />
          <div className="pointer-events-none absolute left-[18%] top-[41%] h-[clamp(118px,24vw,173px)] w-[clamp(118px,24vw,173px)] rounded-full bg-[#f4f36f]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-black from-[48%] via-black/90 via-[72%] to-transparent" />

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

          <section className="relative z-10 mt-[clamp(42px,9vw,65px)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              Cardápio
            </p>
            <h1 className="mt-2 max-w-sm text-[clamp(30px,7.2vw,52px)] font-black leading-none">
              {restaurant.name}
            </h1>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-white/85">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
                  <Clock size={13} />
                  {restaurant.wait} min
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
                  <MapPin size={13} />
                  {restaurant.distance}
                </span>
              </div>
              <Link
                to={`/na-praia/mapa?restaurant=${restaurant.id}`}
                aria-label="Ver no mapa"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                <Map size={18} strokeWidth={3} />
              </Link>
            </div>
          </section>

          <section className="relative z-10 mt-8" aria-label="Itens do cardápio">
            <Accordion type="multiple" defaultValue={allSections} className="w-full space-y-6">
              {restaurant.menu.map((menuGroup) => (
                <AccordionItem key={menuGroup.section} value={menuGroup.section} className="border-none">
                  <AccordionTrigger className="pb-4 pt-0 text-xl font-black text-white hover:no-underline">
                    {menuGroup.section}
                  </AccordionTrigger>
                  <AccordionContent className="grid grid-cols-2 gap-3 pb-0">
                    {menuGroup.items.map((item) => (
                      <ProductCard 
                        key={item.name} 
                        item={item} 
                        color={restaurant.color} 
                        onOpen={handleOpenItem} 
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <ProductModal 
            item={selectedItem}
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
            quantity={modalQuantity}
            setQuantity={setModalQuantity}
            onAdd={handleAddToCart}
            restaurantColor={restaurant.color}
          />

          <Dialog open={conflictModalOpen} onOpenChange={setConflictModalOpen}>
            <DialogContent className="w-[90vw] max-w-[400px] rounded-[24px] border-none bg-[#F8F8F8] p-6 text-neutral-950 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">Carrinho Ocupado</DialogTitle>
              </DialogHeader>
              <div className="py-3">
                <p className="text-[15px] font-medium leading-relaxed text-neutral-600">
                  Você já tem itens de outro local. Deseja esvaziar o carrinho e começar um novo aqui?
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="h-12 flex-1 rounded-[14px] border-neutral-300 font-bold" 
                  onClick={() => setConflictModalOpen(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  className="h-12 flex-1 rounded-[14px] bg-neutral-950 font-bold text-white shadow-md hover:bg-neutral-800" 
                  onClick={handleClearAndAdd}
                >
                  Esvaziar
                </Button>
              </div>
            </DialogContent>
          </Dialog>

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

export default Cardapio;