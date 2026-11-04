"use client";

/**
 * Destinatarios de la página de servicios.
 *
 * Una barra elige entre estudios jurídicos, empresas, particulares y
 * compañías de seguros. `children` es la introducción que arma la página.
 */
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { services, servicesIntro, type Service } from "@/content/services";

/**
 * Barra de destinatarios y ficha del elegido.
 *
 * En pantallas chicas la lista se pliega. La foto y el texto alternan de
 * lado según el índice del destinatario.
 */
export function ServiceTabs({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<Service["id"]>(services[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeIndex = Math.max(
    0,
    services.findIndex((service) => service.id === activeId),
  );
  const active = services[activeIndex];
  const imageFirst = activeIndex % 2 === 0;

  /** Cambia el destinatario y cierra el menú de pantallas chicas. */
  function selectService(id: Service["id"]) {
    setActiveId(id);
    setMenuOpen(false);
  }

  const portrait = (
    <div className="relative aspect-[342/390] w-full shrink-0 overflow-hidden rounded-[6px] rounded-tl-[7.25rem] bg-paper md:aspect-[527/506] md:w-[46%] md:max-w-[527px] md:rounded-tl-[180px]">
      <Image
        src={active.image}
        alt={active.imageAlt}
        fill
        quality={90}
        sizes="(min-width: 768px) 527px, 100vw"
        className="object-cover"
      />
    </div>
  );

  const copy = (
    <div className="min-w-0 md:flex-1">
      <p className="text-xs font-medium tracking-[0.07em] text-copper uppercase">
        {String(activeIndex + 1).padStart(2, "0")} - {active.kicker}
      </p>
      <h2 className="mt-4 font-serif text-[2rem] leading-[1.15] text-petroleum md:text-[2.5rem]">
        {active.title}
      </h2>
      <div className="mt-4 h-px w-12 bg-copper" aria-hidden="true" />
      <ol className="mt-4 flex flex-col gap-4">
        {active.items.map((item, index) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-lg border border-[#d9dfdb] bg-paper p-4"
          >
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-ivory font-serif text-sm text-copper">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-base leading-7 text-[#617278]">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <>
      {/* Selector. En móvil es un botón que despliega la lista. */}
      <div className="border-b border-petroleum/10 bg-ivory">
        <div className="mx-auto max-w-6xl px-5">
          <button
            type="button"
            data-testid="services-menu-toggle"
            className="flex w-full items-center justify-between py-4 text-[11px] font-semibold tracking-[0.14em] text-petroleum uppercase md:hidden"
            aria-expanded={menuOpen}
            aria-controls="destinatarios"
            onClick={() => setMenuOpen((current) => !current)}
          >
            Servicios
            <svg
              viewBox="0 0 20 20"
              className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <path
                d="M5 7.5 10 12.5 15 7.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="md:flex md:items-center md:gap-8 md:py-4">
            <p className="hidden text-[11px] font-semibold tracking-[0.14em] text-copper uppercase md:block">
              Servicios
            </p>
            <div
              id="destinatarios"
              data-testid="services-tabs"
              className={`${menuOpen ? "flex" : "hidden"} flex-col pb-2 md:flex md:flex-row md:flex-wrap md:items-center md:gap-8 md:pb-0`}
              role="tablist"
              aria-label="Destinatarios"
            >
              {services.map((service) => (
                <ServiceTab
                  key={service.id}
                  service={service}
                  selected={service.id === active.id}
                  onSelect={selectService}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <section data-testid="services" className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        {children}
        {/* `key` reinicia la animación cada vez que cambia el destinatario. */}
        <div
          key={active.id}
          role="tabpanel"
          data-testid={`service-panel-${active.id}`}
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="service-swap mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-center md:gap-16"
        >
          {imageFirst ? portrait : copy}
          {imageFirst ? copy : portrait}
        </div>
        <p className="mt-9 text-xs leading-relaxed text-[#617278]">{servicesIntro.note}</p>
      </section>
    </>
  );
}

/** Una pestaña de la barra. El panel asociado se identifica con el mismo id. */
function ServiceTab({
  service,
  selected,
  onSelect,
}: {
  service: Service;
  selected: boolean;
  onSelect: (id: Service["id"]) => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      data-testid={`service-tab-${service.id}`}
      id={`tab-${service.id}`}
      aria-selected={selected}
      aria-controls={`panel-${service.id}`}
      className={`nav-link inline-block py-3 text-left text-sm md:py-0 ${selected ? "text-petroleum" : "text-[#617278]"}`}
      onClick={() => onSelect(service.id)}
    >
      {service.navLabel}
    </button>
  );
}
