import { QuizRunner } from "@/components/QuizRunner";
import { questions } from "@/data/questions";

export default function GlobalEvaluationPage() {
  const globalQuestions = questions.slice(0, 40);

  return (
    <QuizRunner
      backHref="/"
      backLabel="Volver al inicio"
      intro="Evaluación general con preguntas de todos los módulos para estimar tu dominio global en colorimetría y pigmentología PMU."
      mode="global"
      moduleId="global"
      moduleTitle="Evaluación global"
      questions={globalQuestions}
      retryHref="/evaluacion-global"
      title="Evaluación global"
    />
  );
}
