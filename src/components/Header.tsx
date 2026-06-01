import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

const links = [
  ["Módulos", "/modulos"],
  ["Casos", "/casos-clinicos"],
  ["Evaluación", "/evaluacion-global"],
  ["Progreso", "/progreso"]
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-wine/10 bg-ivory/88 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link className="flex items-center gap-3 font-semibold text-wine" href="/">
          <span className="grid size-10 place-items-center rounded-full bg-wine text-white">
            <BookOpenCheck size={19} />
          </span>
          <span>MicroPro Colorimetría</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <Link className="rounded-full px-4 py-2 text-sm font-medium text-ink/75 hover:bg-wine/5 hover:text-wine" href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
