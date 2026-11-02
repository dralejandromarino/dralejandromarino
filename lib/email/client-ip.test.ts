/**
 * Pruebas de la IP del visitante.
 *
 * Las cabeceras de Next se reemplazan por un doble. Cada caso fija qué
 * valor trae `x-real-ip` y `x-vercel-forwarded-for`.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { clientIp } from "./client-ip";

const headers = vi.hoisted(() => vi.fn());

vi.mock("next/headers", () => ({
  headers,
}));

/** Simula la lista de cabeceras que leería la función en el servidor. */
function setHeaders(values: Record<string, string | undefined>) {
  headers.mockResolvedValue({
    get(name: string) {
      return values[name] ?? null;
    },
  });
}

describe("clientIp", () => {
  beforeEach(() => {
    headers.mockReset();
  });

  it("prioriza x-real-ip cuando es una dirección válida", async () => {
    setHeaders({
      "x-real-ip": "  203.0.113.5  ",
      "x-vercel-forwarded-for": "198.51.100.9",
    });

    await expect(clientIp()).resolves.toBe("203.0.113.5");
  });

  it("toma el primer tramo de x-vercel-forwarded-for si x-real-ip no sirve", async () => {
    setHeaders({
      "x-real-ip": "no-es-una-ip",
      "x-vercel-forwarded-for": " 2001:db8::2 , 203.0.113.1",
    });

    await expect(clientIp()).resolves.toBe("2001:db8::2");
  });

  it("acepta el extremo de IPv4 y una IPv6 escrita en mayúsculas", async () => {
    setHeaders({ "x-real-ip": "255.255.255.255" });
    await expect(clientIp()).resolves.toBe("255.255.255.255");

    setHeaders({ "x-real-ip": "2001:DB8::1" });
    await expect(clientIp()).resolves.toBe("2001:DB8::1");
  });

  it("devuelve local cuando ninguna cabecera trae una IP usable", async () => {
    setHeaders({});
    await expect(clientIp()).resolves.toBe("local");

    setHeaders({
      "x-real-ip": "999.1.1.1",
      "x-vercel-forwarded-for": " , 203.0.113.1",
    });
    await expect(clientIp()).resolves.toBe("local");

    setHeaders({ "x-real-ip": "zz:zz" });
    await expect(clientIp()).resolves.toBe("local");
  });
});
