import { modules } from "@/data/modules";
import type { Question } from "@/data/questions";

export type Level = "básico" | "intermedio" | "avanzado" | "profesional";

export function percentage(score: number, total: number) {
  return total === 0 ? 0 : Math.round((score / total) * 100);
}

export function getLevel(value: number): Level {
  if (value >= 90) return "profesional";
  if (value >= 70) return "avanzado";
  if (value >= 50) return "intermedio";
  return "básico";
}

export function summarizeConcepts(questions: Question[], answers: Record<string, string>) {
  const correct = questions.filter((question) => answers[question.id] === question.correctAnswer);
  const incorrect = questions.filter((question) => answers[question.id] !== question.correctAnswer);

  return {
    strengths: unique(correct.map((question) => question.concept)).slice(0, 5),
    reinforcements: unique(incorrect.map((question) => question.concept)).slice(0, 5),
    weakModuleIds: unique(incorrect.map((question) => question.moduleId))
  };
}

export function recommendationsFor(moduleIds: string[]) {
  const copy: Record<string, string> = {
    luz: "Repasa temperatura Kelvin, espectro visible y metamerismo.",
    "piel-optica": "Refuerza anatomía de piel, dermis superficial, profundidad y comportamiento óptico.",
    "fototipo-subtono": "Repasa la diferencia entre fototipo, tono superficial y subtono.",
    tyndall: "Refuerza profundidad de implantación, dispersión de luz y virajes fríos.",
    colorimetria: "Revisa círculo cromático, temperatura del marrón y selección de pigmento según piel.",
    neutralizacion: "Refuerza colores complementarios, diagnóstico de virajes y corrección cromática.",
    pigmentologia: "Repasa pigmentos orgánicos, inorgánicos, carrier, pH y lectura de Color Index.",
    "casos-clinicos": "Practica diagnóstico integral combinando pigmento, profundidad, piel e iluminación."
  };

  return moduleIds.map((id) => copy[id]).filter(Boolean);
}

export function moduleTitle(moduleId: string) {
  return modules.find((module) => module.id === moduleId)?.title ?? moduleId;
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}
