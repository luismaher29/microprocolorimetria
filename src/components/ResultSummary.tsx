import { ButtonLink } from "@/components/Button";
import { ScoreBadge } from "@/components/ScoreBadge";
import { recommendationsFor } from "@/lib/evaluation";

type Props = {
  title: string;
  score: number;
  total: number;
  percentage: number;
  strengths: string[];
  reinforcements: string[];
  weakModuleIds: string[];
  retryHref: string;
  backHref: string;
  backLabel: string;
};

export function ResultSummary({ title, score, total, percentage, strengths, reinforcements, weakModuleIds, retryHref, backHref, backLabel }: Props) {
  const recommendations = recommendationsFor(weakModuleIds);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-[2rem] border border-wine/10 bg-white/78 p-6 shadow-soft md:p-10">
        <ScoreBadge percentage={percentage} />
        <h1 className="mt-5 font-serif text-3xl text-wine md:text-5xl">{title}</h1>
        <p className="mt-3 text-lg text-ink/75">
          Obtuviste <strong>{score}</strong> de <strong>{total}</strong> respuestas correctas.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <InfoList title="Temas fuertes" empty="Aún no hay temas fuertes claros. Repite el entrenamiento con calma." items={strengths} />
          <InfoList title="Temas a reforzar" empty="No se detectaron debilidades en este intento." items={reinforcements} />
        </div>

        {recommendations.length > 0 ? (
          <div className="mt-6 rounded-3xl bg-champagne/45 p-5">
            <h2 className="font-semibold text-wine">Recomendaciones de estudio</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink/72">
              {recommendations.map((recommendation) => (
                <li key={recommendation}>{recommendation}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={retryHref}>Repetir evaluación</ButtonLink>
          <ButtonLink href={backHref} variant="secondary">{backLabel}</ButtonLink>
          <ButtonLink href="/progreso" variant="ghost">Ver progreso</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function InfoList({ title, items, empty }: { title: string; items: string[]; empty: string }) {
  return (
    <div className="rounded-3xl border border-sand/35 bg-ivory/70 p-5">
      <h2 className="font-semibold text-wine">{title}</h2>
      {items.length > 0 ? (
        <ul className="mt-3 space-y-2 text-sm text-ink/72">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-ink/55">{empty}</p>
      )}
    </div>
  );
}
