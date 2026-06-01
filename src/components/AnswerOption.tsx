import { clsx } from "clsx";

type Props = {
  option: string;
  selected: boolean;
  confirmed: boolean;
  correctAnswer: string;
  onSelect: () => void;
};

export function AnswerOption({ option, selected, confirmed, correctAnswer, onSelect }: Props) {
  const isCorrect = option === correctAnswer;

  return (
    <button
      className={clsx(
        "w-full rounded-2xl border p-4 text-left text-sm font-medium transition",
        !confirmed && selected && "border-wine bg-wine/5 text-wine",
        !confirmed && !selected && "border-sand/35 bg-white/70 hover:border-wine/35",
        confirmed && isCorrect && "border-emerald-500 bg-emerald-50 text-emerald-900",
        confirmed && selected && !isCorrect && "border-rose-500 bg-rose-50 text-rose-900",
        confirmed && !selected && !isCorrect && "border-sand/25 bg-white/45 text-ink/50"
      )}
      disabled={confirmed}
      onClick={onSelect}
      type="button"
    >
      {option}
    </button>
  );
}
