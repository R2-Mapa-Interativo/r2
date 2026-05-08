import { useId } from "react";

type NaPraiaMarkProps = {
  className?: string;
  color?: string;
};

type NaPraiaRaysProps = {
  color?: string;
};

export const NaPraiaRays = ({ color = "currentColor" }: NaPraiaRaysProps) => {
  const rays = Array.from({ length: 34 }, (_, index) => {
    const angle = (index / 34) * Math.PI * 2;
    const inner = 3;
    const outer = index % 2 === 0 ? 76 : 65;
    const x1 = 160 + Math.cos(angle) * inner;
    const y1 = 160 + Math.sin(angle) * inner;
    const x2 = 160 + Math.cos(angle) * outer;
    const y2 = 160 + Math.sin(angle) * outer;

    return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });

  return (
    <g fill="none" stroke={color} strokeLinecap="round" strokeWidth="8.5">
      {rays}
      <circle cx="160" cy="160" r="23" fill={color} stroke="none" />
    </g>
  );
};

export const NaPraiaMark = ({ className, color = "currentColor" }: NaPraiaMarkProps) => {
  return (
    <svg
      viewBox="74 74 172 172"
      className={className}
      aria-hidden="true"
    >
      <NaPraiaRays color={color} />
    </svg>
  );
};

type FestivalLogoProps = {
  className?: string;
  color?: string;
  strokeWidth?: number;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
};

export const FestivalLogo = ({
  className,
  color = "currentColor",
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden = ariaLabel ? undefined : true,
}: FestivalLogoProps) => {
  const rawId = useId().replace(/:/g, "");
  const topPathId = `na-praia-top-${rawId}`;
  const bottomPathId = `na-praia-bottom-${rawId}`;

  return (
    <svg viewBox="0 0 320 320" className={className} aria-label={ariaLabel} aria-hidden={ariaHidden}>
      <defs>
        <path id={topPathId} d="M 39 160 A 121 121 0 0 1 281 160" />
        <path id={bottomPathId} d="M 281 160 A 121 121 0 0 1 39 160" />
      </defs>

      <text fill={color} className="text-[29px] font-black uppercase tracking-[0.09em]">
        <textPath href={`#${topPathId}`} startOffset="50%" textAnchor="middle">
          NA PRAIA FESTIVAL
        </textPath>
      </text>
      <text fill={color} className="text-[29px] font-black uppercase tracking-[0.09em]">
        <textPath href={`#${bottomPathId}`} startOffset="50%" textAnchor="middle">
          NA PRAIA FESTIVAL
        </textPath>
      </text>
      <text x="39" y="170" fill={color} className="text-[28px] font-black" textAnchor="middle">
        •
      </text>
      <text x="281" y="170" fill={color} className="text-[28px] font-black" textAnchor="middle">
        •
      </text>
      <NaPraiaRays color={color} />
    </svg>
  );
};
