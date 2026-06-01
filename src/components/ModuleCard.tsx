"use client";

import { Clock, Layers3, Trophy } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import type { Module } from "@/data/modules";
import type { Attempt } from "@/lib/storage";

type Props = {
  module: Module;
  questionCount: number;
  best?: Attempt;
};

export function ModuleCard({ module, questionCount, best }: Props) {
  return (
    <article className="flex h-full flex-col rounded-[1.5rem] border border-wine/10 bg-white/76 p-5 shadow-soft">
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="rounded-full bg-champagne/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-wine">
          {module.difficulty}
        </span>
        {best ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-wine px-3 py-1 text-xs font-bold text-white">
            <Trophy size={13} /> {best.percentage}%
          </span>
        ) : null}
      </div>
      <h2 className="font-serif text-2xl text-wine">{module.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-ink/70">{module.description}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-ink/62">
        <span className="inline-flex items-center gap-2"><Layers3 size={16} /> {questionCount} preguntas</span>
        <span className="inline-flex items-center gap-2"><Clock size={16} /> {module.estimatedMinutes} min</span>
      </div>
      <ButtonLink className="mt-6" href={`/quiz/${module.id}`}>Entrenar</ButtonLink>
    </article>
  );
}
