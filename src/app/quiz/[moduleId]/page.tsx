import { notFound } from "next/navigation";
import { QuizRunner } from "@/components/QuizRunner";
import { modules } from "@/data/modules";
import { questions } from "@/data/questions";

export default async function QuizPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  const selectedModule = modules.find((item) => item.id === moduleId);
  if (!selectedModule) notFound();

  const moduleQuestions = questions.filter((question) => question.moduleId === moduleId);

  return (
    <QuizRunner
      backHref="/modulos"
      backLabel="Volver a módulos"
      intro={selectedModule.description}
      mode={moduleId === "casos-clinicos" ? "clinical" : "module"}
      moduleId={selectedModule.id}
      moduleTitle={selectedModule.title}
      questions={moduleQuestions}
      retryHref={`/quiz/${selectedModule.id}`}
      title="Quiz por módulo"
    />
  );
}
