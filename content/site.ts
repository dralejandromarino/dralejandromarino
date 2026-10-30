export const site = {
  name: "Dr. Alejandro Marino",
  fullName: "Dr. Daniel Alejandro Marino",
  specialty: "Medicina legal",
  topbar: "Consultoría médico-legal",
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
  offerTitle: "Evaluaciones médico-legales y auditoría médica",
} as const;

export const consultationTypes = [
  { value: "estudio-juridico", label: "Estudio jurídico" },
  { value: "compania-de-seguros", label: "Compañía de seguros" },
  { value: "empresa", label: "Empresa" },
  { value: "particular", label: "Particular" },
] as const;

export type ConsultationType = (typeof consultationTypes)[number]["value"];

export const publicPages = [
  { path: "/", priority: 1 },
  { path: "/servicios", priority: 0.8 },
  { path: "/perfil", priority: 0.8 },
  { path: "/preguntas", priority: 0.6 },
  { path: "/modalidad", priority: 0.7 },
  { path: "/contacto", priority: 0.9 },
] as const;

export const mainNav = [
  { href: "/servicios", label: "Servicios" },
  { href: "/perfil", label: "Perfil profesional" },
  { href: "/preguntas", label: "Preguntas" },
  { href: "/modalidad", label: "Modalidad" },
] as const;

export const footerNav = [
  ...mainNav,
  { href: "/#experiencia", label: "Experiencia" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const contactCta = {
  href: "/contacto",
  label: "Consultar un caso",
} as const;

export function whatsappHref() {
  const text = encodeURIComponent(site.whatsappMessage);
  return `https://wa.me/${site.whatsappE164}?text=${text}`;
}

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
