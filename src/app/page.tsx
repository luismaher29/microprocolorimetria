import { ArrowRight, FlaskConical, GraduationCap, Sparkles } from "lucide-react";
import { ProtectedLink } from "@/components/ProtectedLink";

const topics = [
  "Ciencia de la luz",
  "Piel como objeto óptico",
  "Fototipo, matiz y subtono",
  "Profundidad y efecto Tyndall",
  "Colorimetría aplicada",
  "Neutralización",
  "Pigmentología avanzada",
  "Casos clínicos"
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.08fr_0.92fr] md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-sand/50 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-wine">
            <Sparkles size={15} /> Entrenamiento profesional PMU
          </span>
          <h1 className="mt-7 font-serif text-5xl leading-tight text-wine md:text-7xl">MicroPro Colorimetría</h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-ink/74">
            Pon a prueba tu criterio profesional en color, piel y pigmentología aplicada a micropigmentación.
          </p>
          <p className="mt-6 max-w-2xl leading-7 text-ink/68">
            MicroPro Colorimetría es una herramienta de entrenamiento para micropigmentadores que desean validar si realmente comprenden cómo interactúan la luz, la piel, la profundidad y el pigmento en el resultado final.
          </p>
          <p className="mt-4 max-w-2xl leading-7 text-ink/68">
            A través de quizzes, casos clínicos y retroalimentación inmediata, podrás medir tu dominio en colorimetría aplicada, neutralización, pigmentología y diagnóstico cromático.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ProtectedLink href="/evaluacion-global">Comenzar evaluación <ArrowRight className="ml-2" size={16} /></ProtectedLink>
            <ProtectedLink href="/modulos" variant="secondary">Explorar módulos</ProtectedLink>
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-wine/10 bg-white/75 p-6 shadow-soft">
          <div className="absolute -right-4 -top-4 hidden size-24 rounded-full bg-sand/40 blur-2xl md:block" />
          <div className="rounded-[1.5rem] bg-gradient-to-br from-wine to-plum p-6 text-white">
            <FlaskConical size={30} />
            <h2 className="mt-8 font-serif text-3xl">Diagnóstico cromático con criterio</h2>
            <p className="mt-3 text-sm leading-6 text-white/78">
              Evalúa decisiones reales: luz, piel, subtono, profundidad, neutralización y lectura profesional del pigmento.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {["41 preguntas", "8 módulos", "Feedback inmediato", "Progreso local"].map((item) => (
              <div className="rounded-2xl bg-ivory p-4 text-sm font-semibold text-wine" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6 flex items-center gap-3">
          <GraduationCap className="text-wine" />
          <h2 className="font-serif text-3xl text-wine">¿Qué vas a evaluar?</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <div className="rounded-2xl border border-sand/35 bg-white/68 p-4 text-sm font-semibold text-ink/74" key={topic}>
              {topic}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
