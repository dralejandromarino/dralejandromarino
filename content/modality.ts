export const modalityIntro = {
  kicker: "Modalidad",
  title: "Evaluación presencial y evaluación a distancia",
  description:
    "Las dos modalidades se ofrecen de frente. La persona indica cuál necesita al enviar la consulta.",
} as const;

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
