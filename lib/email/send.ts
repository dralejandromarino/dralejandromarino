/**
 * Envío del correo de consulta por Resend.
 *
 * Exige las tres variables de entorno y adjunta el isotipo si el archivo
 * está en el proyecto. Un fallo se lanza para que la acción de contacto lo
 * convierta en un mensaje genérico, sin el detalle del servicio.
 */
import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Resend } from "resend";
import { site, type ConsultationType } from "@/content/site";
import {
  buildConsultationHtml,
  buildConsultationText,
} from "./consultation-email";
import { toPlainText } from "./plain-text";

/** Consulta lista para enviar. El tipo sigue siendo opcional. */
export type ConsultationEmail = {
  name: string;
  email: string;
  summary: string;
  consultationType?: ConsultationType;
};

/** Isotipo del sitio. Se adjunta al correo y se referencia como `cid:mark-am`. */
const markPath = join(process.cwd(), "app/icon.png");

/** Lee el isotipo. Si el archivo no está, el correo sale igual, sin imagen. */
function markImage() {
  try {
    return readFileSync(markPath);
  } catch {
    return null;
  }
}

/**
 * Manda la consulta a la casilla configurada.
 *
 * `replyTo` es el correo de quien consultó, así que responder el mensaje le
 * escribe a esa persona. El destinatario real no se publica en el sitio.
 */
export async function sendConsultationEmail(input: ConsultationEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL?.trim();

  if (!apiKey || !from || !to) {
    throw new Error("Falta la configuración de correo.");
  }

  const mark = markImage();
  const resend = new Resend(apiKey);
  const subjectName = toPlainText(input.name).replaceAll(/\s+/g, " ").trim();
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `Consulta de ${subjectName} — ${site.origin}`,
    html: buildConsultationHtml(input, mark ? "cid:mark-am" : undefined),
    text: buildConsultationText(input),
    attachments: mark
      ? [
          {
            filename: "mark-am.png",
            content: mark,
            contentType: "image/png",
            contentId: "mark-am",
          },
        ]
      : undefined,
  });

  if (error) {
    throw new Error(error.message);
  }
}
