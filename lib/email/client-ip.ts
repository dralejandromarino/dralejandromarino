/**
 * Dirección de quien envía el formulario.
 *
 * Sirve para el cupo de envíos. Solo corre en el servidor: las cabeceras
 * de la petición no están disponibles en el navegador.
 */
import "server-only";
import { headers } from "next/headers";

/** Cuatro grupos numéricos. El rango de cada octeto se revisa aparte. */
const ipv4 = /^(?:\d{1,3}\.){3}\d{1,3}$/;

/** Forma laxa de una IPv6. `isIp` exige además que contenga dos puntos. */
const ipv6 = /^[0-9a-f:.]{2,45}$/i;

/**
 * Elige una IP usable para identificar el intento.
 *
 * Prefiere `x-real-ip`. Si no es válida, toma el primer tramo de
 * `x-vercel-forwarded-for`. Sin ninguna de las dos, devuelve `local`: en
 * desarrollo todos los envíos comparten ese mismo cupo.
 */
export async function clientIp() {
  const headerList = await headers();
  const realIp = headerList.get("x-real-ip")?.trim() ?? "";

  if (isIp(realIp)) return realIp;

  const vercelIp =
    headerList.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ?? "";

  if (isIp(vercelIp)) return vercelIp;

  return "local";
}

/** Acepta una IPv4 con octetos de 0 a 255, o una IPv6 que realmente lleve `:`. */
function isIp(value: string) {
  if (ipv4.test(value)) {
    return value.split(".").every((part) => Number(part) <= 255);
  }

  return value.includes(":") && ipv6.test(value);
}
