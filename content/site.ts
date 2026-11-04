/**
 * Identidad, contacto y navegación del sitio.
 *
 * Los textos que identifican al doctor viven acá. El correo público no es la
 * casilla que recibe el formulario: esa está en `CONTACT_TO_EMAIL`.
 */

/**
 * Datos que se repiten en encabezado, pie, contacto y metadatos.
 *
 * `phoneDisplay` es el número tal como se lee. `phoneTel` es el que usa el
 * enlace `tel:`. Lo mismo ocurre con WhatsApp: uno se muestra y el otro,
 * sin signos, arma el enlace. `role` es la función de auditor y no forma
 * parte del título profesional.
 */
export const site = {
  name: "Dr. Alejandro Marino",
  fullName: "Dr. Daniel Alejandro Marino",
  specialty: "Consultoría médico-legal",
  license: "Matrícula Provincial N.º 94.131",
  professionalTitle:
    "Médico especialista en cirugía general y especialista en medicina legal y medicina laboral",
  role: "Auditor de servicios de salud",
  phoneDisplay: "0223 451 1812",
  phoneTel: "+542234511812",
  whatsappDisplay: "+54 9 223 602-8090",
  whatsappE164: "5492236028090",
  whatsappMessage: "Hola, quisiera realizar una consulta médico-legal",
  email: "info@ppgascon.com",
  address: "Gascón 1622",
  city: "Mar del Plata",
  placeLine: "Mar del Plata · Policlínica Privada Gascón",
  origin: "dralejandromarino.com",
  url: "https://dralejandromarino.com",
  offerTitle: "Consultoría legal e informes médicos",
} as const;

/**
 * Opciones del formulario de contacto.
 *
 * `value` viaja en el envío y `label` es lo que ve quien consulta. El
 * formulario también permite dejar el tipo sin indicar.
 */
export const consultationTypes = [
  { value: "estudio-juridico", label: "Estudio jurídico" },
  { value: "compania-de-seguros", label: "Compañía de seguros" },
  { value: "empresa", label: "Empresa" },
  { value: "particular", label: "Particular" },
] as const;

/** Valores aceptados por la acción de servidor. Sale de `consultationTypes`. */
export type ConsultationType = (typeof consultationTypes)[number]["value"];

/**
 * Rutas que entran al sitemap.
 *
 * La prioridad orienta a los buscadores: la portada pesa más que el resto
 * y el contacto queda apenas por debajo.
 */
export const publicPages = [
  { path: "/", priority: 1 },
  { path: "/servicios", priority: 0.8 },
  { path: "/perfil", priority: 0.8 },
  { path: "/preguntas", priority: 0.6 },
  { path: "/contacto", priority: 0.9 },
] as const;

/** Enlaces del encabezado. El contacto no está acá: va en el botón aparte. */
export const mainNav = [
  { href: "/servicios", label: "Servicios" },
  { href: "/perfil", label: "Perfil profesional" },
  { href: "/preguntas", label: "Preguntas" },
] as const;

/** Enlaces del pie. Suma la experiencia de la portada y la página de contacto. */
export const footerNav = [
  ...mainNav,
  { href: "/#experiencia", label: "Experiencia" },
  { href: "/contacto", label: "Contacto" },
] as const;

/** Botón "Consulte su caso" del menú. */
export const contactCta = {
  href: "/contacto",
  label: "Consulte su caso",
} as const;

/** Arma el enlace de WhatsApp con el mensaje inicial ya escrito. */
export function whatsappHref() {
  const text = encodeURIComponent(site.whatsappMessage);
  return `https://wa.me/${site.whatsappE164}?text=${text}`;
}

/**
 * Textos de la página de perfil.
 *
 * `areas` incluye la función de auditor junto con las especialidades.
 * `credentials` lista solo los títulos.
 */
export const profile = {
  kicker: "Dirección profesional",
  quote:
    "Cada intervención procura integrar antecedentes, examen clínico y criterios médico-legales en una conclusión clara, fundada y ajustada al objeto de la consulta.",
  quoteBy: "Alejandro Marino",
  summary:
    "Médico cirujano general, especialista en medicina laboral y medicina legal, con experiencia en evaluaciones de incapacidad, informes periciales y asesoramiento técnico para Estudios jurídicos, Compañías de seguros, Empresas y Particulares.",
  cardKicker: "Perfil profesional",
  cardRole: "Médico especialista",
  cardPlace: "Mar del Plata · Buenos Aires",
  areas: [
    "Medicina laboral",
    "Medicina legal",
    "Cirugía general",
    "Auditor de servicios de salud",
    "Pericias médicas",
  ],
  credentials: [
    "Médico cirujano general",
    "Especialista en medicina laboral",
    "Especialista en medicina legal",
  ],
} as const;
