/**
 * Reglas para los rastreadores.
 *
 * Permite indexar todo el sitio e indica dónde está el mapa. Next lo
 * publica en `/robots.txt`.
 */
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Autoriza el rastreo del sitio completo y señala el sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
