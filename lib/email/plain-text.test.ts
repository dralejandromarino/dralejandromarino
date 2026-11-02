/**
 * Pruebas del saneado de texto.
 *
 * Comprueban los saltos de línea, la eliminación de controles y caracteres
 * ocultos, la normalización Unicode y el orden en que se escapa el HTML.
 */
import { describe, expect, it } from "vitest";
import { escapeHtml, textToHtml, toPlainText } from "./plain-text";

describe("toPlainText", () => {
  it("unifica los saltos de línea y conserva tabulación y salto Unix", () => {
    expect(toPlainText("una\r\ndos\rtres\ncuatro\tcinco")).toBe(
      "una\ndos\ntres\ncuatro\tcinco",
    );
  });

  it("elimina caracteres de control y texto oculto", () => {
    expect(toPlainText("Ada\u0000\u0007\u007F\u200B\uFEFF\u202E Marino")).toBe(
      "Ada Marino",
    );
  });

  it("normaliza compatibilidad Unicode", () => {
    expect(toPlainText("\uFB01 \uFF11")).toBe("fi 1");
  });
});

describe("escapeHtml", () => {
  it("escapa los caracteres que el HTML interpretaría", () => {
    expect(escapeHtml(`&<>"'`)).toBe("&amp;&lt;&gt;&quot;&#39;");
  });
});

describe("textToHtml", () => {
  it("limpia el texto, lo escapa y convierte los saltos en <br>", () => {
    expect(textToHtml("a\u200Bb\r\n<&>")).toBe("ab<br>&lt;&amp;&gt;");
  });
});
