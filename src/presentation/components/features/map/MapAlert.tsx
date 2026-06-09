import { AlertTriangle } from "lucide-react";

interface MapAlertProps {
  show: boolean;
  original: string;
  newDest: string;
  onClose: () => void;
}

export const MapAlert = ({ show, original, newDest, onClose }: MapAlertProps) => {
  const isHidden = !show;
  if (isHidden) {
      return null;
  }

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[400px] animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="bg-yellow-500 text-black px-4 py-3 rounded-xl shadow-2xl flex items-start gap-3">
        <AlertTriangle className="shrink-0 mt-0.5" size={20} />
        <div>
          <p className="font-bold text-sm leading-tight">Atenção à Lotação</p>
          <p className="text-xs font-medium mt-1 opacity-90">
            O <strong>{original}</strong> atingiu a capacidade máxima. Rota recalculada para o <strong>{newDest}</strong> mais próximo.
          </p>
        </div>
        <button onClick={onClose} className="ml-auto opacity-70 hover:opacity-100 p-1">✕</button>
      </div>
    </div>
  );
};