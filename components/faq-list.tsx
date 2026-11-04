"use client";

/**
 * Listado de preguntas frecuentes.
 *
 * Solo una respuesta queda abierta. La primera viene desplegada para que la
 * página no arranque con todo el contenido oculto. Abrir y cerrar usa la
 * misma curva que el resto del sitio; la respuesta sale del documento
 * cuando termina de cerrarse.
 */
import { useEffect, useRef, useState, type CSSProperties, type TransitionEvent } from "react";
import { faq, type FaqItem } from "@/content/faq";

/** Acordeón de las preguntas definidas en `content/faq`. */
export function FaqList() {
  const [openId, setOpenId] = useState<FaqItem["id"] | null>(faq[0].id);
  const [mountedIds, setMountedIds] = useState<FaqItem["id"][]>([faq[0].id]);
  const openIdRef = useRef(openId);
  const keepInitialOpen = useRef(true);
  openIdRef.current = openId;

  /** Abre la pregunta elegida, o la cierra si ya era la abierta. */
  function toggle(id: FaqItem["id"]) {
    setOpenId((current) => (current === id ? null : id));
    setMountedIds((current) => (current.includes(id) ? current : [...current, id]));
  }

  /** Quita la respuesta recién cerrada, salvo que se haya vuelto a abrir. */
  function unmount(id: FaqItem["id"]) {
    if (openIdRef.current === id) return;
    if (id === faq[0].id) keepInitialOpen.current = false;
    setMountedIds((current) => current.filter((item) => item !== id));
  }

  return (
    <div data-testid="faq-list" className="divide-y divide-petroleum/15 border-y border-petroleum/15">
      {faq.map((item, index) => {
        const open = openId === item.id;
        const panelId = `respuesta-${item.id}`;

        return (
          <div
            key={item.id}
            className="reveal"
            style={{ "--reveal-delay": `${Math.min(index, 5) * 55}ms` } as CSSProperties}
          >
            <button
              type="button"
              data-testid={`faq-${item.id}`}
              className="flex w-full items-start justify-between gap-6 py-5 text-left font-serif text-lg text-petroleum"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
            >
              {item.question}
              <span className="mt-1 text-copper" aria-hidden="true">
                {open ? "−" : "+"}
              </span>
            </button>
            {mountedIds.includes(item.id) ? (
              <FaqPanel
                id={panelId}
                testId={`faq-answer-${item.id}`}
                open={open}
                initiallyOpen={keepInitialOpen.current && item.id === faq[0].id}
                answer={item.answer}
                onClosed={() => unmount(item.id)}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Respuesta de una pregunta.
 *
 * La primera de la página entra ya abierta. Las demás se pintan cerradas
 * un instante y después crecen, para que la transición tenga de dónde partir.
 */
function FaqPanel({
  id,
  testId,
  open,
  initiallyOpen,
  answer,
  onClosed,
}: {
  id: string;
  testId: string;
  open: boolean;
  initiallyOpen: boolean;
  answer: string;
  onClosed: () => void;
}) {
  const [expanded, setExpanded] = useState(initiallyOpen);
  const skipOpenAnimation = useRef(initiallyOpen);
  const onClosedRef = useRef(onClosed);
  onClosedRef.current = onClosed;

  useEffect(() => {
    if (!open) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        onClosedRef.current();
        return;
      }
      setExpanded(false);
      return;
    }

    if (skipOpenAnimation.current) {
      skipOpenAnimation.current = false;
      setExpanded(true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setExpanded(true);
      return;
    }

    // Dos cuadros: el primero deja la respuesta cerrada y el segundo inicia la apertura.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => setExpanded(true));
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (open || expanded) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => onClosedRef.current(), 700);
    return () => window.clearTimeout(timer);
  }, [open, expanded]);

  /** Al terminar de cerrarse, la respuesta deja de estar en la página. */
  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== "grid-template-rows" || open) return;
    onClosedRef.current();
  }

  return (
    <div
      id={id}
      data-open={expanded ? "true" : "false"}
      className="faq-panel"
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="faq-panel-inner">
        <p
          data-testid={testId}
          className="max-w-2xl pb-5 text-sm leading-relaxed text-petroleum/75"
        >
          {answer}
        </p>
      </div>
    </div>
  );
}
