import Image from "next/image";
import Link from "next/link";
import { experience } from "@/content/experience";
import { contactCta, site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:py-20">
        <div>
          <p className="text-xs tracking-[0.16em] text-copper uppercase">
            Especialista en medicina legal · {site.city}
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-petroleum md:text-[3.25rem] lg:text-[3.5rem]">
            <span className="block">Evaluaciones</span>
            <span className="block">médico-legales</span>
            <span className="block whitespace-nowrap">y Auditoría médica</span>
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-petroleum/80">
            Asesoramiento especializado para Estudios jurídicos, Compañías de
            seguros, Empresas y Particulares. Análisis documental, evaluación
            clínica e informes técnicamente fundados para orientar decisiones y
            controversias.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={contactCta.href}
              className="inline-flex items-center justify-center gap-3 rounded-md bg-petroleum px-5 py-3 text-sm text-paper"
            >
              Solicitar una evaluación
              <ArrowIcon />
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-sm text-petroleum"
            >
              Conocer servicios
              <ArrowIcon />
            </Link>
          </div>
        </div>
        <figure className="w-full max-w-[25.5rem] justify-self-end">
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

      <section id="experiencia" className="mx-auto max-w-6xl px-5 pb-20">
        <p className="text-sm tracking-wide text-copper uppercase">
          {experience.kicker}
        </p>
        <h2 className="mt-3 font-serif text-3xl text-petroleum">
          {experience.title}
        </h2>
        <ol className="mt-8 space-y-3">
          {experience.areas.map((area, index) => (
            <li key={area.title} className="border border-petroleum/10 bg-paper px-4 py-4">
              <p className="text-sm text-copper">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-serif text-xl">{area.title}</h3>
              <p className="mt-1 text-petroleum/80">{area.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

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
