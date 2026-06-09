import { ArrowLeft, LocateFixed, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MapHeaderProps {
  onLocate: () => void;
}

export const MapHeader = ({ onLocate }: MapHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="relative z-10 flex items-center justify-between">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(52px,10.8vw,78px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur"
      >
        <ArrowLeft size={18} strokeWidth={3} />
      </button>
      <div className="flex items-center gap-[clamp(8px,2vw,14px)]">
        <button type="button" className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(46px,9.6vw,70px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur">
          <Search size={17} strokeWidth={3} />
        </button>
        <button
          type="button"
          onClick={onLocate}
          className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(58px,12.2vw,88px)] items-center justify-center rounded-[18px] bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/30"
        >
          <LocateFixed size={18} strokeWidth={3} />
        </button>
      </div>
    </header>
  );
};