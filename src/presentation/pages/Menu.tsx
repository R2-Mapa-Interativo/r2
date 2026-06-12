import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Bell, Clock, MapPin, ShoppingCart, X } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "@/presentation/components/features/menu/ProductCard";
import { ProductModal } from "@/presentation/components/features/menu/ProductModal";
import { useCartStore } from "@/domain/store/useCartStore";
import { useOrderStore } from "@/domain/store/useOrderStore";
import { useCatalogStore } from "@/domain/store/useCatalogStore";

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

const Menu = () => {
  const navigate = useNavigate();
  const { establishmentId } = useParams();
  const { toast } = useToast();
  
  const [activePanel, setActivePanel] = useState<"cart" | "notification" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);

  const { items, establishmentId: cartEstablishmentId, addItem, clearAndAddItem, getItemCount, getTotal } = useCartStore();
  const { notifications, hasUnreadNotification, markNotificationsRead } = useOrderStore();
  const { catalogs, loadingCatalogs, fetchCatalog } = useCatalogStore();

  const cartCount = getItemCount();
  const cartTotal = getTotal();
  const unreadAlert = hasUnreadNotification();

  const safeEstablishmentId = String(establishmentId);

  useEffect(() => {
    fetchCatalog(safeEstablishmentId);
  }, [safeEstablishmentId, fetchCatalog]);

  const catalogData = catalogs[safeEstablishmentId];
  const isLoading = loadingCatalogs[safeEstablishmentId] ?? false;
  const hasData = !!catalogData && !!catalogData.establishment;
  const isNotFound = !isLoading && !hasData;

  const handleOpenProduct = (product: any) => {
    setSelectedProduct(product);
    setModalQuantity(1);
  };

  const handleAddToCart = () => {
    const isInvalidProduct = !selectedProduct;
    if (isInvalidProduct) return;

    const isDifferentEstablishment = cartEstablishmentId !== null && cartEstablishmentId !== safeEstablishmentId;

    if (isDifferentEstablishment) {
      setIsConflictModalOpen(true);
      return;
    }

    addItem(safeEstablishmentId, { 
      productId: selectedProduct.id,
      name: selectedProduct.name, 
      price: selectedProduct.price, 
      quantity: modalQuantity,
      imageUrl: selectedProduct.image_url
    });
    
    toast({
      title: "Sucesso!",
      description: `${modalQuantity}x ${selectedProduct.name} adicionada ao carrinho.`,
      variant: "default"
    });

    setSelectedProduct(null);
  };

  const handleClearAndAdd = () => {
    const isInvalidProduct = !selectedProduct;
    if (isInvalidProduct) return;

    clearAndAddItem(safeEstablishmentId, { 
      productId: selectedProduct.id,
      name: selectedProduct.name, 
      price: selectedProduct.price, 
      quantity: modalQuantity,
      imageUrl: selectedProduct.image_url
    });

    setIsConflictModalOpen(false);
    setSelectedProduct(null);

    toast({
      title: "Carrinho atualizado",
      description: `${modalQuantity}x ${selectedProduct.name} adicionada.`,
      variant: "default"
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto min-h-screen max-w-[720px] overflow-hidden bg-black">
        <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#1A3974_0%,#164F82_44%,#071D3D_72%,#020202_100%)] px-[clamp(20px,5.4vw,39px)] pb-[clamp(30px,7vw,50px)] pt-[clamp(28px,6.4vw,46px)]">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-black from-[48%] via-black/90 via-[72%] to-transparent" />

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

          <section className="relative z-10 mt-[clamp(42px,9vw,65px)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              Cardápio
            </p>

            {isLoading && (
              <div className="mt-2 h-[48px] w-[70%] animate-pulse rounded-[12px] bg-white/20" />
            )}

            {hasData && (
              <>
                <h1 className="mt-2 max-w-sm text-[clamp(30px,7.2vw,52px)] font-black leading-none">
                  {catalogData.establishment.name}
                </h1>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-white/85">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
                      <Clock size={13} />
                      15 min
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
                      <MapPin size={13} />
                      Local
                    </span>
                  </div>
                </div>
              </>
            )}
          </section>

          {isLoading && (
            <section className="relative z-10 mt-8 space-y-8" aria-label="Loading Menu">
              <div className="space-y-4">
                <div className="h-6 w-32 animate-pulse rounded-md bg-white/20" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-[220px] animate-pulse rounded-[18px] bg-white/10" />
                  <div className="h-[220px] animate-pulse rounded-[18px] bg-white/10" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-6 w-40 animate-pulse rounded-md bg-white/20" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-[220px] animate-pulse rounded-[18px] bg-white/10" />
                  <div className="h-[220px] animate-pulse rounded-[18px] bg-white/10" />
                </div>
              </div>
            </section>
          )}

          {isNotFound && (
            <div className="relative z-10 mt-20 flex flex-col items-center justify-center text-center">
              <p className="text-lg font-semibold text-white">Restaurante não encontrado</p>
              <Link to="/na-praia/lanchonete" className="mt-4 inline-flex rounded-[12px] bg-white px-4 py-2 text-sm font-bold text-black">
                Voltar para lanchonete
              </Link>
            </div>
          )}

          {hasData && (
            <section className="relative z-10 mt-8" aria-label="Menu Items">
              <Accordion type="multiple" defaultValue={Object.keys(catalogData.catalog)} className="w-full space-y-6">
                {Object.entries(catalogData.catalog).map(([sectionTitle, products]) => (
                  <AccordionItem key={sectionTitle} value={sectionTitle} className="border-none">
                    <AccordionTrigger className="pb-4 pt-0 text-xl font-black text-white hover:no-underline">
                      {sectionTitle}
                    </AccordionTrigger>
                    <AccordionContent className="grid grid-cols-2 gap-3 pb-0">
                      {(products as any[]).map((product) => (
                        <ProductCard 
                          key={product.id} 
                          item={product} 
                          color="from-neutral-800 to-neutral-900" 
                          onOpen={() => handleOpenProduct(product)} 
                        />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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

          <ProductModal 
            item={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            quantity={modalQuantity}
            setQuantity={setModalQuantity}
            onAdd={handleAddToCart}
            restaurantColor="from-neutral-800 to-neutral-900"
          />

          <Dialog open={isConflictModalOpen} onOpenChange={setIsConflictModalOpen}>
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
                  onClick={() => setIsConflictModalOpen(false)}
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
        </section>
      </div>
    </main>
  );
};

export default Menu;