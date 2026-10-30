import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/faq-list";
import { faqIntro } from "@/content/faq";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Dudas habituales sobre pericias de parte, documentación, plazos, reserva profesional y atención fuera de Mar del Plata.",
};

export default function PreguntasPage() {
  return (
    <section className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-16 md:grid-cols-[0.85fr_1.15fr] md:gap-10 md:py-20 lg:gap-16">
      <div className="md:col-start-1 md:row-start-1">
        <p className="text-xs tracking-[0.16em] text-copper uppercase">
          {faqIntro.kicker}
        </p>
        <h1 className="mt-4 max-w-sm font-serif text-4xl leading-[1.1] text-petroleum md:text-5xl">
          {faqIntro.title}
        </h1>
        <p className="mt-5 max-w-sm leading-relaxed text-petroleum/75">
          {faqIntro.description}
        </p>
        <Link
          href="/contacto"
          className="mt-6 inline-flex items-center gap-2 text-sm text-petroleum"
        >
          {faqIntro.cta}
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
        </Link>
      </div>
      <div className="md:col-start-2 md:row-span-2 md:row-start-1">
        <FaqList />
      </div>
      <Image
        src="/images/preguntas.png"
        alt="Ilustración de personas alrededor de las letras FAQ"
        width={860}
        height={538}
        sizes="(min-width: 1024px) 24rem, 100vw"
        className="h-auto w-full max-w-sm md:col-start-1"
      />
    </section>
  );
}
