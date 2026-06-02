import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Restaurant } from "@/domain/models/types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link
      to={`/na-praia/lanchonete/${restaurant.id}`}
      className="flex w-full flex-col overflow-hidden rounded-[18px] bg-[#F8F8F8] text-left text-neutral-950 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:-translate-y-1"
    >
      <div className={`relative h-[110px] w-full bg-gradient-to-br ${restaurant.color}`}>
        {restaurant.imageUrl && (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col p-4">
        <span className="truncate text-[15px] font-black leading-tight text-neutral-900">{restaurant.name}</span>
        <span className="mt-1 truncate text-[11px] font-medium text-neutral-500">{restaurant.category}</span>
        <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold text-neutral-700">
          <span className="inline-flex items-center gap-1 rounded-[6px] bg-neutral-200/80 px-2 py-1">
            <Clock size={12} />
            {restaurant.wait} min
          </span>
          <span className="inline-flex items-center gap-1 rounded-[6px] bg-neutral-200/80 px-2 py-1">
            <MapPin size={12} />
            {restaurant.distance}
          </span>
        </div>
      </div>
    </Link>
  );
};