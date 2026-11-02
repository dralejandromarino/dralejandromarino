/**
 * Mapa del sitio para los buscadores.
 *
 * Lista las rutas públicas definidas en `content/site`. Next lo publica
 * en `/sitemap.xml`.
 */
import type { MetadataRoute } from "next";
import { publicPages, site } from "@/content/site";

/** Arma una entrada por página, con la dirección absoluta y su prioridad. */
export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map((page) => ({
    url: `${site.url}${page.path === "/" ? "" : page.path}`,
    changeFrequency: "monthly",
    priority: page.priority,
  }));
}
