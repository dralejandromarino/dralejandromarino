/**
 * Layout raíz del sitio.
 *
 * Envuelve todas las rutas con el idioma, las tipografías, los metadatos
 * compartidos, el encabezado, el pie y el acceso fijo a WhatsApp.
 */
import type { Metadata, Viewport } from "next";
import { DM_Sans, Lora } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsappLink } from "@/components/whatsapp-link";
import { site } from "@/content/site";
import "./globals.css";

/** Familia de los títulos. Queda disponible como la variable CSS `--font-lora`. */
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

/** Familia del cuerpo de texto. Queda disponible como `--font-dm-sans`. */
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

/**
 * Título y descripción que heredan las páginas.
 * El template agrega el nombre del doctor al título propio de cada ruta.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.offerTitle}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Evaluaciones médico-legales y auditoría médica para estudios jurídicos, compañías de seguros, empresas y particulares. Atención presencial en Mar del Plata y evaluación a distancia.",
};

/** Color de la interfaz del navegador en dispositivos móviles. */
export const viewport: Viewport = {
  themeColor: "#163F49",
};

/** Arma la estructura común: salto al contenido, encabezado, página, pie y WhatsApp. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${lora.variable} ${dmSans.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        {/* Sin JavaScript, el texto que aparece al hacer scroll queda visible. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {/* Atajo para lectores de pantalla: salta el encabezado y va al contenido. */}
        <a
          href="#contenido"
          data-testid="site-skip"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido" data-testid="site-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsappLink />
      </body>
    </html>
  );
}
