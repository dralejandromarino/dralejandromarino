/**
 * Página de consulta.
 *
 * Arriba, el recorrido y las dos fichas de evaluación. Debajo del
 * interlineado, el título del formulario y los datos de contacto. El
 * envío lo resuelve la acción de servidor de `actions.ts`.
 */
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactForm } from "@/components/contact-form";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import {
  consultaIntro,
  consultaSteps,
  contactFormTitle,
  evaluationModes,
} from "@/content/modality";
import { site, whatsappHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Consulte su caso",
  description:
    "Evaluaciones médicas y preinformes de factibilidad a distancia. Envíe su consulta al Dr. Alejandro Marino. Teléfono, WhatsApp y correo en Mar del Plata.",
};

/** Recorrido de la consulta, fichas de evaluación y formulario de contacto. */
export default function ContactoPage() {
  return (
    <RevealOnScroll>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="soft-enter text-sm tracking-wide text-copper uppercase">
          {consultaIntro.kicker}
        </p>
        <h1
          data-testid="contact-title"
          className="soft-enter mt-3 max-w-3xl font-serif text-4xl text-petroleum"
          style={{ animationDelay: "70ms" }}
        >
          {consultaIntro.title}
        </h1>
        <p
          className="soft-enter mt-6 max-w-3xl leading-relaxed text-petroleum/80"
          style={{ animationDelay: "140ms" }}
        >
          {consultaIntro.description}
        </p>

        {/* Tres pasos: consulta digital, evaluación documental e informe. */}
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {consultaSteps.map((step, index) => (
            <li
              key={step.number}
              data-testid={`contact-step-${step.number}`}
              className="reveal"
              style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
            >
              <p className="font-serif text-3xl text-petroleum">{step.number}</p>
              <h2 className="mt-2 font-serif text-xl">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-petroleum/80">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        {/* Evaluación presencial y evaluación a distancia, en fichas paralelas. */}
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {evaluationModes.map((mode, index) => (
            <article
              key={mode.number}
              data-testid={`contact-mode-${mode.number}`}
              className="experience-card reveal rounded-2xl border border-petroleum/10 bg-paper p-6 shadow-[0_12px_32px_rgba(22,63,73,0.06)]"
              style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
            >
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-ivory font-serif text-sm text-copper">
                {mode.number}
              </span>
              <h2 className="mt-4 font-serif text-2xl">{mode.title}</h2>
              <p className="mt-3 text-petroleum/80">{mode.description}</p>
            </article>
          ))}
        </div>

        {/* Formulario y vías alternativas, separados del recorrido. */}
        <div className="mt-16 grid items-start gap-x-12 gap-y-10 border-t border-petroleum/10 pt-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
          <div className="lg:col-start-1">
            <h2
              data-testid="contact-form-title"
              className="soft-enter font-serif text-4xl text-petroleum"
              style={{ animationDelay: "40ms" }}
            >
              {contactFormTitle}
            </h2>
          </div>
          <div
            className="reveal lg:col-start-1"
            style={{ "--reveal-delay": "60ms" } as CSSProperties}
          >
            <ContactForm />
          </div>
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
        </div>
      </section>
    </RevealOnScroll>
  );
}
