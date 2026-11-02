/**
 * Pruebas del envío por Resend.
 *
 * El cliente y la lectura del isotipo se reemplazan por dobles. Las
 * variables de entorno se restauran al terminar para no dejar el proceso
 * con la configuración de prueba.
 */
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { Resend } from "resend";
import { site } from "@/content/site";
import { sendConsultationEmail } from "./send";

const send = vi.hoisted(() => vi.fn());
const readFileSync = vi.hoisted(() => vi.fn());

vi.mock("resend", () => ({
  Resend: vi.fn(function Resend(this: { emails: { send: typeof send } }) {
    this.emails = { send };
  }),
}));

vi.mock("node:fs", () => ({
  readFileSync,
}));

/** Las tres variables que el envío exige. Si falta una, no se llama a Resend. */
const envNames = [
  "RESEND_API_KEY",
  "CONTACT_FROM_EMAIL",
  "CONTACT_TO_EMAIL",
] as const;

/** Valores que tenía el proceso antes de estas pruebas. */
const originalEnv = Object.fromEntries(
  envNames.map((name) => [name, process.env[name]]),
);

/** Consulta con espacios y un carácter oculto en el nombre, para ver el asunto limpio. */
const consultation = {
  name: "  Ana\u200B\nLópez  ",
  email: "ana@estudio.com",
  summary: "Evaluación presencial.",
  consultationType: "empresa" as const,
};

/**
 * Deja las tres variables listas y aplica los huecos del caso.
 *
 * Un valor `undefined` borra la variable, que es la forma de probar que falta.
 */
function setEnv(
  overrides: Partial<Record<(typeof envNames)[number], string | undefined>> = {},
) {
  process.env.RESEND_API_KEY = "re_test";
  process.env.CONTACT_FROM_EMAIL = "consultas@dralejandromarino.com";
  process.env.CONTACT_TO_EMAIL = "  buzon@example.com  ";

  for (const [name, value] of Object.entries(overrides)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
}

describe("sendConsultationEmail", () => {
  beforeEach(() => {
    send.mockReset();
    readFileSync.mockReset();
    vi.mocked(Resend).mockClear();
    send.mockResolvedValue({ data: { id: "email_1" }, error: null });
    readFileSync.mockReturnValue(Buffer.from("png"));
  });

  afterAll(() => {
    for (const name of envNames) {
      const value = originalEnv[name];
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  });

  it("envía el correo con respuesta al consultante, asunto normalizado e isotipo", async () => {
    setEnv();

    await sendConsultationEmail(consultation);

    expect(Resend).toHaveBeenCalledWith("re_test");
    expect(readFileSync).toHaveBeenCalledWith(
      expect.stringMatching(/app\/icon\.png$/),
    );
    expect(send).toHaveBeenCalledWith({
      from: "consultas@dralejandromarino.com",
      to: "buzon@example.com",
      replyTo: "ana@estudio.com",
      subject: `Consulta de Ana López — ${site.origin}`,
      html: expect.stringContaining("cid:mark-am"),
      text: expect.stringContaining("Evaluación presencial."),
      attachments: [
        {
          filename: "mark-am.png",
          content: Buffer.from("png"),
          contentType: "image/png",
          contentId: "mark-am",
        },
      ],
    });
  });

  it("arma el correo sin adjunto cuando el isotipo no se puede leer", async () => {
    setEnv();
    readFileSync.mockImplementation(() => {
      throw new Error("ENOENT");
    });

    await sendConsultationEmail(consultation);

    const payload = send.mock.calls[0][0];
    expect(payload.attachments).toBeUndefined();
    expect(payload.html).not.toContain("cid:mark-am");
    expect(payload.text).toContain("Tipo de consulta: Empresa");
  });

  it.each(envNames)(
    "falla si falta %s y no llama a Resend",
    async (name) => {
      setEnv({ [name]: undefined });

      await expect(sendConsultationEmail(consultation)).rejects.toThrow(
        "Falta la configuración de correo.",
      );
      expect(Resend).not.toHaveBeenCalled();
      expect(send).not.toHaveBeenCalled();
      expect(readFileSync).not.toHaveBeenCalled();
    },
  );

  it("trata un destinatario en blanco como configuración ausente", async () => {
    setEnv({ CONTACT_TO_EMAIL: "   " });

    await expect(sendConsultationEmail(consultation)).rejects.toThrow(
      "Falta la configuración de correo.",
    );
    expect(send).not.toHaveBeenCalled();
  });

  it("propaga el error que devuelve Resend", async () => {
    setEnv();
    send.mockResolvedValue({
      data: null,
      error: { message: "dominio no verificado" },
    });

    await expect(sendConsultationEmail(consultation)).rejects.toThrow(
      "dominio no verificado",
    );
  });
});
