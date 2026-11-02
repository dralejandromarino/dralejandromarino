/**
 * Página de modalidad.
 *
 * Explica el recorrido de una consulta y las dos formas de evaluación:
 * presencial en Mar del Plata y a distancia. Quien consulta elige al escribir.
 */
import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import {
  evaluationModes,
  modalityIntro,
  modalitySteps,
} from "@/content/modality";
import { contactCta } from "@/content/site";

export const metadata: Metadata = {
  title: "Modalidad",
  description:
    "Evaluación presencial en Gascón 1622, Mar del Plata, y evaluación a distancia. El informe puede recibirse sin traslado.",
};

/** Recorrido de la consulta, modalidades de evaluación y llamado a contacto. */
export default function ModalidadPage() {
  return (
    <RevealOnScroll>
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="soft-enter text-sm tracking-wide text-copper uppercase">
        {modalityIntro.kicker}
      </p>
      <h1
        data-testid="modality-title"
        className="soft-enter mt-3 max-w-3xl font-serif text-4xl text-petroleum"
        style={{ animationDelay: "70ms" }}
      >
        {modalityIntro.title}
      </h1>
      <p
        className="soft-enter mt-6 max-w-3xl text-petroleum/80"
        style={{ animationDelay: "140ms" }}
      >
        {modalityIntro.description}
      </p>

      {/* Cuatro pasos: consulta, revisión, evaluación e informe. */}
      <ol className="mt-12 grid gap-8 md:grid-cols-4">
        {modalitySteps.map((step, index) => (
          <li
            key={step.number}
            data-testid={`modality-step-${step.number}`}
            className="reveal"
            style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
          >
            <p className="font-serif text-3xl text-petroleum">{step.number}</p>
            <h2 className="mt-2 font-serif text-xl">{step.title}</h2>
            <p className="mt-2 text-sm text-petroleum/80">{step.description}</p>
          </li>
        ))}
      </ol>

      {/* Evaluación presencial y evaluación a distancia, en fichas paralelas. */}
      <div className="mt-16 grid gap-4 md:grid-cols-2">
        {evaluationModes.map((mode, index) => (
          <article
            key={mode.number}
            data-testid={`modality-mode-${mode.number}`}
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

      <p
        className="reveal mt-8 text-petroleum/80"
        style={{ "--reveal-delay": "40ms" } as CSSProperties}
      >
        Una vez finalizada la evaluación, el informe puede recibirse sin
        necesidad de traslado.
      </p>
      <div className="reveal mt-8" style={{ "--reveal-delay": "90ms" } as CSSProperties}>
        <Link
          href={contactCta.href}
          data-testid="modality-cta"
          className="nav-cta inline-flex rounded-md bg-petroleum px-4 py-3 text-sm text-paper"
        >
          {contactCta.label}
        </Link>
      </div>
    </section>
    </RevealOnScroll>
  );
}
