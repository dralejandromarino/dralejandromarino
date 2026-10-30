import "server-only";
import { Resend } from "resend";
import { consultationTypes, site, type ConsultationType } from "@/content/site";

export type ConsultationEmail = {
  name: string;
  email: string;
  summary: string;
  consultationType?: ConsultationType;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function paragraph(label: string, value: string) {
  const html = escapeHtml(value).replaceAll("\n", "<br>");
  return `<p><strong>${escapeHtml(label)}</strong><br>${html}</p>`;
}

export function buildConsultationHtml(input: ConsultationEmail) {
  const blocks = [
    paragraph("Nombre y apellido", input.name),
    paragraph("Correo electrónico", input.email),
  ];

  if (input.consultationType) {
    const label = consultationTypes.find(
      (item) => item.value === input.consultationType,
    )?.label;

    if (label) {
      blocks.push(paragraph("Tipo de consulta", label));
    }
  }

  blocks.push(paragraph("Síntesis del caso", input.summary));
  blocks.push(paragraph("Origen", site.origin));

  return blocks.join("");
}

export async function sendConsultationEmail(input: ConsultationEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error("Falta la configuración de correo.");
  }

  const resend = new Resend(apiKey);
  const subjectName = input.name.replaceAll(/\s+/g, " ").trim();
  const { error } = await resend.emails.send({
    from,
    to: site.email,
    replyTo: input.email,
    subject: `Consulta de ${subjectName} — ${site.origin}`,
    html: buildConsultationHtml(input),
  });

  if (error) {
    throw new Error(error.message);
  }
}
