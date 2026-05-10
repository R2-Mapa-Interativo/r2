interface HomeHeaderProps {
  userName: string;
}

const BagIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.3 16.2h15.4c2 0 3.7 1.6 3.9 3.6l.8 9.2c.3 3-2.1 5.6-5.1 5.6H12.7c-3 0-5.4-2.6-5.1-5.6l.8-9.2c.2-2 1.9-3.6 3.9-3.6Z" strokeWidth="3" />
    <path d="M14.5 16.2v-2.5a5.5 5.5 0 0 1 11 0v2.5" strokeWidth="3" />
    <path d="M16.2 24.1h.1M23.7 24.1h.1" strokeWidth="3.4" />
  </svg>
);

const HomeHeader = ({ userName }: HomeHeaderProps) => {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-[clamp(20px,3.9vw,28px)] font-extrabold leading-none tracking-[0.01em] text-foreground">
          OI, {userName.toUpperCase()} <span aria-hidden>👋</span>
        </h1>
        <p className="mt-[clamp(10px,2.8vw,20px)] text-[clamp(15px,3.1vw,22px)] font-medium leading-none text-muted-foreground">
          Viva o melhor da R2
        </p>
      </div>
      <button
        type="button"
        aria-label="Sacola"
        className="flex h-[clamp(54px,10.5vw,76px)] w-[clamp(54px,10.5vw,76px)] shrink-0 items-center justify-center rounded-full bg-[#1f1f21] text-foreground shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] transition-colors hover:bg-accent"
      >
        <BagIcon className="h-[clamp(24px,4.7vw,34px)] w-[clamp(24px,4.7vw,34px)]" />
      </button>
    </header>
  );
};

export default HomeHeader;
