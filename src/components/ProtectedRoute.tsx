"use client";

import { useEffect, useState } from "react";
import { AccessModal } from "@/components/AccessModal";
import { ButtonLink } from "@/components/Button";
import { hasAccess } from "@/lib/access";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const current = hasAccess();
    setAllowed(current);
    setOpen(!current);
  }, []);

  if (allowed === null) {
    return <main className="min-h-[60vh]" />;
  }

  if (!allowed) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <section className="rounded-[2rem] border border-wine/10 bg-white/78 p-8 text-center shadow-soft md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-rosewood">Acceso exclusivo</p>
          <h1 className="mt-4 font-serif text-4xl text-wine md:text-6xl">Ingresa con la clave de tu guía</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink/68">
            Esta herramienta está disponible para estudiantes que adquirieron la guía MicroPro Colorimetría.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              className="inline-flex items-center justify-center rounded-full bg-wine px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-plum"
              onClick={() => setOpen(true)}
              type="button"
            >
              Acceder
            </button>
            <ButtonLink href="/" variant="secondary">Volver al inicio</ButtonLink>
          </div>
        </section>
        <AccessModal
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setAllowed(true);
            setOpen(false);
          }}
          open={open}
        />
      </main>
    );
  }

  return <>{children}</>;
}
