import { ModulesClient } from "./ModulesClient";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ModulesPage() {
  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-rosewood">Ruta de aprendizaje</p>
          <h1 className="mt-3 font-serif text-4xl text-wine md:text-6xl">Módulos de entrenamiento</h1>
          <p className="mt-4 text-ink/68">
            Entrena por tema, compara tu mejor resultado y refuerza las áreas que más influyen en el resultado cicatrizado.
          </p>
        </div>
        <ModulesClient />
      </main>
    </ProtectedRoute>
  );
}
