export type Module = {
  id: string;
  title: string;
  description: string;
  difficulty: "básico" | "intermedio" | "avanzado";
  estimatedMinutes: number;
};

export const modules: Module[] = [
  {
    id: "luz",
    title: "Ciencia de la luz",
    description: "Comprende cómo la luz, el espectro visible, la temperatura Kelvin y el metamerismo afectan la percepción del color.",
    difficulty: "básico",
    estimatedMinutes: 8
  },
  {
    id: "piel-optica",
    title: "La piel como objeto óptico",
    description: "Aprende por qué la piel filtra, absorbe y dispersa la luz, modificando el resultado final del pigmento.",
    difficulty: "intermedio",
    estimatedMinutes: 10
  },
  {
    id: "fototipo-subtono",
    title: "Fototipo, matiz y subtono",
    description: "Diferencia fototipo, tono superficial y subtono para tomar mejores decisiones cromáticas.",
    difficulty: "intermedio",
    estimatedMinutes: 12
  },
  {
    id: "tyndall",
    title: "Profundidad y efecto Tyndall",
    description: "Evalúa cómo la profundidad de implantación puede generar resultados fríos, grisáceos o azulados.",
    difficulty: "avanzado",
    estimatedMinutes: 12
  },
  {
    id: "colorimetria",
    title: "Colorimetría aplicada",
    description: "Aplica el círculo cromático, la temperatura del color y el comportamiento del marrón en PMU.",
    difficulty: "intermedio",
    estimatedMinutes: 10
  },
  {
    id: "neutralizacion",
    title: "Neutralización",
    description: "Resuelve virajes rojizos, anaranjados, grisáceos o azulados con criterio profesional.",
    difficulty: "avanzado",
    estimatedMinutes: 12
  },
  {
    id: "pigmentologia",
    title: "Pigmentología avanzada",
    description: "Comprende pigmentos orgánicos, inorgánicos, carrier, pH y lectura de Color Index.",
    difficulty: "avanzado",
    estimatedMinutes: 15
  },
  {
    id: "casos-clinicos",
    title: "Casos clínicos integradores",
    description: "Pon a prueba tu criterio profesional resolviendo situaciones reales de micropigmentación.",
    difficulty: "avanzado",
    estimatedMinutes: 15
  }
];
