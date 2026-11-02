/**
 * Pruebas del cupo de envíos.
 *
 * El registro es el de verdad y se comparte entre casos, así que cada uno
 * usa una IP distinta. El reloj se pasa a mano para no esperar diez minutos.
 */
import { describe, expect, it } from "vitest";
import { takeConsultationSlot } from "./rate-limit";

/** Misma ventana que el módulo: diez minutos desde el primer envío. */
const windowMs = 10 * 60 * 1000;

/** Instante fijo. Los casos suman milisegundos a partir de aquí. */
const start = 1_700_000_000_000;

describe("takeConsultationSlot", () => {
  it("acepta los dos primeros envíos de una IP", () => {
    const ip = "203.0.113.10";

    expect(takeConsultationSlot(ip, start)).toBe(true);
    expect(takeConsultationSlot(ip, start + 1_000)).toBe(true);
  });

  it("rechaza el tercer envío dentro de la ventana y no afecta a otra IP", () => {
    const ip = "203.0.113.20";
    const other = "203.0.113.21";

    takeConsultationSlot(ip, start);
    takeConsultationSlot(ip, start + 1_000);

    expect(takeConsultationSlot(ip, start + 2_000)).toBe(false);
    expect(takeConsultationSlot(ip, start + windowMs - 1)).toBe(false);
    expect(takeConsultationSlot(other, start + 2_000)).toBe(true);
  });

  it("vuelve a aceptar un envío cuando se cumple la ventana de 10 minutos", () => {
    const ip = "203.0.113.30";

    takeConsultationSlot(ip, start);
    takeConsultationSlot(ip, start + 1_000);

    expect(takeConsultationSlot(ip, start + windowMs)).toBe(true);
  });
});
