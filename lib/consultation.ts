/**
 * Contrato compartido del formulario de consulta.
 *
 * Lo usan la acción de servidor y `ContactForm`: los largos máximos, la
 * forma de los errores y el estado con el que arranca el envío.
 */

/** Tope de cada campo. El del correo sigue el largo práctico de una dirección. */
export const consultationLimits = {
  name: 120,
  email: 254,
  summary: 4000,
} as const;

/** Mensaje de un campo que no pasó la validación. Los ausentes están bien. */
export type ConsultationFieldErrors = {
  name?: string;
  email?: string;
  summary?: string;
  consultationType?: string;
};

/**
 * Resultado que la acción devuelve al formulario.
 *
 * `idle` es el estado inicial, `success` confirma el envío y `error` cubre
 * tanto un campo inválido como un fallo del correo o del cupo.
 */
export type ConsultationState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: ConsultationFieldErrors;
};

/** Estado que recibe `useActionState` antes del primer envío. */
export const initialConsultationState: ConsultationState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
