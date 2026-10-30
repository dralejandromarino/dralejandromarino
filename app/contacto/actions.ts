"use server";

import { consultationTypes, type ConsultationType } from "@/content/site";
import {
  consultationLimits,
  initialConsultationState,
  type ConsultationState,
} from "@/lib/consultation";
import { sendConsultationEmail } from "@/lib/email";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function isConsultationType(value: string): value is ConsultationType {
  return consultationTypes.some((item) => item.value === value);
}

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

  try {
    await sendConsultationEmail({
      name,
      email,
      summary,
      consultationType,
    });
  } catch {
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
