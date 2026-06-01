import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "MicroPro Colorimetría",
  description: "Evaluación profesional de colorimetría y pigmentología aplicada a micropigmentación."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
