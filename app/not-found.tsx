/**
 * Página para una dirección que no existe.
 *
 * Next la muestra, dentro del encabezado y el pie, cuando la ruta no
 * coincide con ninguna página. La entrada usa la misma animación que la portada.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { contactCta } from "@/content/site";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description:
    "La dirección no corresponde a una página de la consultoría del Dr. Alejandro Marino.",
};

/** Aviso de ruta inexistente, con regreso al inicio y a la consulta. */
export default function NotFound() {
  return (
    <section
      data-testid="not-found"
      className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-28 md:grid-cols-[minmax(16rem,22rem)_1fr] md:gap-16 md:py-24"
    >
      <div
        className="soft-enter flex min-h-56 flex-col items-center justify-center rounded-2xl border border-petroleum/10 bg-paper p-8 text-center shadow-[0_12px_32px_rgba(22,63,73,0.06)] md:min-h-72"
        style={{ animationDelay: "40ms" }}
        aria-hidden="true"
      >
        <p className="text-xs tracking-[0.16em] text-copper uppercase">
          Página no encontrada
        </p>
        <p className="mt-6 font-serif text-7xl leading-none text-petroleum md:text-8xl">
          404
        </p>
      </div>
      <div>
        <h1
          data-testid="not-found-title"
          className="soft-enter font-serif text-4xl leading-[1.1] text-petroleum md:text-5xl"
          style={{ animationDelay: "120ms" }}
        >
          Esta dirección no forma parte del sitio.
        </h1>
        <div
          className="soft-enter mt-6 h-px w-12 bg-copper"
          style={{ animationDelay: "180ms" }}
          aria-hidden="true"
        />
        <p
          className="soft-enter mt-6 max-w-xl leading-relaxed text-petroleum/80"
          style={{ animationDelay: "220ms" }}
        >
          El enlace puede estar desactualizado, o la dirección se escribió con
          un error. Desde aquí puede volver al inicio o dejar una consulta.
        </p>
        <div
          className="soft-enter mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          style={{ animationDelay: "280ms" }}
        >
          <Link
            href="/"
            data-testid="not-found-home"
            className="nav-cta inline-flex items-center justify-center rounded-md bg-petroleum px-5 py-3 text-sm text-paper"
          >
            Volver al inicio
          </Link>
          <Link
            href={contactCta.href}
            data-testid="not-found-contact"
            className="nav-link inline-flex items-center gap-2 text-sm text-petroleum"
          >
            {contactCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
