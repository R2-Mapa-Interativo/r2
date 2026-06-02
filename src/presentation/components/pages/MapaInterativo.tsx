import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Clock, LocateFixed, MapPin, Navigation, Search, Store, Toilet } from "lucide-react";
import { restaurants } from "@/infrastructure/mocs/restaurantsData";
import { mapEdges, mapNodes } from "@/infrastructure/mocs/mapGraphData";
import { calculateDijkstra } from "@/domain/usecases/calculateRoute";
import { GraphNode } from "@/domain/models/types";
import plantaImg from "@/assets/planta-na-praia.png";

const nearestBathroom = {
  distance: "35 m",
};

const MapaInterativo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRestaurantId = searchParams.get("restaurant");
  
  const validInitial = restaurants.some((restaurant) => restaurant.id === initialRestaurantId);
  const startTarget = validInitial ? initialRestaurantId : null;

  const [bathroomSelected, setBathroomSelected] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(startTarget);
  const [route, setRoute] = useState<GraphNode[]>([]);

  const selectedRestaurant = useMemo(() => {
    return restaurants.find((restaurant) => restaurant.id === selectedRestaurantId) || null;
  }, [selectedRestaurantId]);

  useEffect(() => {
    const isReadyForRestaurant = !bathroomSelected && selectedRestaurantId;
    isReadyForRestaurant && setRoute(calculateDijkstra(mapNodes, mapEdges, "current", selectedRestaurantId));

    bathroomSelected && setRoute(calculateDijkstra(mapNodes, mapEdges, "current", "banheiro"));
    
    const isEmpty = !bathroomSelected && !selectedRestaurantId;
    isEmpty && setRoute([]);
  }, [selectedRestaurantId, bathroomSelected]);

  const getNodeStyle = (id: string) => {
    const node = mapNodes.find(n => n.id === id);
    return node ? { left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' } : { display: 'none' };
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const logString = `{ id: "novo_ponto", x: ${x.toFixed(1)}, y: ${y.toFixed(1)} }`;
    console.log(logString);
    alert(`Coordenada gerada no console!\nX: ${x.toFixed(1)}% | Y: ${y.toFixed(1)}%`);
  };

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
                onClick={() => {
                  setBathroomSelected(false);
                  setSelectedRestaurantId(null);
                }}
                aria-label="Minha localização"
                className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(58px,12.2vw,88px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
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
            <div 
              className="relative w-full overflow-hidden rounded-[14px] bg-white cursor-crosshair"
              style={{ aspectRatio: '4/3' }}
              onClick={handleMapClick}
            >
              <img 
                src={plantaImg} 
                alt="Planta do Na Praia" 
                className="absolute inset-0 h-full w-full object-fill opacity-90"
              />

              <svg className="absolute inset-0 z-10 pointer-events-none h-full w-full">
                {route.map((node, i) => {
                  const isLast = i === route.length - 1;
                  if (isLast) return null;
                  const next = route[i + 1];
                  return (
                    <line
                      key={`${node.id}-${next.id}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${next.x}%`}
                      y2={`${next.y}%`}
                      stroke="#059669"
                      strokeWidth="5"
                      strokeDasharray="8 6"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                  );
                })}
              </svg>

              <div 
                className="absolute z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f36f] text-[#061862] shadow-lg ring-4 ring-white/80 transition-all duration-300"
                style={getNodeStyle('current')}
              >
                <Navigation size={18} strokeWidth={3} />
              </div>

              {restaurants.map((restaurant) => {
                const active = restaurant.id === selectedRestaurant?.id;
                
                return (
                  <button
                    key={restaurant.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRestaurantId(restaurant.id);
                      setBathroomSelected(false);
                    }}
                    aria-label={`Selecionar ${restaurant.name}`}
                    className={`absolute z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#823612] shadow-lg transition-transform hover:scale-105 ${
                      active ? "ring-4 ring-[#f4f36f] scale-110" : ""
                    }`}
                    style={getNodeStyle(restaurant.id)}
                  >
                    <Store size={16} strokeWidth={3} />
                  </button>
                );
              })}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setBathroomSelected(true);
                  setSelectedRestaurantId(null);
                }}
                aria-label="Selecionar banheiro mais próximo"
                className={`absolute z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#061862] shadow-lg transition-transform hover:scale-105 ${
                  bathroomSelected ? "ring-4 ring-[#f4f36f] scale-110" : ""
                }`}
                style={getNodeStyle('banheiro')}
              >
                <Toilet size={16} strokeWidth={3} />
              </button>

              {bathroomSelected && (
                <div 
                  className="absolute z-30 rounded-[10px] bg-white px-3 py-2 text-xs font-black text-[#061862] shadow-lg"
                  style={{ ...getNodeStyle('banheiro'), marginTop: '-42px' }}
                >
                  {nearestBathroom.distance}
                </div>
              )}
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
                <span className="block text-[clamp(13px,2.7vw,18px)] font-black leading-tight">
                  Banheiro
                </span>
                {bathroomSelected && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-600">
                    <MapPin size={11} />
                    {nearestBathroom.distance}
                  </span>
                )}
              </span>
            </button>

            {selectedRestaurant ? (
              <Link
                to={`/na-praia/lanchonete/${selectedRestaurant.id}`}
                className="flex h-[clamp(92px,18vw,130px)] flex-col justify-between rounded-[12px] bg-[#F8F8F8] p-[clamp(15px,3vw,22px)] text-left text-neutral-950 shadow-lg transition-transform hover:scale-[0.99] ring-2 ring-[#f4f36f]"
              >
                <Store className="h-[clamp(20px,4.3vw,28px)] w-[clamp(20px,4.3vw,28px)] text-neutral-800" strokeWidth={2.6} />
                <span className="space-y-1">
                  <span className="block text-[clamp(13px,2.7vw,18px)] font-black leading-tight">
                    {selectedRestaurant.name}
                  </span>
                  <span className="flex flex-wrap gap-2 text-[11px] font-bold text-neutral-600">
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
                <span className="text-[clamp(13px,2.7vw,18px)] font-black leading-tight">
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