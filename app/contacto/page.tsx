/**
 * Página de contacto.
 *
 * A la izquierda, el formulario de la consulta inicial. A la derecha, la
 * dirección, el teléfono, WhatsApp y el correo público. El envío lo resuelve
 * la acción de servidor de `actions.ts`.
 */
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactForm } from "@/components/contact-form";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { site, whatsappHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Envíe una consulta al Dr. Alejandro Marino e indique si necesita evaluación presencial o a distancia. Teléfono, WhatsApp y correo en Mar del Plata.",
};

/** Formulario de consulta y datos para comunicarse por otro medio. */
export default function ContactoPage() {
  return (
    <RevealOnScroll>
    <section className="mx-auto grid max-w-6xl items-start gap-x-12 gap-y-10 px-5 py-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
      <div className="lg:col-start-1">
        <p className="soft-enter text-sm tracking-wide text-copper uppercase">
          Consulta y contacto
        </p>
        <h1
          data-testid="contact-title"
          className="soft-enter mt-3 font-serif text-4xl text-petroleum"
          style={{ animationDelay: "70ms" }}
        >
          Describa brevemente su caso, detallando si requiere una evaluación
          presencial o a distancia.
        </h1>
      </div>
      {/* Formulario. El componente cliente muestra errores y el resultado del envío. */}
      <div className="reveal lg:col-start-1" style={{ "--reveal-delay": "60ms" } as CSSProperties}>
        <ContactForm />
      </div>
      {/* Vías alternativas: sede, teléfono, WhatsApp y correo. */}
      <aside
        data-testid="contact-details"
        className="reveal lg:col-start-2 lg:row-start-2"
        style={{ "--reveal-delay": "140ms" } as CSSProperties}
      >
        <div className="rounded-2xl border border-petroleum/10 bg-paper p-6 shadow-[0_12px_32px_rgba(22,63,73,0.06)]">
        <p className="leading-relaxed text-petroleum/80">
          Con una síntesis del problema, el destinatario del informe y la
          instancia en la que se encuentra, podremos indicar qué evaluación
          corresponde y qué documentación sería conveniente aportar.
        </p>
        <ul className="mt-8 space-y-3 text-sm">
          <li>
            {site.address} · {site.city}
          </li>
          <li>
            <a
              data-testid="contact-phone"
              className="transition-colors hover:text-copper"
              href={`tel:${site.phoneTel}`}
            >
              {site.phoneDisplay}
            </a>
          </li>
          <li>
            <a
              data-testid="contact-whatsapp"
              className="transition-colors hover:text-copper"
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.whatsappDisplay}
            </a>
          </li>
          <li>
            <a
              data-testid="contact-mail"
              className="transition-colors hover:text-copper"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </li>
        </ul>
        </div>
      </aside>
    </section>
    </RevealOnScroll>
  );
}
