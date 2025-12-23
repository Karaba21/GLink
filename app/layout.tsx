import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "GLink - Innovación Conectada",
  description: "Conectamos tu futuro con tecnología innovadora",
  icons: {
    icon: [
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon.ico" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png" },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          {children}
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}

