/**
 * Textos de la página de servicios.
 *
 * La introducción la muestra la página. La lista la recorre `ServiceTabs`:
 * cada entrada es un destinatario, con su foto y el alcance de la intervención.
 */

/** Encabezado de la página y la nota que cierra la ficha del destinatario. */
export const servicesIntro = {
  kicker: "Asesoramiento especializado",
  title: "Asesoramiento especializado para cada necesidad.",
  description:
    "El objetivo es aportar una lectura médica comprensible, documentada y útil para la toma de decisiones, sin prometer resultados ni sustituir la función de los organismos o peritos oficiales.",
  note: "El alcance del asesoramiento se define según la documentación y las necesidades de cada caso.",
} as const;

/**
 * Los cuatro destinatarios, en el orden de la barra.
 *
 * `id` identifica la pestaña y el panel. `navLabel` es el texto de la barra
 * y puede diferir del título de la ficha, como en empresas. `items` es el
 * alcance que se lista al elegir ese destinatario.
 */
export const services = [
  {
    id: "estudios-juridicos",
    title: "Estudios jurídicos",
    navLabel: "Estudios jurídicos",
    kicker: "Apoyo técnico en litigios laborales, civiles y de seguros",
    image: "/images/servicios-estudios-juridicos.png",
    imageAlt: "Apretón de manos sobre un escritorio con documentos jurídicos",
    items: [
      "Evaluación preliminar",
      "Informes periciales de parte",
      "Revisión de pericias e impugnaciones",
      "Determinación y análisis de incapacidad",
    ],
  },
  {
    id: "empresas",
    title: "Empresas",
    navLabel: "Empresas y RR. HH.",
    kicker: "Asistencia médico-legal en contingencias laborales",
    image: "/images/servicios-empresas.png",
    imageAlt: "Sala de reuniones de una oficina",
    items: [
      "Auditoría médico-legal",
      "Evaluaciones de aptitud y reincorporación",
      "Análisis técnico de reclamos",
      "Informes y segunda opinión",
      "Asesoramiento preventivo",
    ],
  },
  {
    id: "particulares",
    title: "Particulares",
    navLabel: "Particulares",
    kicker: "Asesoramiento profesional frente a conflictos laborales",
    image: "/images/servicios-particulares.png",
    imageAlt: "Consulta entre un médico y una paciente",
    items: [
      "Consulta presencial o a distancia (remota)",
      "Determinación de incapacidad",
      "Informes médico-legales",
    ],
  },
  {
    id: "companias-de-seguros",
    title: "Compañías de seguros",
    navLabel: "Compañías de seguros",
    kicker: "Asistencia médico-legal a la aseguradora",
    image: "/images/servicios-seguros.png",
    imageAlt: "Reunión de trabajo revisando documentos y gráficos",
    items: [
      "Evaluación de siniestros y secuelas en asegurados",
      "Determinación de daño en siniestros de responsabilidad civil",
      "Auditorías médicas en Riesgos del Trabajo (ART)",
      "Asistencia médico-legal en seguros personales y corporativos",
    ],
  },
] as const;

/** Una entrada de `services`, con su identificador literal. */
export type Service = (typeof services)[number];
