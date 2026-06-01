import { QuizRunner } from "@/components/QuizRunner";
import { questions } from "@/data/questions";

export default function ClinicalCasesPage() {
  const clinicalQuestions = questions.filter((question) => question.type === "clinical-case");

  return (
    <QuizRunner
      backHref="/modulos"
      backLabel="Volver a módulos"
      intro="Resuelve situaciones clínicas donde el diagnóstico debe integrar luz, piel, profundidad, pigmento y neutralización."
      mode="clinical"
      moduleId="casos-clinicos"
      moduleTitle="Casos clínicos"
      questions={clinicalQuestions}
      retryHref="/casos-clinicos"
      title="Casos clínicos aplicados"
    />
  );
}
