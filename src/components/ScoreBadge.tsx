import { getLevel } from "@/lib/evaluation";

export function ScoreBadge({ percentage }: { percentage: number }) {
  const level = getLevel(percentage);
  return (
    <span className="inline-flex rounded-full border border-sand/60 bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-wine">
      {Math.round(percentage)}% · Nivel {level}
    </span>
  );
}
