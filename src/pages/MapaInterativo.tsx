import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Clock, LocateFixed, MapPin, Navigation, Search, Store, Toilet } from "lucide-react";
import { restaurants } from "@/data/restaurants";

const restaurantPins = [
  { id: "boteco", className: "right-[22%] top-[38%]" },
  { id: "pizzaria", className: "left-[23%] top-[26%]" },
  { id: "acai", className: "right-[18%] bottom-[24%]" },
  { id: "burger", className: "left-[38%] bottom-[16%]" },
];

const nearestBathroom = {
  distance: "35 m",
};

const MapaInterativo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRestaurantId = searchParams.get("restaurant");
  const initialRestaurant = restaurants.some((restaurant) => restaurant.id === initialRestaurantId)
    ? initialRestaurantId
    : null;
  const [bathroomSelected, setBathroomSelected] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(initialRestaurant);

  const selectedRestaurant = restaurants.find((restaurant) => restaurant.id === selectedRestaurantId);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto min-h-screen max-w-[720px] overflow-hidden bg-black">
        <section className="relative flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,#15346F_0%,#2767A1_42%,#0E315E_70%,#020202_100%)] px-[clamp(20px,5.4vw,39px)] pb-[clamp(30px,7vw,50px)] pt-[clamp(28px,6.4vw,46px)]">
          <div className="pointer-events-none absolute left-[-24%] top-[10%] h-[clamp(150px,32vw,230px)] w-[clamp(340px,78vw,562px)] rotate-[-18deg] rounded-full bg-[#02023c]" />
          <div className="pointer-events-none absolute right-[-18%] top-[18%] h-[clamp(160px,35vw,252px)] w-[clamp(160px,35vw,252px)] rounded-full bg-[#f4f36f]" />
          <div className="pointer-events-none absolute left-[8%] top-[38%] h-[clamp(118px,24vw,173px)] w-[clamp(118px,24vw,173px)] rounded-full bg-[#db98c5]" />
          <div className="pointer-events-none absolute right-[-12%] bottom-[24%] h-[clamp(150px,32vw,230px)] w-[clamp(280px,66vw,475px)] rotate-[12deg] rounded-full bg-[#823612]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black from-[50%] via-black/90 via-[72%] to-transparent" />

          <header className="relative z-10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Voltar"
              className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(52px,10.8vw,78px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur"
            >
              <ArrowLeft size={18} strokeWidth={3} />
            </button>

            <div className="flex items-center gap-[clamp(8px,2vw,14px)]">
              <button
                type="button"
                aria-label="Pesquisar no mapa"
                className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(46px,9.6vw,70px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur"
              >
                <Search size={17} strokeWidth={3} />
              </button>
              <button
                type="button"
                aria-label="Minha localização"
                className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(58px,12.2vw,88px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur"
              >
                <LocateFixed size={18} strokeWidth={3} />
              </button>
            </div>
          </header>

          <section className="relative z-10 mt-[clamp(34px,8vw,58px)]">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
                  Na Praia
                </p>
                <h1 className="mt-2 text-[clamp(30px,7.2vw,52px)] font-black leading-none">
                  Mapa Interativo
                </h1>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#f4f36f] text-[#061862] shadow-lg">
                <span className="text-sm font-black tracking-[-0.04em]">R2</span>
              </div>
            </div>
          </section>

          <section className="relative z-10 mt-7 overflow-hidden rounded-[18px] bg-[#F8F8F8] p-3 text-neutral-950 shadow-2xl" aria-label="Mapa do evento">
            <div className="relative h-[clamp(420px,92vw,662px)] overflow-hidden rounded-[14px] bg-[#d8d1c3]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(39,103,161,0.2),transparent_34%),linear-gradient(25deg,#bfc6a4_0_22%,#e8dfcf_22%_35%,#8ab0c8_35%_48%,#d7c0d4_48%_62%,#b9c780_62%_78%,#f0eadf_78%_100%)]" />
              <div className="absolute left-[8%] top-[14%] h-[18%] w-[44%] rotate-[-14deg] rounded-[999px] bg-[#061862]/90" />
              <div className="absolute right-[8%] top-[12%] h-[28%] w-[28%] rounded-full bg-[#823612]/90" />
              <div className="absolute left-[13%] top-[46%] h-[18%] w-[22%] rounded-full bg-white/90" />
              <div className="absolute left-[34%] top-[47%] h-[16%] w-[54%] bg-[#db98c5]/95" />
              <div className="absolute bottom-[16%] left-[30%] h-[8%] w-[34%] rounded-[6px] bg-black/65" />

              <div className="absolute left-[48%] top-[58%] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f4f36f] text-[#061862] shadow-lg ring-4 ring-white/80">
                <Navigation size={17} strokeWidth={3} />
              </div>

              {restaurantPins.map((pin) => {
                const restaurant = restaurants.find((item) => item.id === pin.id) ?? restaurants[0];
                const active = restaurant.id === selectedRestaurant?.id;

                return (
                  <button
                    key={restaurant.id}
                    type="button"
                    onClick={() => {
                      setSelectedRestaurantId(restaurant.id);
                      setBathroomSelected(false);
                    }}
                    aria-label={`Selecionar ${restaurant.name}`}
                    className={`absolute ${pin.className} flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#823612] shadow-lg transition-transform hover:scale-105 ${
                      active ? "ring-4 ring-[#f4f36f]" : ""
                    }`}
                  >
                    <Store size={15} strokeWidth={3} />
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setBathroomSelected(true);
                  setSelectedRestaurantId(null);
                }}
                aria-label="Selecionar banheiro mais próximo"
                className={`absolute left-[18%] bottom-[18%] flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#061862] shadow-lg transition-transform hover:scale-105 ${
                  bathroomSelected ? "ring-4 ring-[#f4f36f]" : ""
                }`}
              >
                <Toilet size={15} strokeWidth={3} />
              </button>

              {bathroomSelected ? (
                <div className="absolute left-[18%] bottom-[calc(18%+42px)] -translate-x-1/2 rounded-[10px] bg-white px-3 py-2 text-xs font-semibold text-[#061862] shadow-lg">
                  {nearestBathroom.distance}
                </div>
              ) : null}
            </div>
          </section>

          <section className="relative z-10 mt-auto grid grid-cols-2 gap-[clamp(14px,3.2vw,23px)] pt-6">
            <button
              type="button"
              onClick={() => {
                setBathroomSelected(true);
                setSelectedRestaurantId(null);
              }}
              className={`flex h-[clamp(92px,18vw,130px)] flex-col justify-between rounded-[12px] bg-[#F8F8F8] p-[clamp(15px,3vw,22px)] text-left text-neutral-950 shadow-lg transition-transform hover:scale-[0.99] ${
                bathroomSelected ? "ring-2 ring-[#f4f36f]" : ""
              }`}
            >
              <Toilet className="h-[clamp(20px,4.3vw,28px)] w-[clamp(20px,4.3vw,28px)] text-neutral-800" strokeWidth={2.6} />
              <span className="space-y-1">
                <span className="block text-[clamp(13px,2.7vw,18px)] font-normal leading-tight">
                  Banheiro
                </span>
                {bathroomSelected ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-neutral-600">
                    <MapPin size={11} />
                    {nearestBathroom.distance}
                  </span>
                ) : null}
              </span>
            </button>

            {selectedRestaurant ? (
              <Link
                to={`/na-praia/lanchonete/${selectedRestaurant.id}`}
                className="flex h-[clamp(92px,18vw,130px)] flex-col justify-between rounded-[12px] bg-[#F8F8F8] p-[clamp(15px,3vw,22px)] text-left text-neutral-950 shadow-lg transition-transform hover:scale-[0.99] ring-2 ring-[#f4f36f]"
              >
                <Store className="h-[clamp(20px,4.3vw,28px)] w-[clamp(20px,4.3vw,28px)] text-neutral-800" strokeWidth={2.6} />
                <span className="space-y-1">
                  <span className="block text-[clamp(13px,2.7vw,18px)] font-normal leading-tight">
                    {selectedRestaurant.name}
                  </span>
                  <span className="flex flex-wrap gap-2 text-[11px] text-neutral-600">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} />
                      {selectedRestaurant.wait} min
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={11} />
                      {selectedRestaurant.distance}
                    </span>
                  </span>
                </span>
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="flex h-[clamp(92px,18vw,130px)] flex-col justify-between rounded-[12px] bg-[#F8F8F8] p-[clamp(15px,3vw,22px)] text-left text-neutral-950 opacity-60 shadow-lg"
              >
                <Store className="h-[clamp(20px,4.3vw,28px)] w-[clamp(20px,4.3vw,28px)] text-neutral-800" strokeWidth={2.6} />
                <span className="text-[clamp(13px,2.7vw,18px)] font-normal leading-tight">
                  Restaurante
                </span>
              </button>
            )}
          </section>
        </section>
      </div>
    </main>
  );
};

export default MapaInterativo;
