import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Bell, Clock, Map, MapPin, Plus, ShoppingCart, X } from "lucide-react";
import { restaurants } from "@/data/restaurants";

const Cardapio = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const restaurant = restaurants.find((item) => item.id === restaurantId);
  const [openPanel, setOpenPanel] = useState<"cart" | "notification" | null>(null);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  if (!restaurant) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="text-center">
          <p className="text-lg font-semibold">Restaurante não encontrado</p>
          <Link to="/na-praia/lanchonete" className="mt-4 inline-flex rounded-[12px] bg-white px-4 py-2 text-sm text-black">
            Voltar para lanchonete
          </Link>
        </div>
      </main>
    );
  }

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
                className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(46px,9.6vw,70px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur"
              >
                <Bell size={17} strokeWidth={3} />
              </button>
              <button
                type="button"
                onClick={() => setOpenPanel("cart")}
                aria-label="Carrinho"
                className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(58px,12.2vw,88px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur"
              >
                <ShoppingCart size={18} strokeWidth={3} />
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
              <div className="flex flex-wrap gap-2 text-xs text-white/85">
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
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-white/15 text-white backdrop-blur"
              >
                <Map size={16} strokeWidth={3} />
              </Link>
            </div>
          </section>

          <section className="relative z-10 mt-8 space-y-3" aria-label="Itens do cardápio">
            {restaurant.menu.map((item) => (
              <article key={item.name} className="flex items-center gap-4 rounded-[14px] bg-[#F8F8F8] p-4 text-neutral-950 shadow-lg">
                <div className={`h-16 w-16 shrink-0 rounded-[12px] bg-gradient-to-br ${restaurant.color}`} />
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold">{item.name}</h2>
                  <p className="mt-1 text-xs leading-5 text-neutral-600">{item.description}</p>
                  <p className="mt-2 text-sm font-semibold">{item.price}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLastAddedItem(item.name);
                    setOpenPanel("cart");
                  }}
                  aria-label="Adicionar ao carrinho"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-neutral-100"
                >
                  <Plus size={17} strokeWidth={3} />
                </button>
              </article>
            ))}
          </section>

          {openPanel && (
            <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 px-4 pb-4 backdrop-blur-sm">
              <section className="w-full max-w-[680px] rounded-[18px] bg-[#F8F8F8] p-5 text-neutral-950 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                      {openPanel === "cart" ? "Carrinho" : "Notificação"}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">
                      {openPanel === "cart" ? "Pedido em andamento" : "Avisos ativados"}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenPanel(null)}
                    aria-label="Fechar"
                    className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-neutral-100"
                  >
                    <X size={17} strokeWidth={3} />
                  </button>
                </div>

                {openPanel === "cart" ? (
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between rounded-[12px] bg-white p-3">
                      <span className="text-sm">{lastAddedItem ?? restaurant.menu[0].name}</span>
                      <span className="text-sm font-semibold">1 item</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenPanel(null)}
                      className="h-11 w-full rounded-[12px] bg-neutral-950 text-sm font-medium text-white"
                    >
                      Finalizar pedido
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 rounded-[12px] bg-white p-4 text-sm leading-6 text-neutral-700">
                    O pedido de {restaurant.name} está pronto para retirada.
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
