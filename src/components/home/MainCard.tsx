import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const MainCard = () => {
  return (
    <article
      className="relative flex min-h-[clamp(520px,113.8vw,820px)] flex-col justify-end overflow-hidden rounded-[22px] border border-[#242429] p-[clamp(20px,5.5vw,40px)]"
      aria-label="Vendas abertas"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(5,5,8,0.05) 0%, rgba(5,5,8,0.16) 43%, rgba(0,0,0,0.9) 78%, #030303 100%), linear-gradient(135deg, #070b3d 0%, #1117a4 28%, #f2eb00 28%, #f2eb00 44%, #090a2a 44%, #f7a7d6 74%, #111 100%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_28%_34%,rgba(86,125,255,0.35),transparent_30%),radial-gradient(circle_at_77%_35%,rgba(244,140,200,0.32),transparent_24%)]" />
      <div className="absolute left-[clamp(20px,5.5vw,40px)] top-[clamp(70px,15.5vw,112px)] h-[clamp(178px,40vw,288px)] w-[clamp(108px,24.4vw,176px)] rounded-t-sm bg-[#adadff]/80" />
      <div className="absolute left-[clamp(20px,5.5vw,40px)] top-[clamp(196px,43vw,310px)] h-[clamp(108px,24.4vw,176px)] w-[clamp(108px,24.4vw,176px)] rounded-br-full bg-[#7579bb]/75" />
      <div className="absolute right-[clamp(20px,5.5vw,40px)] top-[clamp(70px,15.5vw,112px)] h-[clamp(240px,53.3vw,384px)] w-[clamp(100px,22.2vw,160px)] bg-[#f4a0cd]/90" />
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <div className="relative z-10 space-y-[clamp(18px,4.4vw,32px)] text-center">
        <h2 className="font-display text-[clamp(52px,11.9vw,86px)] leading-[0.83] text-[#fff8ed]">
          VENDAS
          <br />
          ABERTAS
        </h2>
        <p className="-mx-3 text-[clamp(12px,3vw,21px)] font-medium leading-[1.45] text-[#bdbdc2]">
          <span className="whitespace-nowrap">Não perca tempo, chegou o Na Praia Brasil, já são</span>
          <br />
          10 anos de pé na Areia!
        </p>
        <div className="grid grid-cols-2 gap-[clamp(12px,2.8vw,20px)] pt-3">
          <button
            type="button"
            className="h-[clamp(52px,10vw,72px)] whitespace-nowrap rounded-[9px] bg-primary px-3 text-[clamp(13px,2.9vw,23px)] font-extrabold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Comprar Ingressos
          </button>
          <Link
            to="/na-praia"
            className="flex h-[clamp(52px,10vw,72px)] items-center justify-center gap-[clamp(8px,2.2vw,16px)] whitespace-nowrap rounded-[9px] border border-[#525255] bg-[#29292a] px-3 text-[clamp(13px,2.9vw,23px)] font-extrabold text-foreground transition-colors hover:bg-accent"
          >
            <Plus className="h-[clamp(20px,4vw,29px)] w-[clamp(20px,4vw,29px)]" strokeWidth={2.5} />
            Saiba Mais
          </Link>
        </div>
      </div>
    </article>
  );
};

export default MainCard;
