export const MapTitle = () => {
  return (
    <section className="relative z-10 mt-[clamp(34px,8vw,58px)]">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/65">Na Praia</p>
          <h1 className="mt-2 text-[clamp(30px,7.2vw,52px)] font-black leading-none">Mapa Interativo</h1>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#f4f36f] text-[#061862] shadow-lg">
          <span className="text-sm font-black tracking-[-0.04em]">R2</span>
        </div>
      </div>
    </section>
  );
};