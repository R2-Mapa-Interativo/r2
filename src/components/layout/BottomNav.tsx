import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const HomeIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
    <defs>
      <mask id="home-door-cutout">
        <rect width="40" height="40" fill="white" />
        <path d="M15.4 33.5V23.2c0-2.5 2-4.5 4.6-4.5s4.6 2 4.6 4.5v10.3" fill="none" stroke="black" strokeWidth="4.2" strokeLinecap="round" />
      </mask>
    </defs>
    <path
      d="M6.2 34.4V17.5c0-1.4.7-2.7 1.9-3.5L17.7 6.9c1.4-1 3.2-1 4.6 0l9.6 7.1c1.2.9 1.9 2.2 1.9 3.6v16.8H6.2Z"
      fill="currentColor"
      mask="url(#home-door-cutout)"
    />
  </svg>
);

const SunburstIcon = ({ className }: IconProps) => {
  const rays = Array.from({ length: 30 }, (_, index) => {
    const angle = (index / 30) * Math.PI * 2;
    const inner = 5;
    const outer = index % 2 === 0 ? 68 : 58;
    const x1 = 160 + Math.cos(angle) * inner;
    const y1 = 160 + Math.sin(angle) * inner;
    const x2 = 160 + Math.cos(angle) * outer;
    const y2 = 160 + Math.sin(angle) * outer;

    return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });

  return (
    <svg className={className} viewBox="88 88 144 144" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="7">
      {rays}
    </svg>
  );
};

const WalletIcon = ({ className, strokeWidth = 2.8 }: IconProps) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}>
    <path d="M8 13.7c0-3.2 2.6-5.7 5.8-5.7h15.7c2.2 0 4 1.8 4 4v2.4" />
    <path d="M8 14.2h22.6c2.8 0 5.1 2.3 5.1 5.1v9.1c0 2.8-2.3 5.1-5.1 5.1H13.8C10.6 33.5 8 31 8 27.8V14.2Z" />
    <path d="M25.7 20.3h10v7.1h-10c-2 0-3.6-1.6-3.6-3.6s1.6-3.5 3.6-3.5Z" />
    <path d="M26.6 23.9h3.3" />
  </svg>
);

const TicketIcon = ({ className, strokeWidth = 2.8 }: IconProps) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}>
    <path d="M8 14.4c2.5 0 4.5-2 4.5-4.4h15c0 2.4 2 4.4 4.5 4.4v11.2c-2.5 0-4.5 2-4.5 4.4h-15c0-2.4-2-4.4-4.5-4.4V14.4Z" />
    <path d="m20 15.5 1.5 2.9 3.2.5-2.3 2.2.5 3.2-2.9-1.5-2.9 1.5.5-3.2-2.3-2.2 3.2-.5L20 15.5Z" />
  </svg>
);

const ProfileIcon = ({ className, strokeWidth = 2.8 }: IconProps) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}>
    <circle cx="20" cy="11.8" r="7.2" />
    <path d="M10.5 33.4v-4.2c0-3.7 3-6.7 6.7-6.7h5.6c3.7 0 6.7 3 6.7 6.7v4.2H10.5Z" />
  </svg>
);

const items = [
  { label: "Home", icon: HomeIcon, to: "/", enabled: true },
  { label: "Na Praia", icon: SunburstIcon, to: "/na-praia", enabled: true },
  { label: "Carteira", icon: WalletIcon, to: "/carteira", enabled: false },
  { label: "Ingressos", icon: TicketIcon, to: "/ingressos", enabled: false },
  { label: "Perfil", icon: ProfileIcon, to: "/perfil", enabled: false },
];

const BottomNav = () => {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#4b4b4f] bg-[#111112]"
      aria-label="Navegação principal"
    >
      <ul className="mx-auto flex max-w-[720px] items-stretch justify-between px-3 pb-[calc(env(safe-area-inset-bottom)+clamp(12px,2.7vw,19px))] pt-[clamp(16px,3.9vw,28px)]">
        {items.map(({ label, icon: Icon, to, enabled }) => {
          const active = pathname === to;
          return (
            <li key={label} className="flex-1">
              {enabled ? (
                <NavLink
                  to={to}
                  className={cn(
                    "flex w-full flex-col items-center justify-center gap-2 text-[clamp(13px,3.1vw,22px)] font-medium leading-none transition-colors",
                    active ? "text-foreground" : "text-foreground/95 hover:text-foreground"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-[clamp(25px,5.4vw,39px)] w-[clamp(25px,5.4vw,39px)]" strokeWidth={active ? 3 : 2.5} />
                  <span>{label}</span>
                </NavLink>
              ) : (
                <button
                  type="button"
                  className="flex w-full flex-col items-center justify-center gap-2 text-[clamp(13px,3.1vw,22px)] font-medium leading-none text-foreground/95 transition-colors hover:text-foreground"
                >
                  <Icon className="h-[clamp(25px,5.4vw,39px)] w-[clamp(25px,5.4vw,39px)]" strokeWidth={2.5} />
                  <span>{label}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
