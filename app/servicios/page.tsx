/**
 * Página de servicios.
 *
 * Muestra la introducción de la oferta. Las cuatro audiencias (estudios
 * jurídicos, empresas, particulares y compañías de seguros) las arma
 * `ServiceTabs` a partir de `content/services`.
 */
import type { Metadata } from "next";
import { ServiceTabs } from "@/components/service-tabs";
import { servicesIntro } from "@/content/services";

/** Título y descripción propios de esta ruta. El layout les agrega el nombre del sitio. */
export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Intervenciones para estudios jurídicos, empresas, particulares y compañías de seguros.",
};

/** Encabezado de la página. El detalle de cada destinatario vive dentro de `ServiceTabs`. */
export default function ServiciosPage() {
  return (
    <ServiceTabs>
      <div>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-copper uppercase">
          {servicesIntro.kicker}
        </p>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:gap-12 lg:gap-20">
          <h1
            data-testid="services-title"
            className="min-w-0 font-serif text-[2rem] leading-[1.2] text-petroleum md:w-[58%] md:max-w-[41rem] md:shrink-0 md:text-[2.75rem]"
          >
            <span className="block">Asesoramiento especializado</span>
            <span className="block">para cada necesidad.</span>
          </h1>
          <p className="min-w-0 max-w-xl text-base leading-relaxed text-[#617278] md:flex-1">
            {servicesIntro.description}
          </p>
        </div>
      </div>
    </ServiceTabs>
  );
}
