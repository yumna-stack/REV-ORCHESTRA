import { useId } from "react";

type Segment = {
  label: string;
  value: number;
  color: string;
};

interface VennDiagramProps {
  title: string;
  subtitle?: string;
  segments: [Segment, Segment, Segment];
  intersectAll?: number;
  intersectAB?: number;
  intersectBC?: number;
  intersectAC?: number;
  footer?: string;
}

/**
 * Three-circle Euler/Venn diagram with amber-warmed revorchestra palette.
 * Circles are positioned to always overlap, radii scale softly with value.
 */
export function VennDiagram({
  title,
  subtitle,
  segments,
  intersectAll,
  intersectAB,
  intersectBC,
  intersectAC,
  footer,
}: VennDiagramProps) {
  const id = useId().replace(/:/g, "");
  const [a, b, c] = segments;

  const total = Math.max(a.value + b.value + c.value, 1);
  const scale = (v: number) => 36 + (v / total) * 28;

  const rA = scale(a.value);
  const rB = scale(b.value);
  const rC = scale(c.value);

  const cx = 130;
  const cy = 108;
  const offset = 34;

  const A = { cx: cx - offset, cy: cy - 16, r: rA };
  const B = { cx: cx + offset, cy: cy - 16, r: rB };
  const C = { cx, cy: cy + offset - 4, r: rC };

  return (
    <div className="relative rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-4">
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-[10px] text-neutral-500">{subtitle}</p>
          )}
        </div>
        <span className="rounded-full border border-amber-500/25 bg-amber-500/[0.06] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-amber-300/90">
          overlap
        </span>
      </div>

      <svg viewBox="0 0 260 220" className="w-full">
        <defs>
          <filter id={`glow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`ga-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a.color} stopOpacity="0.32" />
            <stop offset="70%" stopColor={a.color} stopOpacity="0.12" />
            <stop offset="100%" stopColor={a.color} stopOpacity="0.04" />
          </radialGradient>
          <radialGradient id={`gb-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={b.color} stopOpacity="0.32" />
            <stop offset="70%" stopColor={b.color} stopOpacity="0.12" />
            <stop offset="100%" stopColor={b.color} stopOpacity="0.04" />
          </radialGradient>
          <radialGradient id={`gc-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.color} stopOpacity="0.32" />
            <stop offset="70%" stopColor={c.color} stopOpacity="0.12" />
            <stop offset="100%" stopColor={c.color} stopOpacity="0.04" />
          </radialGradient>
        </defs>

        <circle
          cx={A.cx}
          cy={A.cy}
          r={A.r}
          fill={`url(#ga-${id})`}
          stroke={a.color}
          strokeOpacity="0.55"
          strokeWidth="1"
          filter={`url(#glow-${id})`}
        />
        <circle
          cx={B.cx}
          cy={B.cy}
          r={B.r}
          fill={`url(#gb-${id})`}
          stroke={b.color}
          strokeOpacity="0.55"
          strokeWidth="1"
          filter={`url(#glow-${id})`}
        />
        <circle
          cx={C.cx}
          cy={C.cy}
          r={C.r}
          fill={`url(#gc-${id})`}
          stroke={c.color}
          strokeOpacity="0.55"
          strokeWidth="1"
          filter={`url(#glow-${id})`}
        />

        {/* Segment value labels (outer) */}
        <text
          x={A.cx - A.r * 0.55}
          y={A.cy - A.r * 0.4}
          className="fill-neutral-100"
          fontSize="18"
          fontWeight="600"
          textAnchor="middle"
          style={{ fontFamily: "ui-sans-serif, system-ui" }}
        >
          {a.value}
        </text>
        <text
          x={B.cx + B.r * 0.55}
          y={B.cy - B.r * 0.4}
          className="fill-neutral-100"
          fontSize="18"
          fontWeight="600"
          textAnchor="middle"
        >
          {b.value}
        </text>
        <text
          x={C.cx}
          y={C.cy + C.r * 0.7}
          className="fill-neutral-100"
          fontSize="18"
          fontWeight="600"
          textAnchor="middle"
        >
          {c.value}
        </text>

        {/* Intersection value labels */}
        {intersectAB !== undefined && (
          <text
            x={(A.cx + B.cx) / 2}
            y={A.cy - 6}
            className="fill-neutral-300"
            fontSize="10"
            fontWeight="500"
            textAnchor="middle"
          >
            {intersectAB}
          </text>
        )}
        {intersectAC !== undefined && (
          <text
            x={(A.cx + C.cx) / 2 - 6}
            y={(A.cy + C.cy) / 2 + 6}
            className="fill-neutral-300"
            fontSize="10"
            fontWeight="500"
            textAnchor="middle"
          >
            {intersectAC}
          </text>
        )}
        {intersectBC !== undefined && (
          <text
            x={(B.cx + C.cx) / 2 + 6}
            y={(B.cy + C.cy) / 2 + 6}
            className="fill-neutral-300"
            fontSize="10"
            fontWeight="500"
            textAnchor="middle"
          >
            {intersectBC}
          </text>
        )}
        {intersectAll !== undefined && (
          <g>
            <circle
              cx={(A.cx + B.cx + C.cx) / 3}
              cy={(A.cy + B.cy + C.cy) / 3}
              r="13"
              fill="#0a0a0a"
              stroke="#f59e0b"
              strokeOpacity="0.55"
            />
            <text
              x={(A.cx + B.cx + C.cx) / 3}
              y={(A.cy + B.cy + C.cy) / 3 + 4}
              className="fill-amber-300"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
            >
              {intersectAll}
            </text>
          </g>
        )}
      </svg>

      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
        {segments.map((s) => (
          <span
            key={s.label}
            className="flex items-center gap-1.5 text-[10px] text-neutral-400"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: s.color, boxShadow: `0 0 6px ${s.color}` }}
            />
            {s.label}
          </span>
        ))}
      </div>

      {footer && (
        <p className="mt-2 border-t border-white/5 pt-2 text-[10px] text-neutral-500">
          {footer}
        </p>
      )}
    </div>
  );
}
