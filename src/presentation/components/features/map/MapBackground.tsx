export const MapBackground = () => {
  return (
    <>
      <div className="pointer-events-none absolute left-[-24%] top-[10%] h-[clamp(150px,32vw,230px)] w-[clamp(340px,78vw,562px)] rotate-[-18deg] rounded-full bg-[#02023c]" />
      <div className="pointer-events-none absolute right-[-18%] top-[18%] h-[clamp(160px,35vw,252px)] w-[clamp(160px,35vw,252px)] rounded-full bg-[#f4f36f]" />
      <div className="pointer-events-none absolute left-[8%] top-[38%] h-[clamp(118px,24vw,173px)] w-[clamp(118px,24vw,173px)] rounded-full bg-[#db98c5]" />
      <div className="pointer-events-none absolute right-[-12%] bottom-[24%] h-[clamp(150px,32vw,230px)] w-[clamp(280px,66vw,475px)] rotate-[12deg] rounded-full bg-[#823612]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black from-[50%] via-black/90 via-[72%] to-transparent" />
    </>
  );
};