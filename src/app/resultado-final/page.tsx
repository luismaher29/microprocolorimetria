"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/Button";
import { ScoreBadge } from "@/components/ScoreBadge";
import { readProgress, type ProgressState } from "@/lib/storage";

export default function FinalResultPage() {
  const [progress, setProgress] = useState<ProgressState>({ attempts: [], bestByModule: {} });

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  const result = progress.latestGlobal;

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <section className="rounded-[2rem] border border-wine/10 bg-white/78 p-8 shadow-soft md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-rosewood">Resultado final</p>
        {result ? (
          <>
            <h1 className="mt-4 font-serif text-4xl text-wine md:text-6xl">Tu nivel actual es {result.level}</h1>
            <div className="mt-5"><ScoreBadge percentage={result.percentage} /></div>
            <p className="mt-5 leading-7 text-ink/70">
              Comprendes una parte importante del diagnóstico cromático. Revisa tu historial para identificar qué módulos requieren refuerzo antes de una evaluación certificable.
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-4 font-serif text-4xl text-wine md:text-6xl">Aún no hay evaluación global</h1>
            <p className="mt-5 leading-7 text-ink/70">Completa la evaluación global para calcular tu nivel de conocimiento.</p>
          </>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/evaluacion-global">Iniciar evaluación global</ButtonLink>
          <ButtonLink href="/progreso" variant="secondary">Ver progreso</ButtonLink>
        </div>
      </section>
    </main>
  );
}
