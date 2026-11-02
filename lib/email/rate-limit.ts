/**
 * Cupo de envíos del formulario.
 *
 * Permite dos consultas por IP cada diez minutos. El registro vive en la
 * memoria de este proceso: no se comparte entre instancias ni sobrevive a
 * un reinicio.
 */

/** Cantidad de envíos aceptados dentro de una ventana. */
const maxSends = 2;

/** Duración de la ventana, contada desde el primer envío aceptado. */
const windowMs = 10 * 60 * 1000;

/** Intentos ya aceptados para una IP y el instante en que empezó su ventana. */
type Window = {
  count: number;
  startedAt: number;
};

/** Ventanas abiertas, una por IP. */
const windows = new Map<string, Window>();

/**
 * Reserva un envío para la IP.
 *
 * Devuelve `true` cuando el intento entra en el cupo. El tercero, dentro de
 * los diez minutos, devuelve `false` y no incrementa el conteo. `now` se
 * puede pasar en las pruebas para no depender del reloj.
 */
export function takeConsultationSlot(ip: string, now = Date.now()) {
  forgetExpired(now);

  const current = windows.get(ip);

  if (!current) {
    windows.set(ip, { count: 1, startedAt: now });
    return true;
  }

  if (current.count >= maxSends) return false;

  current.count += 1;
  return true;
}

/** Descarta las ventanas ya vencidas para que la IP pueda volver a consultar. */
function forgetExpired(now: number) {
  for (const [ip, window] of windows) {
    if (now - window.startedAt >= windowMs) windows.delete(ip);
  }
}
