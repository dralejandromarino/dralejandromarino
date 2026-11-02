"use client";

/**
 * Aparición al entrar en pantalla.
 *
 * Busca los elementos con la clase `.reveal` y les agrega `.is-visible`
 * cuando corresponden. El estilo de esa transición vive en `globals.css`.
 */
import { useLayoutEffect, useRef, type ReactNode } from "react";

/** Indica si el elemento ya asoma en el tramo superior de la ventana. */
function inView(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewport = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewport * 0.88 && rect.bottom > 0;
}

/**
 * Envuelve un bloque y anima sus `.reveal`.
 *
 * `contents` evita que este div cree una caja y rompa la grilla del hijo.
 */
export function RevealOnScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = [...root.querySelectorAll<HTMLElement>(".reveal")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Con movimiento reducido, el contenido queda visible de inmediato.
    if (reduce) {
      for (const item of items) item.classList.add("is-visible");
      return;
    }

    const pending = items.filter((item) => !inView(item));
    const visible = items.filter((item) => inView(item));
    // Dos cuadros de espera: el primero pinta el estado oculto y el segundo inicia la transición.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        for (const item of visible) item.classList.add("is-visible");
      });
    });

    if (pending.length === 0) return () => cancelAnimationFrame(frame);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" },
    );

    pending.forEach((item) => observer.observe(item));
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
