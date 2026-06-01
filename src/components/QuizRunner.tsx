"use client";

import { useMemo, useState } from "react";
import { AnswerOption } from "@/components/AnswerOption";
import { Button, ButtonLink } from "@/components/Button";
import { ProgressBar } from "@/components/ProgressBar";
import { ResultSummary } from "@/components/ResultSummary";
import type { Question } from "@/data/questions";
import { getLevel, percentage, summarizeConcepts } from "@/lib/evaluation";
import { saveAttempt } from "@/lib/storage";

type Props = {
  questions: Question[];
  title: string;
  intro?: string;
  mode: "module" | "global" | "clinical";
  moduleId: string;
  moduleTitle: string;
  retryHref: string;
  backHref: string;
  backLabel: string;
};

export function QuizRunner({ questions, title, intro, mode, moduleId, moduleTitle, retryHref, backHref, backLabel }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);
  const current = questions[index];
  const progress = ((index + (confirmed ? 1 : 0)) / questions.length) * 100;

  const result = useMemo(() => {
    const score = questions.filter((question) => answers[question.id] === question.correctAnswer).length;
    const pct = percentage(score, questions.length);
    const concepts = summarizeConcepts(questions, answers);
    return { score, pct, ...concepts };
  }, [answers, questions]);

  function confirmAnswer() {
    if (!selected) return;
    setAnswers((previous) => ({ ...previous, [current.id]: selected }));
    setConfirmed(true);
  }

  function next() {
    if (index === questions.length - 1) {
      const finalAnswers = { ...answers, [current.id]: selected };
      const score = questions.filter((question) => finalAnswers[question.id] === question.correctAnswer).length;
      const pct = percentage(score, questions.length);
      saveAttempt({
        id: `${mode}-${moduleId}-${Date.now()}`,
        moduleId,
        moduleTitle,
        score,
        total: questions.length,
        percentage: pct,
        level: getLevel(pct),
        completedAt: new Date().toISOString(),
        mode
      });
      setAnswers(finalAnswers);
      setFinished(true);
      return;
    }

    setIndex((value) => value + 1);
    setSelected("");
    setConfirmed(false);
  }

  function reset() {
    setIndex(0);
    setSelected("");
    setConfirmed(false);
    setAnswers({});
    setFinished(false);
  }

  if (questions.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-3xl bg-white/80 p-8 shadow-soft">
          <h1 className="font-serif text-3xl text-wine">No hay preguntas disponibles</h1>
          <ButtonLink className="mt-6" href={backHref}>Volver</ButtonLink>
        </div>
      </main>
    );
  }

  if (finished) {
    return (
      <ResultSummary
        backHref={backHref}
        backLabel={backLabel}
        percentage={result.pct}
        reinforcements={result.reinforcements}
        retryHref={retryHref}
        score={result.score}
        strengths={result.strengths}
        title={`Resultado: ${getLevel(result.pct)}`}
        total={questions.length}
        weakModuleIds={result.weakModuleIds}
      />
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rosewood">{moduleTitle}</p>
          <h1 className="mt-2 font-serif text-3xl text-wine md:text-5xl">{title}</h1>
          {intro ? <p className="mt-3 max-w-2xl text-ink/70">{intro}</p> : null}
        </div>
        <Button variant="ghost" onClick={reset}>Reiniciar</Button>
      </div>

      <section className="rounded-[2rem] border border-wine/10 bg-white/82 p-5 shadow-soft md:p-8">
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between text-sm text-ink/60">
            <span>Pregunta {index + 1} de {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>

        <p className="rounded-full bg-champagne/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-wine">
          Concepto evaluado: {current.concept}
        </p>
        <h2 className="mt-5 text-xl font-semibold leading-snug text-ink md:text-2xl">{current.question}</h2>

        <div className="mt-6 space-y-3">
          {current.options.map((option) => (
            <AnswerOption
              confirmed={confirmed}
              correctAnswer={current.correctAnswer}
              key={option}
              onSelect={() => setSelected(option)}
              option={option}
              selected={selected === option}
            />
          ))}
        </div>

        {confirmed ? (
          <div className="mt-6 rounded-3xl bg-ivory p-5">
            <p className="font-semibold text-wine">
              {selected === current.correctAnswer ? "Respuesta correcta" : "Respuesta incorrecta"}
            </p>
            <p className="mt-2 text-sm leading-6 text-ink/72">{current.explanation}</p>
          </div>
        ) : null}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {!confirmed ? (
            <Button disabled={!selected} onClick={confirmAnswer}>Confirmar respuesta</Button>
          ) : (
            <Button onClick={next}>{index === questions.length - 1 ? "Ver resultado" : "Siguiente pregunta"}</Button>
          )}
          <ButtonLink href={backHref} variant="secondary">{backLabel}</ButtonLink>
        </div>
      </section>
    </main>
  );
}
