"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { services, type Service } from "@/content/services";

export function ServiceTabs({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<Service["id"]>(services[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = services.find((service) => service.id === activeId) ?? services[0];

  function selectService(id: Service["id"]) {
    setActiveId(id);
    setMenuOpen(false);
  }

  return (
    <>
      <div className="border-b border-petroleum/10 bg-ivory">
        <div className="mx-auto max-w-6xl px-5">
          <button
            type="button"
            className="flex w-full items-center gap-2 py-3 text-sm text-petroleum md:hidden"
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
          <div className="md:flex md:items-center md:gap-8 md:py-3">
            <p className="hidden text-[0.7rem] tracking-[0.14em] text-copper uppercase md:block">
              Servicios
            </p>
            <div
              id="destinatarios"
              className={`${menuOpen ? "flex" : "hidden"} flex-col gap-3 pb-4 md:flex md:flex-row md:flex-wrap md:items-center md:gap-6 md:pb-0`}
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
      <section className="mx-auto max-w-6xl px-5 py-16">
        {children}
        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="mt-12 grid items-start gap-8 md:grid-cols-2"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl rounded-tl-[4.5rem] bg-paper">
            <Image
              src={active.image}
              alt={active.imageAlt}
              fill
              sizes="(min-width: 768px) 32rem, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm tracking-wide text-copper uppercase">{active.kicker}</p>
            <h2 className="mt-3 font-serif text-3xl text-petroleum">{active.title}</h2>
            <ol className="mt-6 space-y-3">
              {active.items.map((item, index) => (
                <li key={item} className="border border-petroleum/10 bg-paper px-4 py-3">
                  <span className="mr-3 text-sm text-copper">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}

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
      id={`tab-${service.id}`}
      aria-selected={selected}
      aria-controls={`panel-${service.id}`}
      className={`text-left text-sm text-petroleum ${selected ? "underline underline-offset-4" : "text-petroleum/70"}`}
      onClick={() => onSelect(service.id)}
    >
      {service.navLabel}
    </button>
  );
}
