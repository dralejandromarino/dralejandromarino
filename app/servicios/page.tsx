import type { Metadata } from "next";
import { ServiceTabs } from "@/components/service-tabs";
import { servicesIntro } from "@/content/services";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Intervenciones para estudios jurídicos, empresas, particulares y compañías de seguros.",
};

export default function ServiciosPage() {
  return (
    <ServiceTabs>
      <p className="text-sm tracking-wide text-copper uppercase">
        {servicesIntro.kicker}
      </p>
      <h1 className="mt-3 max-w-2xl font-serif text-4xl text-petroleum">
        {servicesIntro.title}
      </h1>
      <p className="mt-6 max-w-3xl text-petroleum/80">{servicesIntro.description}</p>
    </ServiceTabs>
  );
}
