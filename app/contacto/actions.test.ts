/**
 * Pruebas de la acción `sendConsultation`.
 *
 * El envío de correo y la IP se reemplazan por dobles, así cada caso
 * comprueba la validación, el cupo y el mensaje sin salir a la red.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  consultationLimits,
  initialConsultationState,
} from "@/lib/consultation";
import { sendConsultation } from "./actions";

const sendConsultationEmail = vi.hoisted(() => vi.fn());
const clientIp = vi.hoisted(() => vi.fn());

vi.mock("@/lib/email/send", () => ({
  sendConsultationEmail,
}));

vi.mock("@/lib/email/client-ip", () => ({
  clientIp,
}));

/** Datos que pasan todas las validaciones. Cada caso parte de aquí y cambia un campo. */
const valid = {
  name: "Ada Marino",
  email: "ada@estudio.com",
  summary: "Evaluación presencial por un reclamo laboral.",
  consultationType: "estudio-juridico",
};

/** Arma el `FormData` que recibiría la acción desde el formulario. */
function formData(fields: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

/** Construye un correo del largo indicado, con un dominio válido al final. */
function emailOfLength(length: number) {
  const domain = "@estudio.com";
  return `${"a".repeat(length - domain.length)}${domain}`;
}

describe("sendConsultation", () => {
  let ip = 0;

  beforeEach(() => {
    // Cada prueba usa otra IP para no arrastrar el cupo de la anterior.
    ip += 1;
    sendConsultationEmail.mockReset();
    sendConsultationEmail.mockResolvedValue(undefined);
    clientIp.mockReset();
    clientIp.mockResolvedValue(`198.51.100.${ip}`);
  });

  it("pide los campos obligatorios y no llega a enviar", async () => {
    const result = await sendConsultation(
      initialConsultationState,
      formData({
        name: "   ",
        email: "",
        summary: "\u200B",
        consultationType: "",
      }),
    );

    expect(result).toEqual({
      status: "error",
      message: "Revise los datos marcados antes de enviar.",
      fieldErrors: {
        name: "Ingrese su nombre y apellido.",
        email: "Ingrese un correo electrónico válido.",
        summary: "Escriba la síntesis del caso.",
      },
    });
    expect(clientIp).not.toHaveBeenCalled();
    expect(sendConsultationEmail).not.toHaveBeenCalled();
  });

  it("rechaza un nombre que no llega como texto", async () => {
    const data = formData({
      email: valid.email,
      summary: valid.summary,
    });
    data.set("name", new File(["Ada"], "ada.txt"));

    const result = await sendConsultation(initialConsultationState, data);

    expect(result.fieldErrors.name).toBe("Ingrese su nombre y apellido.");
    expect(sendConsultationEmail).not.toHaveBeenCalled();
  });

  it("marca nombre, correo y síntesis cuando superan el límite o el correo no tiene dominio", async () => {
    const result = await sendConsultation(
      initialConsultationState,
      formData({
        ...valid,
        name: "A".repeat(consultationLimits.name + 1),
        email: "ada@estudio",
        summary: "S".repeat(consultationLimits.summary + 1),
      }),
    );

    expect(result.status).toBe("error");
    expect(result.fieldErrors).toEqual({
      name: "El nombre es demasiado largo.",
      email: "Ingrese un correo electrónico válido.",
      summary: "La síntesis es demasiado larga.",
    });
    expect(sendConsultationEmail).not.toHaveBeenCalled();
  });

  it("rechaza un tipo de consulta desconocido", async () => {
    const result = await sendConsultation(
      initialConsultationState,
      formData({ ...valid, consultationType: "desconocido" }),
    );

    expect(result.fieldErrors.consultationType).toBe(
      "El tipo de consulta no es válido.",
    );
    expect(sendConsultationEmail).not.toHaveBeenCalled();
  });

  it("rechaza un correo que supera el largo permitido", async () => {
    const result = await sendConsultation(
      initialConsultationState,
      formData({
        ...valid,
        email: emailOfLength(consultationLimits.email + 1),
      }),
    );

    expect(result.fieldErrors.email).toBe(
      "Ingrese un correo electrónico válido.",
    );
    expect(sendConsultationEmail).not.toHaveBeenCalled();
  });

  it("envía la consulta con el texto limpio y el tipo indicado", async () => {
    const result = await sendConsultation(
      initialConsultationState,
      formData({
        name: "  Ada\u200B Marino  ",
        email: "  ada@estudio.com  ",
        summary: "  una\r\nlínea\u0000  ",
        consultationType: "particular",
      }),
    );

    expect(result).toEqual({
      status: "success",
      message: "La consulta se envió.",
      fieldErrors: {},
    });
    expect(sendConsultationEmail).toHaveBeenCalledWith({
      name: "Ada Marino",
      email: "ada@estudio.com",
      summary: "una\nlínea",
      consultationType: "particular",
    });
  });

  it("acepta el formulario en el límite de cada campo y sin tipo de consulta", async () => {
    const data = formData({
      name: "A".repeat(consultationLimits.name),
      email: emailOfLength(consultationLimits.email),
      summary: "S".repeat(consultationLimits.summary),
    });

    const result = await sendConsultation(initialConsultationState, data);

    expect(result.status).toBe("success");
    expect(sendConsultationEmail).toHaveBeenCalledWith({
      name: "A".repeat(consultationLimits.name),
      email: emailOfLength(consultationLimits.email),
      summary: "S".repeat(consultationLimits.summary),
      consultationType: undefined,
    });
  });

  it("corta el envío cuando la IP agotó los dos intentos de la ventana", async () => {
    clientIp.mockResolvedValue("203.0.113.77");
    const fields = formData(valid);

    await sendConsultation(initialConsultationState, fields);
    await sendConsultation(initialConsultationState, fields);
    const blocked = await sendConsultation(initialConsultationState, fields);

    expect(blocked).toEqual({
      status: "error",
      message:
        "Excedió el límite de intentos de envío. Vuelva a intentar en unos minutos o comuníquese por teléfono o WhatsApp.",
      fieldErrors: {},
    });
    expect(sendConsultationEmail).toHaveBeenCalledTimes(2);
  });

  it("responde con un mensaje genérico cuando el envío falla", async () => {
    sendConsultationEmail.mockRejectedValue(new Error("smtp secret"));

    const result = await sendConsultation(
      initialConsultationState,
      formData(valid),
    );

    expect(result).toEqual({
      status: "error",
      message:
        "No se pudo enviar la consulta. Intente de nuevo o comuníquese por teléfono o WhatsApp.",
      fieldErrors: {},
    });
    expect(result.message).not.toContain("smtp secret");
  });
});
