"use client";

import { useEffect, useState } from "react";
import { ModuleCard } from "@/components/ModuleCard";
import { modules } from "@/data/modules";
import { questions } from "@/data/questions";
import { readProgress, type ProgressState } from "@/lib/storage";

export function ModulesClient() {
  const [progress, setProgress] = useState<ProgressState>({ attempts: [], bestByModule: {} });

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((module) => (
        <ModuleCard
          best={progress.bestByModule[module.id]}
          key={module.id}
          module={module}
          questionCount={questions.filter((question) => question.moduleId === module.id).length}
        />
      ))}
    </div>
  );
}
