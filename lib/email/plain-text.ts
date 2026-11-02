/**
 * Saneado del texto que escribe quien consulta.
 *
 * Quita caracteres que no deben viajar en el correo y escapa el HTML para
 * que una síntesis no pueda alterar el mensaje.
 */

/** Caracteres invisibles, de formato y de control bidireccional. */
const hiddenCharacters =
  /[\u00AD\u034F\u061C\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF\uFFF9-\uFFFB]|\u{E0000}|\u{E0001}|[\u{E0020}-\u{E007F}]/gu;

/** Controles que no son tabulación ni salto de línea. Esos dos se conservan. */
const controlCharacters = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

/**
 * Deja el texto en una forma estable.
 *
 * Unifica los saltos de Windows y de Mac clásico, borra controles y
 * caracteres ocultos, y aplica la normalización NFKC para que un carácter
 * de compatibilidad no alargue el campo ni cambie lo que se lee.
 */
export function toPlainText(value: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(controlCharacters, "")
    .replace(hiddenCharacters, "")
    .normalize("NFKC");
}

/** Escapa los cinco caracteres que el HTML interpretaría como marcado. */
export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Prepara un campo para el cuerpo HTML del correo.
 *
 * Primero limpia y escapa, y recién después convierte los saltos propios en
 * `<br>`. Así un `<br>` escrito por quien consulta no se vuelve una etiqueta.
 */
export function textToHtml(value: string) {
  return escapeHtml(toPlainText(value)).replaceAll("\n", "<br>");
}
