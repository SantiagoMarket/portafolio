import type { Metadata } from "next";
import { documentTitle, roleKeywords } from "@/lib/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: documentTitle,
  description:
    "Conecto procesos de negocio, CRMs y automatizaciones para que los equipos de ventas y marketing operen sin fricción.",
  keywords: roleKeywords,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:text-sm focus:font-mono focus:rounded"
          style={{ backgroundColor: "var(--burg)", color: "white" }}
        >
          Saltar al contenido
        </a>
        <div id="main">{children}</div>
      </body>
    </html>
  );
}
