"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, X } from "lucide-react";
import { Button } from "@/components/Button";
import { accessPassword, grantAccess } from "@/lib/access";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function AccessModal({ open, onClose, onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.trim() === accessPassword) {
      grantAccess();
      setError("");
      setPassword("");
      onSuccess();
      return;
    }

    setError("Contraseña incorrecta. Revisa la clave incluida en tu guía.");
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-plum/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] border border-wine/10 bg-ivory p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div className="grid size-12 place-items-center rounded-full bg-wine text-white">
            <LockKeyhole size={20} />
          </div>
          <button
            aria-label="Cerrar"
            className="rounded-full p-2 text-ink/55 transition hover:bg-wine/5 hover:text-wine"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="mt-5 font-serif text-3xl text-wine">Acceso exclusivo</h2>
        <p className="mt-3 text-sm leading-6 text-ink/68">
          Ingresa la clave incluida en tu guía MicroPro Colorimetría para comenzar el entrenamiento.
        </p>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block">
            <span className="text-sm font-semibold text-wine">Contraseña de la guía</span>
            <input
              autoFocus
              className="mt-2 w-full rounded-2xl border border-sand/45 bg-white px-4 py-3 text-ink outline-none transition focus:border-wine focus:ring-4 focus:ring-wine/10"
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              placeholder="Escribe tu clave"
              type="password"
              value={password}
            />
          </label>

          {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">{error}</p> : null}

          <Button className="w-full" type="submit">Acceder</Button>
        </form>

        <p className="mt-4 text-xs leading-5 text-ink/52">
          El acceso se guardará en este dispositivo. Esta versión no usa login ni base de datos.
        </p>
      </div>
    </div>
  );
}
