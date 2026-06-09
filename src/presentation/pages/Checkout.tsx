import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, CreditCard, Landmark, MapPin, Wallet } from "lucide-react";
import { PaymentMethod } from "@/presentation/components/features/checkout/PaymentMethod";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/domain/store/useCartStore";
import { useOrderStore } from "@/domain/store/useOrderStore";

const formatPrice = (value: number) => {
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentSelected, setPaymentSelected] = useState<string>("credit");
  const [isProcessing, setIsProcessing] = useState(false);

  const { items, establishmentId, clearCart, getTotal } = useCartStore();
  const { setActiveOrder } = useOrderStore();
  
  const cartTotal = getTotal();

  const handleCheckoutProcess = async () => {
    setIsProcessing(true);
    
    try {
      const payload = {
        user_id: 1,
        establishment_id: establishmentId,
        items: items.map((i) => ({ product_id: i.productId, quantity: i.quantity }))
      };

      const response = await fetch("http://localhost/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const isInvalid = !response.ok;
      if (isInvalid) throw new Error("Payment processing error");
      
      const newOrder = await response.json();

      setActiveOrder(newOrder);
      clearCart();
      
      toast({
        title: "Pedido confirmado!",
        description: "Seu pagamento foi processado com sucesso.",
        variant: "default"
      });
      
      navigate("/na-praia/lanchonete");
    } catch (error) {
      toast({
        title: "Erro no Pagamento",
        description: "Não foi possível concluir o pedido. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto min-h-screen max-w-[720px] overflow-hidden bg-black flex flex-col">
        <section className="relative flex-1 overflow-y-auto bg-[linear-gradient(180deg,#1A3974_0%,#164F82_44%,#071D3D_72%,#020202_100%)] pb-[120px] pt-[clamp(28px,6.4vw,46px)]">
          <div className="pointer-events-none absolute left-[-20%] top-[10%] h-[clamp(220px,48vw,346px)] w-[clamp(220px,48vw,346px)] rounded-full bg-[#f4a0cd]/20 blur-3xl" />
          <div className="pointer-events-none absolute right-[-10%] top-[40%] h-[clamp(180px,38vw,274px)] w-[clamp(180px,38vw,274px)] rounded-full bg-[#823612]/30 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[64%] bg-gradient-to-t from-black from-[20%] via-black/90 via-[72%] to-transparent" />

          <div className="px-[clamp(20px,5.4vw,39px)] relative z-10">
            <header className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                aria-label="Back"
                className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(52px,10.8vw,78px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur"
              >
                <ArrowLeft size={18} strokeWidth={3} />
              </button>
            </header>

            <div className="mt-[clamp(34px,8vw,58px)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                Checkout
              </p>
              <h1 className="mt-2 text-[clamp(30px,7.2vw,48px)] font-black leading-none">
                Confirmação do Pedido
              </h1>
            </div>

            <div className="mt-8 space-y-8">
              <section>
                <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white/70">
                  Forma de Pagamento
                </h2>
                <div className="space-y-3">
                  <PaymentMethod
                    id="credit"
                    title="Cartão de Crédito"
                    description="Final 4929"
                    icon={<CreditCard size={20} strokeWidth={2.5} />}
                    selected={paymentSelected === "credit"}
                    onSelect={setPaymentSelected}
                  />
                  <PaymentMethod
                    id="debit"
                    title="Cartão de Débito"
                    description="Redireciona para autenticação"
                    icon={<Wallet size={20} strokeWidth={2.5} />}
                    selected={paymentSelected === "debit"}
                    onSelect={setPaymentSelected}
                  />
                  <PaymentMethod
                    id="pix"
                    title="PIX"
                    description="Aprovação instantânea"
                    icon={<Landmark size={20} strokeWidth={2.5} />}
                    selected={paymentSelected === "pix"}
                    onSelect={setPaymentSelected}
                  />
                </div>
              </section>

              <section>
                <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white/70">
                  Local de Retirada
                </h2>
                <div className="flex items-center gap-4 rounded-[16px] bg-[#F8F8F8] p-4 text-neutral-900 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-neutral-200">
                    <MapPin size={20} className="text-neutral-600" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-black leading-tight">Balcão de Entrega</span>
                    <span className="mt-1 text-[13px] font-medium text-neutral-500">
                      Na Praia Festival - Praça de Alimentação
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        <div className="fixed bottom-0 w-full max-w-[720px] rounded-t-[24px] bg-white p-[clamp(20px,5.4vw,39px)] shadow-[0_-20px_40px_rgba(0,0,0,0.1)] z-50">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[15px] font-bold text-neutral-500">Preço Total</span>
            <span className="text-3xl font-black text-neutral-900">{formatPrice(cartTotal)}</span>
          </div>
          <button
            type="button"
            onClick={handleCheckoutProcess}
            disabled={isProcessing || items.length === 0}
            className="flex h-[60px] w-full items-center justify-center gap-2 rounded-[16px] bg-neutral-950 text-[16px] font-bold tracking-wide text-white shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_20px_rgba(0,0,0,0.2)] active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isProcessing && <span className="animate-pulse">Processando...</span>}
            {!isProcessing && (
              <>
                <CheckCircle2 size={20} strokeWidth={2.5} />
                Finalizar Pagamento
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Checkout;