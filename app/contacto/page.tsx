import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { site, whatsappHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Envíe una consulta al Dr. Alejandro Marino e indique si necesita evaluación presencial o a distancia. Teléfono, WhatsApp y correo en Mar del Plata.",
};

export default function ContactoPage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.4fr_0.8fr]">
      <div>
        <p className="text-sm tracking-wide text-copper uppercase">Consulta y contacto</p>
        <h1 className="mt-3 font-serif text-4xl text-petroleum">
          Describa brevemente su caso, detallando si requiere una evaluación
          presencial o a distancia.
        </h1>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
      <aside className="lg:pt-28">
        <p className="text-petroleum/80">
          Con una síntesis del problema, el destinatario del informe y la
          instancia en la que se encuentra, podremos indicar qué evaluación
          corresponde y qué documentación sería conveniente aportar.
        </p>
        <ul className="mt-8 space-y-3 text-sm">
          <li>
            {site.address} · {site.city}
          </li>
          <li>
            <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
          </li>
          <li>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              {site.whatsappDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
        </ul>
      </aside>
    </section>
  );
}
