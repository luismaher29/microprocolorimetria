"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { clsx } from "clsx";
import { AccessModal } from "@/components/AccessModal";
import { hasAccess } from "@/lib/access";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "nav";
};

const styles = {
  primary: "rounded-full bg-wine px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-plum",
  secondary: "rounded-full border border-wine/15 bg-white/70 px-5 py-3 text-sm font-semibold text-wine transition hover:bg-white",
  ghost: "rounded-full px-5 py-3 text-sm font-semibold text-wine transition hover:bg-wine/5",
  nav: "rounded-full px-4 py-2 text-sm font-medium text-ink/75 transition hover:bg-wine/5 hover:text-wine"
};

export function ProtectedLink({ href, children, className, variant = "primary" }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function go() {
    if (hasAccess()) {
      router.push(href);
      return;
    }

    setOpen(true);
  }

  return (
    <>
      <button className={clsx("inline-flex items-center justify-center", styles[variant], className)} onClick={go} type="button">
        {children}
      </button>
      <AccessModal
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          router.push(href);
        }}
        open={open}
      />
    </>
  );
}
