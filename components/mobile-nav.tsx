"use client";

/**
 * Navegación principal.
 *
 * En pantallas chicas es un menú que se abre con un botón. Desde el
 * breakpoint mediano la lista queda siempre visible y el botón se oculta.
 */
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactCta, mainNav } from "@/content/site";

/** Secciones del sitio y el acceso a la consulta. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Secciones" data-testid="site-nav">
      {/* Solo se muestra en pantallas chicas. El texto del botón cambia al abrir. */}
      <button
        type="button"
        data-testid="site-menu-toggle"
        className="inline-flex h-11 w-11 items-center justify-center text-petroleum md:hidden"
        aria-expanded={open}
        aria-controls="menu-principal"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
      {/* Oculto en móvil hasta que se abre. En escritorio ignora ese estado. */}
      <ul
        id="menu-principal"
        data-testid="site-menu"
        className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full z-20 flex-col gap-4 border-b border-petroleum/10 bg-ivory px-5 py-6 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}
      >
        {mainNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              data-testid={`nav-${item.href.slice(1)}`}
              aria-current={pathname === item.href ? "page" : undefined}
              className="nav-link inline-block text-sm text-petroleum"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={contactCta.href}
            data-testid="nav-contacto"
            className="nav-cta inline-flex rounded-md bg-petroleum px-4 py-3 text-sm text-paper"
            onClick={() => setOpen(false)}
          >
            {contactCta.label}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
