/**
 * Página de inicio.
 *
 * Presenta la oferta de la consultoría y, debajo, las áreas de experiencia.
 * Los textos salen de `content/site` y `content/experience`.
 */
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { experience } from "@/content/experience";
import { contactCta, site } from "@/content/site";

/** Portada del sitio: presentación de la oferta y listado de experiencia. */
export default function HomePage() {
  return (
    <>
      {/* Presentación: especialidad, oferta y accesos a contacto y servicios. */}
      <section
        data-testid="home-hero"
        className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:py-20"
      >
        <div>
          <p className="soft-enter text-xs tracking-[0.16em] text-copper uppercase">
            Especialista en medicina legal y laboral. {site.city}
          </p>
          <h1
            data-testid="home-title"
            className="soft-enter mt-5 font-serif text-4xl leading-[1.05] text-petroleum md:text-[3.25rem] lg:text-[3.5rem]"
            style={{ animationDelay: "70ms" }}
          >
            <span className="block">Consultoría legal</span>
            <span className="block">e informes médicos</span>
          </h1>
          <p
            className="soft-enter mt-6 max-w-xl leading-relaxed text-petroleum/80"
            style={{ animationDelay: "140ms" }}
          >
            Asesoramiento pericial especializado para Estudios jurídicos,
            Compañías de seguros, Empresas y Particulares.
          </p>
          <div
            className="soft-enter mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "210ms" }}
          >
            <Link
              href={contactCta.href}
              data-testid="home-cta-contacto"
              className="nav-cta inline-flex items-center justify-center gap-3 rounded-md bg-petroleum px-5 py-3 text-sm text-paper"
            >
              Solicitar una evaluación
              <ArrowIcon />
            </Link>
            <Link
              href="/servicios"
              data-testid="home-cta-servicios"
              className="nav-link inline-flex shrink-0 items-center gap-2 text-sm whitespace-nowrap text-petroleum"
            >
              Conocer servicios
              <ArrowIcon />
            </Link>
          </div>
        </div>
        {/* Retrato del doctor. `priority` carga la imagen junto con el primer pintado. */}
        <figure
          className="soft-enter w-full max-w-[25.5rem] justify-self-end"
          style={{ animationDelay: "120ms" }}
        >
          <div
            className="relative aspect-[408/512] w-full overflow-hidden rounded-tr-[6px] rounded-br-[6px] rounded-bl-[6px]"
            style={{ borderTopLeftRadius: "44% 35%" }}
          >
            <Image
              src="/images/hero-dr-marino.jpg"
              alt="Dr. Alejandro Marino en su escritorio"
              fill
              priority
              sizes="(min-width: 768px) 26rem, 100vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-3 text-right text-xs text-petroleum/55">
            Atención personal. Criterio independiente.
          </figcaption>
        </figure>
      </section>

      {/* Áreas de experiencia. Cada tarjeta entra a la vista con un pequeño retraso. */}
      <RevealOnScroll>
        <section id="experiencia" data-testid="home-experience" className="mx-auto max-w-6xl px-5 pb-20">
          <p
            className="reveal text-sm tracking-wide text-copper uppercase"
            style={{ "--reveal-delay": "0ms" } as CSSProperties}
          >
            {experience.kicker}
          </p>
          <h2
            className="reveal mt-3 font-serif text-3xl text-petroleum"
            style={{ "--reveal-delay": "70ms" } as CSSProperties}
          >
            {experience.title}
          </h2>
          <ol className="mt-8 space-y-4">
            {experience.areas.map((area, index) => (
              <li
                key={area.title}
                data-testid={`home-experience-${index + 1}`}
                className="experience-card reveal rounded-2xl border border-petroleum/10 bg-paper px-5 py-5 shadow-[0_12px_32px_rgba(22,63,73,0.06)]"
                style={
                  {
                    "--reveal-delay": `${Math.min(index, 4) * 55}ms`,
                  } as CSSProperties
                }
              >
                <p className="text-sm text-copper">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-serif text-xl">{area.title}</h3>
                <p className="mt-2 leading-relaxed text-petroleum/80">
                  {area.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </RevealOnScroll>
    </>
  );
}

/** Flecha decorativa de los enlaces de la portada. No se anuncia a lectores de pantalla. */
function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4 10h12M12 6l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
