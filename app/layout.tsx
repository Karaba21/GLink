import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GLink - Innovación Conectada",
  description: "Conectamos tu futuro con tecnología innovadora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

