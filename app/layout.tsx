import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Directorio de Plataformas",
  description: "Chifa Lung Fung · Golden Palace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
