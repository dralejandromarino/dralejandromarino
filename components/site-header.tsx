/**
 * Encabezado fijo del sitio.
 *
 * La franja superior muestra el teléfono y la ciudad. Debajo quedan el
 * nombre del doctor y la navegación, que en pantallas chicas se pliega.
 */
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { site } from "@/content/site";

/** Barra de contacto y marca. Permanece visible al desplazar la página. */
export function SiteHeader() {
  return (
    <header data-testid="site-header" className="sticky top-0 z-30 bg-ivory">
      {/* Teléfono y ciudad, sobre fondo petróleo. */}
      <div className="bg-petroleum text-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-end px-5 py-2 text-xs">
          <a data-testid="site-phone" href={`tel:${site.phoneTel}`}>
            {site.phoneDisplay} · {site.city}
          </a>
        </div>
      </div>
      {/* Nombre, especialidad y menú de secciones. */}
      <div className="relative border-b border-petroleum/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
          <Link href="/" data-testid="site-logo" className="block">
            <span className="block font-serif text-xl text-petroleum">
              {site.name}
            </span>
            <span className="block text-[0.7rem] tracking-[0.14em] text-copper uppercase">
              {site.specialty}
            </span>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
