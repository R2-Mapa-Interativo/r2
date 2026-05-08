import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Map, Mic, Share2, ShoppingCart, Ticket, Utensils } from "lucide-react";

const NA_PRAIA_BLUE = "#061862";

const actionCards = [
  { label: "Lanchonete", icon: Utensils, to: "/na-praia/lanchonete" },
  { label: "Mapa Interativo", icon: Map, to: "/na-praia/mapa" },
  { label: "Comprar Ingresso", icon: Ticket, to: null },
  { label: "Horários", icon: Mic, to: null },
];

const cardClass =
  "flex h-[clamp(88px,17vw,120px)] flex-col justify-between rounded-[12px] bg-[#F8F8F8] p-[clamp(15px,3vw,22px)] text-left text-neutral-950 shadow-lg transition-transform hover:scale-[0.99]";

const FestivalLogo = () => {
  const rays = Array.from({ length: 30 }, (_, index) => {
    const angle = (index / 30) * Math.PI * 2;
    const inner = 5;
    const outer = index % 2 === 0 ? 68 : 58;
    const x1 = 160 + Math.cos(angle) * inner;
    const y1 = 160 + Math.sin(angle) * inner;
    const x2 = 160 + Math.cos(angle) * outer;
    const y2 = 160 + Math.sin(angle) * outer;

    return (
      <line
        key={index}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={NA_PRAIA_BLUE}
        strokeLinecap="round"
        strokeWidth="7"
      />
    );
  });

  return (
    <svg viewBox="0 0 320 320" className="h-[85%] w-[85%]" aria-label="Na Praia Festival">
      <defs>
        <path id="na-praia-top" d="M 39 160 A 121 121 0 0 1 281 160" />
        <path id="na-praia-bottom" d="M 281 160 A 121 121 0 0 1 39 160" />
      </defs>

      <text className="fill-[#061862] text-[29px] font-black uppercase tracking-[0.09em]">
        <textPath href="#na-praia-top" startOffset="50%" textAnchor="middle">
          NA PRAIA FESTIVAL
        </textPath>
      </text>
      <text className="fill-[#061862] text-[29px] font-black uppercase tracking-[0.09em]">
        <textPath href="#na-praia-bottom" startOffset="50%" textAnchor="middle">
          NA PRAIA FESTIVAL
        </textPath>
      </text>
      <text x="39" y="170" className="fill-[#061862] text-[28px] font-black" textAnchor="middle">
        •
      </text>
      <text x="281" y="170" className="fill-[#061862] text-[28px] font-black" textAnchor="middle">
        •
      </text>
      {rays}
    </svg>
  );
};

const NaPraia = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto min-h-screen max-w-[720px] overflow-hidden bg-black">
        <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#173B76_0%,#214E95_45%,#0B2A66_72%,#020202_100%)]">
          <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(14px,4.8vw,34px)] pt-[clamp(28px,6.4vw,46px)]">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Voltar"
              className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(52px,10.8vw,78px)] items-center justify-center rounded-[18px] bg-[#6078A7]/80 text-white backdrop-blur"
            >
              <ArrowLeft size={18} strokeWidth={3} />
            </button>

            <div className="flex gap-[clamp(8px,2vw,14px)]">
              <button
                type="button"
                aria-label="Compartilhar"
                className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(46px,9.6vw,70px)] items-center justify-center rounded-[18px] bg-[#6078A7]/80 text-white backdrop-blur"
              >
                <Share2 size={17} strokeWidth={3} />
              </button>
              <button
                type="button"
                aria-label="Carrinho"
                className="flex h-[clamp(36px,7.6vw,55px)] w-[clamp(58px,12.2vw,88px)] items-center justify-center rounded-[18px] bg-[#6078A7]/80 text-white backdrop-blur"
              >
                <ShoppingCart size={18} strokeWidth={3} />
              </button>
            </div>
          </header>

          <div className="absolute left-[-25%] top-[10%] aspect-square w-[clamp(158px,34vw,245px)] rotate-45 scale-x-[1.55] bg-[#02023c]" />
          <div className="absolute right-[-2%] top-[10%] h-[clamp(158px,34vw,245px)] w-[clamp(158px,34vw,245px)] rounded-full bg-[#823612]" />
          <div className="absolute left-[-12%] top-[46%] aspect-square h-[clamp(142px,27vw,194px)] -translate-y-1/2 rounded-full bg-[#f0eadf]" />
          <div className="absolute left-[17%] right-0 top-[46%] h-[clamp(142px,27vw,194px)] -translate-y-1/2 bg-[#db98c5]" />
          <div className="absolute bottom-[5%] left-[5%] h-[clamp(62px,13vw,94px)] w-[clamp(14px,3.2vw,23px)] [clip-path:polygon(50%_0,100%_100%,0_100%)] bg-[#5a2b28]" />
          <div className="absolute bottom-[5%] left-[28%] h-[clamp(22px,4.8vw,34px)] w-[clamp(132px,34vw,245px)] bg-gradient-to-b from-[#565244] to-[#171715]" />
          <div className="absolute bottom-[4%] right-[-2%] h-[clamp(58px,13vw,94px)] w-[clamp(126px,35vw,252px)] bg-[#020018]" />

          <div className="absolute left-1/2 top-[46%] z-20 flex aspect-square w-[clamp(300px,69vw,498px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-b from-[#f4f36f] via-[#eceb4a] to-[#7f7b2b] shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
            <FestivalLogo />
          </div>

          <div className="absolute inset-x-0 bottom-0 z-30 h-[56%] bg-gradient-to-t from-black from-[54%] via-black/92 via-[70%] to-transparent" />

          <section className="absolute bottom-[clamp(24px,5.4vw,39px)] left-0 right-0 z-40 px-[clamp(28px,5.4vw,39px)]">
            <div className="mb-[clamp(22px,4.4vw,32px)] h-px bg-white/25" />

            <div className="grid grid-cols-2 gap-[clamp(14px,3.2vw,23px)]">
              {actionCards.map(({ label, icon: Icon, to }) => {
                const content = (
                  <>
                    <Icon className="h-[clamp(20px,4.3vw,28px)] w-[clamp(20px,4.3vw,28px)] shrink-0 text-neutral-800" strokeWidth={2.6} />
                    <span className="text-[clamp(13px,2.7vw,18px)] font-normal leading-tight text-black">
                      {label}
                    </span>
                  </>
                );

                return to ? (
                  <Link key={label} to={to} className={cardClass}>
                    {content}
                  </Link>
                ) : (
                  <button key={label} type="button" className={cardClass}>
                    {content}
                  </button>
                );
              })}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default NaPraia;
