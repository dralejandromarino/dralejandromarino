/**
 * Cuerpo del correo de una consulta.
 *
 * Arma dos versiones del mismo mensaje: HTML, para leerlo con la identidad
 * del sitio, y texto plano, para los clientes que no muestran HTML. Los
 * datos de quien consulta pasan por el saneado de `plain-text`.
 */
import { consultationTypes, site, type ConsultationType } from "@/content/site";
import { escapeHtml, textToHtml, toPlainText } from "./plain-text";

/** Familias con respaldo. El correo no puede depender de las fuentes del sitio. */
const serif = "Georgia, 'Iowan Old Style', 'Palatino Linotype', Palatino, serif";
const sans = "'Segoe UI', Helvetica, Arial, sans-serif";

/** Datos ya validados que entran en el mensaje. El tipo puede faltar. */
export type ConsultationEmailContent = {
  name: string;
  email: string;
  summary: string;
  consultationType?: ConsultationType;
};

/**
 * Arma el HTML del correo.
 *
 * El diseño usa tablas e estilos en línea para que se vea igual en los
 * clientes de correo. `markSrc` es la dirección del isotipo; si no viene,
 * el mensaje sale sin imagen. La fila del tipo se omite cuando no hay uno.
 */
export function buildConsultationHtml(
  input: ConsultationEmailContent,
  markSrc?: string,
) {
  const name = textToHtml(input.name);
  const email = textToHtml(input.email);
  const summary = textToHtml(input.summary);
  const mailto = `mailto:${encodeURIComponent(toPlainText(input.email).trim())}`;
  const typeLabel = consultationTypes.find(
    (item) => item.value === input.consultationType,
  )?.label;
  // Texto que algunos clientes muestran junto al asunto, antes de abrir el mensaje.
  const preview = escapeHtml(
    toPlainText(`Nueva consulta de ${input.name}`).replaceAll(/\s+/g, " ").trim(),
  );

  const mark = markSrc
    ? `<div style="width:48px;height:48px;margin:0 auto;border-radius:50%;overflow:hidden;line-height:0;"><img src="${escapeHtml(markSrc)}" width="48" height="48" alt="AM" style="display:block;width:48px;height:48px;border:0;border-radius:50%;outline:none;text-decoration:none;"></div>`
    : "";

  const typeRow = typeLabel
    ? field("Tipo de consulta", escapeHtml(typeLabel))
    : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(site.name)}</title>
</head>
<body style="margin:0;padding:0;background:#f6f4ef;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preview}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f4ef;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <!--[if mso]><table role="presentation" width="560" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
          <tr>
            <td align="center" bgcolor="#163f49" style="background:#163f49;padding:12px 24px;font-family:${sans};font-size:12px;letter-spacing:0.08em;color:#ffffff;">
              ${escapeHtml(site.topbar)}
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#ffffff" style="background:#ffffff;padding:36px 32px 8px;border-left:1px solid #e7e2d9;border-right:1px solid #e7e2d9;">
              ${mark}
              <p style="margin:18px 0 0;font-family:${serif};font-size:28px;line-height:1.15;color:#163f49;">${escapeHtml(site.name)}</p>
              <p style="margin:8px 0 0;font-family:${sans};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#a66d50;">${escapeHtml(site.specialty)}</p>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#ffffff" style="background:#ffffff;padding:22px 32px 0;border-left:1px solid #e7e2d9;border-right:1px solid #e7e2d9;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="48" height="2" bgcolor="#a66d50" style="background:#a66d50;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="background:#ffffff;padding:28px 32px 8px;border-left:1px solid #e7e2d9;border-right:1px solid #e7e2d9;font-family:${sans};">
              <p style="margin:0;font-family:${serif};font-size:22px;line-height:1.3;color:#163f49;">Nueva consulta</p>
              <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#3d5c64;">Llegó desde el formulario del sitio.</p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="background:#ffffff;padding:8px 32px 32px;border-left:1px solid #e7e2d9;border-right:1px solid #e7e2d9;border-bottom:1px solid #e7e2d9;font-family:${sans};">
              ${field("Nombre y apellido", name)}
              ${field(
                "Correo electrónico",
                `<a href="${escapeHtml(mailto)}" style="color:#163f49;text-decoration:underline;">${email}</a>`,
              )}
              ${typeRow}
              ${field("Síntesis del caso", summary)}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:18px 24px 0;font-family:${sans};font-size:12px;line-height:1.5;color:#6d8389;">
              Responder este mensaje escribe a quien dejó la consulta.<br>
              <a href="${escapeHtml(site.url)}" style="color:#a66d50;text-decoration:none;">${escapeHtml(site.origin)}</a>
            </td>
          </tr>
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Arma la versión de texto plano.
 *
 * Muestra la etiqueta del tipo, no su valor interno. Si no hay tipo, esa
 * línea no aparece.
 */
export function buildConsultationText(input: ConsultationEmailContent) {
  const typeLabel = consultationTypes.find(
    (item) => item.value === input.consultationType,
  )?.label;
  const lines = [
    site.topbar,
    site.name,
    site.specialty,
    "",
    "Nueva consulta",
    "",
    `Nombre y apellido: ${toPlainText(input.name).trim()}`,
    `Correo electrónico: ${toPlainText(input.email).trim()}`,
  ];

  if (typeLabel) lines.push(`Tipo de consulta: ${typeLabel}`);

  lines.push(
    "",
    "Síntesis del caso:",
    toPlainText(input.summary).trim(),
    "",
    `Origen: ${site.origin}`,
  );

  return lines.join("\n");
}

/** Una etiqueta en cobre y, debajo, el valor ya preparado como HTML. */
function field(label: string, valueHtml: string) {
  return `<p style="margin:20px 0 0;font-family:${sans};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#a66d50;">${escapeHtml(label)}</p>
<p style="margin:6px 0 0;font-family:${sans};font-size:16px;line-height:1.55;color:#163f49;">${valueHtml}</p>`;
}
