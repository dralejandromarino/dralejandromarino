/**
 * Pruebas del cuerpo del correo.
 *
 * Revisan el texto plano y el HTML con los mismos datos: limpieza, etiqueta
 * del tipo, escape del marcado y el isotipo opcional.
 */
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import {
  buildConsultationHtml,
  buildConsultationText,
} from "./consultation-email";

/** Consulta con espacios, un carácter oculto y un fragmento que parece HTML. */
const consultation = {
  name: " Ada\u200B Marino ",
  email: " ada+caso@estudio.com ",
  summary: "Primera línea.\r\n<script>alert(1)</script>",
};

describe("buildConsultationText", () => {
  it("incluye los datos limpios, la etiqueta del tipo y el origen", () => {
    const text = buildConsultationText({
      ...consultation,
      consultationType: "estudio-juridico",
    });

    expect(text).toContain("Nombre y apellido: Ada Marino");
    expect(text).toContain("Correo electrónico: ada+caso@estudio.com");
    expect(text).toContain("Tipo de consulta: Estudio jurídico");
    expect(text).toContain("Primera línea.\n<script>alert(1)</script>");
    expect(text).toContain(`Origen: ${site.origin}`);
    expect(text).not.toContain("estudio-juridico");
  });

  it("omite el tipo de consulta cuando no viene informado", () => {
    const text = buildConsultationText(consultation);

    expect(text).not.toContain("Tipo de consulta");
  });
});

describe("buildConsultationHtml", () => {
  it("escapa el contenido de quien consulta y conserva los saltos como <br>", () => {
    const html = buildConsultationHtml({
      ...consultation,
      consultationType: "compania-de-seguros",
    });

    expect(html).toContain("Nueva consulta de Ada Marino");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(html).toContain("Primera línea.<br>");
    expect(html).toContain("Tipo de consulta");
    expect(html).toContain("Compañía de seguros");
    expect(html).toContain(
      `mailto:${encodeURIComponent("ada+caso@estudio.com")}`,
    );
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img");
  });

  it("omite la fila del tipo cuando la consulta no lo indica", () => {
    const html = buildConsultationHtml(consultation);

    expect(html).not.toContain("Tipo de consulta");
  });

  it("incluye el isotipo con la dirección escapada", () => {
    const html = buildConsultationHtml(
      consultation,
      `https://cdn.example/mark.png?a=1&b="x"`,
    );

    expect(html).toContain(
      'src="https://cdn.example/mark.png?a=1&amp;b=&quot;x&quot;"',
    );
  });
});
