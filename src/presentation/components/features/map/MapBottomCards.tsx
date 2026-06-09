import { Clock, MapPin, Store, Toilet } from "lucide-react";
import { Link } from "react-router-dom";

interface MapBottomCardsProps {
  bathroomSelected: boolean;
  activeBathroomName: string;
  selectedRestaurant: any | null;
  closestBathroomId: string;
  onSelectBathroom: (id: string) => void;
}

export const MapBottomCards = ({
  bathroomSelected,
  activeBathroomName,
  selectedRestaurant,
  closestBathroomId,
  onSelectBathroom
}: MapBottomCardsProps) => {
  const hasSelectedRestaurant = selectedRestaurant !== null;
  const noSelectedRestaurant = selectedRestaurant === null;

  return (
    <section className="relative z-10 mt-auto grid grid-cols-2 gap-[clamp(14px,3.2vw,23px)] pt-6">
      <button
        type="button"
        onClick={() => onSelectBathroom(closestBathroomId)}
        className={`flex h-[clamp(92px,18vw,130px)] flex-col justify-between rounded-[12px] bg-[#F8F8F8] p-[clamp(15px,3vw,22px)] text-left text-neutral-950 shadow-lg transition-transform hover:scale-[0.99] ${
          bathroomSelected ? "ring-2 ring-[#f4f36f]" : ""
        }`}
      >
        <Toilet className="h-[clamp(20px,4.3vw,28px)] w-[clamp(20px,4.3vw,28px)] text-neutral-800" strokeWidth={2.6} />
        <span className="space-y-1">
          <span className="block text-[clamp(13px,2.7vw,18px)] font-black leading-tight">
            {bathroomSelected ? activeBathroomName : "Banheiro"}
          </span>
          {bathroomSelected && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-600">
              <MapPin size={11} />
              Rota Ativa
            </span>
          )}
        </span>
      </button>

      {hasSelectedRestaurant && (
        <Link
          to={`/na-praia/menu/${selectedRestaurant.id}`}
          className="flex h-[clamp(92px,18vw,130px)] flex-col justify-between rounded-[12px] bg-[#F8F8F8] p-[clamp(15px,3vw,22px)] text-left text-neutral-950 shadow-lg transition-transform hover:scale-[0.99] ring-2 ring-[#f4f36f]"
        >
          <Store className="h-[clamp(20px,4.3vw,28px)] w-[clamp(20px,4.3vw,28px)] text-neutral-800" strokeWidth={2.6} />
          <span className="space-y-1">
            <span className="block text-[clamp(13px,2.7vw,18px)] font-black leading-tight">
              {selectedRestaurant.name || selectedRestaurant.id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className="flex flex-wrap gap-2 text-[11px] font-bold text-neutral-600">
              <span className="inline-flex items-center gap-1"><Clock size={11} />15 min</span>
            </span>
          </span>
        </Link>
      )}

      {noSelectedRestaurant && (
        <button
          type="button"
          disabled
          className="flex h-[clamp(92px,18vw,130px)] flex-col justify-between rounded-[12px] bg-[#F8F8F8] p-[clamp(15px,3vw,22px)] text-left text-neutral-950 opacity-60 shadow-lg"
        >
          <Store className="h-[clamp(20px,4.3vw,28px)] w-[clamp(20px,4.3vw,28px)] text-neutral-800" strokeWidth={2.6} />
          <span className="text-[clamp(13px,2.7vw,18px)] font-black leading-tight">Restaurante</span>
        </button>
      )}
    </section>
  );
};