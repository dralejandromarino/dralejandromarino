"use server";

/**
 * Acción de servidor del formulario de contacto.
 *
 * Valida los campos, limita los intentos por dirección IP y, si todo es
 * válido, envía el correo. El estado que devuelve lo consume `ContactForm`.
 */

import { consultationTypes, type ConsultationType } from "@/content/site";
import { clientIp } from "@/lib/email/client-ip";
import { sendConsultationEmail } from "@/lib/email/send";
import { toPlainText } from "@/lib/email/plain-text";
import { takeConsultationSlot } from "@/lib/email/rate-limit";
import {
  consultationLimits,
  initialConsultationState,
  type ConsultationState,
} from "@/lib/consultation";

/** Correo con dominio. Rechaza direcciones sin punto después de la arroba. */
const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Deja el valor listo para validar: descarta lo que no es texto, quita
 * caracteres de control y recorta espacios. Un archivo adjunto llega vacío.
 */
function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? toPlainText(value).trim() : "";
}

/** Comprueba que el tipo elegido exista entre los destinatarios publicados. */
function isConsultationType(value: string): value is ConsultationType {
  return consultationTypes.some((item) => item.value === value);
}

/**
 * Recibe el envío del formulario.
 *
 * El estado anterior no se reutiliza: cada llamada arma una respuesta nueva.
 * El tipo de consulta es opcional; nombre, correo y síntesis son obligatorios.
 */
export async function sendConsultation(
  _previous: ConsultationState,
  formData: FormData,
): Promise<ConsultationState> {
  const name = clean(formData.get("name"));
  const email = clean(formData.get("email"));
  const summary = clean(formData.get("summary"));
  const consultationTypeValue = clean(formData.get("consultationType"));

  const fieldErrors: ConsultationState["fieldErrors"] = {};

  if (!name || name.length > consultationLimits.name) {
    fieldErrors.name = name
      ? "El nombre es demasiado largo."
      : "Ingrese su nombre y apellido.";
  }

  if (
    !email ||
    email.length > consultationLimits.email ||
    !emailPattern.test(email)
  ) {
    fieldErrors.email = "Ingrese un correo electrónico válido.";
  }

  if (!summary || summary.length > consultationLimits.summary) {
    fieldErrors.summary = summary
      ? "La síntesis es demasiado larga."
      : "Escriba la síntesis del caso.";
  }

  let consultationType: ConsultationType | undefined;

  // Si no hay tipo, la consulta sigue. Si hay uno y no está en la lista, se rechaza.
  if (consultationTypeValue) {
    if (!isConsultationType(consultationTypeValue)) {
      fieldErrors.consultationType = "El tipo de consulta no es válido.";
    } else {
      consultationType = consultationTypeValue;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Revise los datos marcados antes de enviar.",
      fieldErrors,
    };
  }

  // El cupo se consume recién cuando los datos son válidos, para no penalizar un error de carga.
  if (!takeConsultationSlot(await clientIp())) {
    return {
      status: "error",
      message:
        "Excedió el límite de intentos de envío. Vuelva a intentar en unos minutos o comuníquese por teléfono o WhatsApp.",
      fieldErrors: {},
    };
  }

  try {
    await sendConsultationEmail({
      name,
      email,
      summary,
      consultationType,
    });
  } catch {
    // El mensaje al visitante no incluye el detalle del fallo del correo.
    return {
      ...initialConsultationState,
      status: "error",
      message:
        "No se pudo enviar la consulta. Intente de nuevo o comuníquese por teléfono o WhatsApp.",
    };
  }

  return {
    status: "success",
    message: "La consulta se envió.",
    fieldErrors: {},
  };
}
