import type { Metadata } from "next";
import Link from "next/link";
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

export default function ModalidadPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-sm tracking-wide text-copper uppercase">{modalityIntro.kicker}</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl text-petroleum">
        {modalityIntro.title}
      </h1>
      <p className="mt-6 max-w-3xl text-petroleum/80">{modalityIntro.description}</p>

      <ol className="mt-12 grid gap-8 md:grid-cols-4">
        {modalitySteps.map((step) => (
          <li key={step.number}>
            <p className="font-serif text-3xl text-petroleum">{step.number}</p>
            <h2 className="mt-2 font-serif text-xl">{step.title}</h2>
            <p className="mt-2 text-sm text-petroleum/80">{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid gap-4 md:grid-cols-2">
        {evaluationModes.map((mode) => (
          <article key={mode.number} className="border border-petroleum/10 bg-paper p-6">
            <p className="text-sm text-copper">{mode.number}</p>
            <h2 className="mt-2 font-serif text-2xl">{mode.title}</h2>
            <p className="mt-3 text-petroleum/80">{mode.description}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 text-petroleum/80">
        Una vez finalizada la evaluación, el informe puede recibirse sin
        necesidad de traslado.
      </p>
      <Link
        href={contactCta.href}
        className="mt-8 inline-flex bg-petroleum px-5 py-3 text-sm text-paper"
      >
        {contactCta.label}
      </Link>
    </section>
  );
}
