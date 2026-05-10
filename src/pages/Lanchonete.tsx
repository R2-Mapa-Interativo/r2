import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, Search, ShoppingCart, X } from "lucide-react";
import { restaurants } from "@/data/restaurants";

const Lanchonete = () => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const filteredRestaurants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return restaurants;
    }

    return restaurants.filter((restaurant) =>
      [restaurant.name, restaurant.category].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [query]);

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

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Carrinho"
              className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(58px,12.2vw,88px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur"
            >
              <ShoppingCart size={18} strokeWidth={3} />
            </button>
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

          <section className="relative z-10 mt-7 space-y-3" aria-label="Restaurantes">
            {filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/na-praia/lanchonete/${restaurant.id}`}
                className="flex w-full items-center gap-3 rounded-[14px] bg-[#F8F8F8] p-3 text-left text-neutral-950 shadow-lg transition-transform hover:scale-[0.99]"
              >
                <span className={`h-14 w-14 shrink-0 rounded-[12px] bg-gradient-to-br ${restaurant.color}`} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{restaurant.name}</span>
                  <span className="mt-1 block truncate text-xs text-neutral-600">{restaurant.category}</span>
                  <span className="mt-2 flex flex-wrap gap-2 text-[11px] text-neutral-700">
                    <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">
                      <Clock size={12} />
                      {restaurant.wait} min
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">
                      <MapPin size={12} />
                      {restaurant.distance}
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </section>

          {cartOpen && (
            <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 px-4 pb-4 backdrop-blur-sm">
              <section className="w-full max-w-[680px] rounded-[18px] bg-[#F8F8F8] p-5 text-neutral-950 shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                      Carrinho
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">Seu pedido</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    aria-label="Fechar"
                    className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-neutral-100"
                  >
                    <X size={17} strokeWidth={3} />
                  </button>
                </div>
                <div className="mt-5 rounded-[12px] bg-white p-4 text-sm leading-6 text-neutral-700">
                  Os itens adicionados apareceriam aqui, com quantidade, subtotal e botão para finalizar.
                </div>
              </section>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Lanchonete;
