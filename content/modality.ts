/**
 * Textos de la página de modalidad.
 *
 * Presenta las dos formas de evaluación y el recorrido de cuatro pasos. Quien
 * consulta elige la modalidad al escribir; esta página no la selecciona.
 */

/** Antetítulo, título y bajada de la página. */
export const modalityIntro = {
  kicker: "Modalidad",
  title: "Evaluación presencial y evaluación a distancia",
  description:
    "Las dos modalidades se ofrecen de frente. La persona indica cuál necesita al enviar la consulta.",
} as const;

/** Recorrido de una consulta, de la primera comunicación al informe. */
export const modalitySteps = [
  {
    number: "01",
    title: "Consulta inicial",
    description:
      "Se identifica el problema, el destinatario del informe y la finalidad de la intervención.",
  },
  {
    number: "02",
    title: "Revisión",
    description:
      "Se analiza la documentación disponible y se identifican los antecedentes faltantes.",
  },
  {
    number: "03",
    title: "Evaluación",
    description:
      "Se realiza el examen presencial o la entrevista técnica, según la modalidad indicada.",
  },
  {
    number: "04",
    title: "Informe",
    description:
      "Se entrega una opinión médico-legal dentro del alcance acordado.",
  },
] as const;

/**
 * Las dos modalidades, en fichas paralelas.
 *
 * La presencial nombra la sede. La distancia aclara que el informe puede
 * recibirse sin traslado.
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
    description:
      "Se realiza con herramientas digitales. El informe puede recibirse sin traslado.",
  },
] as const;
