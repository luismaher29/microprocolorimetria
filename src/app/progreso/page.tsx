"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ScoreBadge } from "@/components/ScoreBadge";
import { modules } from "@/data/modules";
import { clearProgress, readProgress, type ProgressState } from "@/lib/storage";

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressState>({ attempts: [], bestByModule: {} });

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  function reset() {
    clearProgress();
    setProgress({ attempts: [], bestByModule: {} });
  }

  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-rosewood">LocalStorage</p>
            <h1 className="mt-3 font-serif text-4xl text-wine md:text-6xl">Historial y progreso</h1>
            <p className="mt-4 max-w-2xl text-ink/68">Tu avance se guarda en este navegador: módulos completados, mejores puntuaciones y resultado global más reciente.</p>
          </div>
          {progress.attempts.length > 0 ? <Button onClick={reset} variant="secondary">Borrar progreso</Button> : null}
        </div>

        {progress.attempts.length === 0 ? (
          <div className="rounded-[2rem] border border-wine/10 bg-white/75 p-8 text-center shadow-soft">
            <h2 className="font-serif text-3xl text-wine">Aún no hay progreso guardado</h2>
            <p className="mt-3 text-ink/65">Completa un módulo o la evaluación global para ver tus resultados aquí.</p>
          </div>
        ) : (
          <>
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {modules.map((module) => {
                const best = progress.bestByModule[module.id];
                return (
                  <article className="rounded-3xl border border-wine/10 bg-white/74 p-5 shadow-soft" key={module.id}>
                    <h2 className="font-semibold text-wine">{module.title}</h2>
                    {best ? (
                      <div className="mt-4">
                        <ScoreBadge percentage={best.percentage} />
                        <p className="mt-3 text-sm text-ink/62">{best.score}/{best.total} · {new Date(best.completedAt).toLocaleDateString("es-CO")}</p>
                      </div>
                    ) : (
                      <p className="mt-4 text-sm text-ink/50">Sin intentos todavía.</p>
                    )}
                  </article>
                );
              })}
            </section>

            {progress.latestGlobal ? (
              <section className="mt-6 rounded-[2rem] bg-wine p-6 text-white shadow-soft">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/65">Resultado global más reciente</p>
                <h2 className="mt-3 font-serif text-3xl">Nivel {progress.latestGlobal.level}</h2>
                <p className="mt-2 text-white/78">{progress.latestGlobal.score}/{progress.latestGlobal.total} respuestas correctas · {progress.latestGlobal.percentage}%</p>
              </section>
            ) : null}

            <section className="mt-8 rounded-[2rem] border border-wine/10 bg-white/74 p-6 shadow-soft">
              <h2 className="font-serif text-3xl text-wine">Últimos intentos</h2>
              <div className="mt-5 divide-y divide-sand/30">
                {progress.attempts.map((attempt) => (
                  <div className="flex flex-col justify-between gap-2 py-4 md:flex-row md:items-center" key={attempt.id}>
                    <div>
                      <p className="font-semibold text-ink">{attempt.moduleTitle}</p>
                      <p className="text-sm text-ink/55">{new Date(attempt.completedAt).toLocaleString("es-CO")}</p>
                    </div>
                    <ScoreBadge percentage={attempt.percentage} />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </ProtectedRoute>
  );
}
