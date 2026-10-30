export const faqIntro = {
  kicker: "Preguntas frecuentes",
  title: "Antes de iniciar una consulta.",
  description: "Algunas respuestas para dar el primer paso con más claridad.",
  cta: "¿Otra consulta? Escribime",
} as const;

export const faq = [
  {
    id: "pericia-de-parte",
    question: "¿Cuál es la diferencia entre una pericia de parte y una pericia oficial?",
    answer:
      "La pericia oficial es producida dentro del proceso por el profesional designado judicialmente. La evaluación o pericia de parte es solicitada por una de las partes para contar con asesoramiento técnico propio, analizar antecedentes y formular observaciones fundadas.",
  },
  {
    id: "momento",
    question: "¿Cuándo conviene consultar?",
    answer:
      "Puede ser antes de un reclamo, durante una instancia administrativa o en un proceso judicial. La oportunidad depende del objetivo, del estado del trámite y de la documentación.",
  },
  {
    id: "documentacion",
    question: "¿Necesito toda la documentación para consultar?",
    answer:
      "No es imprescindible para la primera consulta. Lo disponible permite indicar qué falta.",
  },
  {
    id: "plazo",
    question: "¿Cuánto demora una evaluación o un informe?",
    answer:
      "Se confirma según la complejidad, la documentación, la necesidad de examen y la disponibilidad. Una fecha procesal se informa desde el primer contacto.",
  },
  {
    id: "reserva",
    question: "¿La información que comparto es confidencial?",
    answer:
      "Se usa para responder la consulta y se trata con reserva profesional.",
  },
  {
    id: "fuera-de-mar-del-plata",
    question: "¿Atiende casos fuera de Mar del Plata?",
    answer:
      "La evaluación presencial se realiza en Mar del Plata. La evaluación a distancia es una modalidad ofrecida y el informe puede recibirse sin traslado.",
  },
] as const;

export type FaqItem = (typeof faq)[number];
