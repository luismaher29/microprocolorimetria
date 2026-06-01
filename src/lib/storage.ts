"use client";

export type Attempt = {
  id: string;
  moduleId: string;
  moduleTitle: string;
  score: number;
  total: number;
  percentage: number;
  level: string;
  completedAt: string;
  mode: "module" | "global" | "clinical";
};

export type ProgressState = {
  attempts: Attempt[];
  bestByModule: Record<string, Attempt>;
  latestGlobal?: Attempt;
};

const key = "micropro-colorimetria-progress";

const empty: ProgressState = {
  attempts: [],
  bestByModule: {}
};

export function readProgress(): ProgressState {
  if (typeof window === "undefined") return empty;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

export function saveAttempt(attempt: Attempt) {
  const current = readProgress();
  const attempts = [attempt, ...current.attempts].slice(0, 40);
  const bestByModule = { ...current.bestByModule };

  if (attempt.mode === "module" || attempt.mode === "clinical") {
    const previous = bestByModule[attempt.moduleId];
    if (!previous || attempt.percentage > previous.percentage) {
      bestByModule[attempt.moduleId] = attempt;
    }
  }

  const next: ProgressState = {
    attempts,
    bestByModule,
    latestGlobal: attempt.mode === "global" ? attempt : current.latestGlobal
  };

  window.localStorage.setItem(key, JSON.stringify(next));
  return next;
}

export function clearProgress() {
  window.localStorage.removeItem(key);
}
