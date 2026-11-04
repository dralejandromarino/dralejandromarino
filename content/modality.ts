/**
 * Textos de `/contacto`.
 *
 * Arriba, el recorrido de la consulta y las dos fichas de evaluación.
 * Debajo, el título del formulario.
 */

/** Antetítulo, título y bajada de la consulta. */
export const consultaIntro = {
  kicker: "Consulta y contacto",
  title: "Consulte su caso",
  description:
    "Podrá acceder a evaluaciones médicas y preinformes de factibilidad mediante una modalidad ágil y a distancia, sin necesidad de trasladarse.",
} as const;

/** Tres pasos, de la primera comunicación al informe pericial. */
export const consultaSteps = [
  {
    number: "01",
    title: "Consulta digital inicial",
    description:
      "Recibimos su consulta por correo y realizamos una evaluación documental del caso.",
  },
  {
    number: "02",
    title: "Evaluación documental",
    description:
      "Le enviamos un preinforme de factibilidad según las consideraciones médico-legales y laborales obtenidas del análisis documental del caso.",
  },
  {
    number: "03",
    title: "Redacción de informe médico pericial",
    description:
      "Cuando corresponda, se redacta un informe pericial de parte médico con las consideraciones médico-legales y laborales del caso.",
  },
] as const;

/**
 * Las dos evaluaciones, en fichas paralelas.
 *
 * La presencial nombra la sede. La distancia queda en la herramienta,
 * sin la frase sobre recibir el informe sin traslado.
 */
export const evaluationModes = [
  {
    number: "01",
    title: "Evaluación presencial",
    description: "Se realiza en Gascón 1622, Mar del Plata.",
  },
  {
    number: "02",
    title: "Evaluación a distancia",
    description: "Se realiza con herramientas digitales.",
  },
] as const;

/** Título que queda encima del formulario, en la sección de contacto. */
export const contactFormTitle =
  "Describa brevemente su caso, detallando si requiere una evaluación presencial o a distancia.";
