import type { Metadata, Viewport } from "next";
import { DM_Sans, Lora } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsappLink } from "@/components/whatsapp-link";
import { site } from "@/content/site";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.offerTitle}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Evaluaciones médico-legales y auditoría médica para estudios jurídicos, compañías de seguros, empresas y particulares. Atención presencial en Mar del Plata y evaluación a distancia.",
};

export const viewport: Viewport = {
  themeColor: "#163F49",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${lora.variable} ${dmSans.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsappLink />
      </body>
    </html>
  );
}
