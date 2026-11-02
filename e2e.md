# Tests end to end con Playwright

Esta guía es para el repositorio aparte que recorre el sitio ya publicado. Este proyecto no instala Playwright y `npm test` sigue corriendo solo los tests unitarios.

El sitio de referencia es [https://dralejandromarino.com](https://dralejandromarino.com). Cada elemento que un test necesita tiene un `data-testid` estable. En Playwright se apunta así:

```ts
await page.getByTestId("contact-submit").click();
```

En `playwright.config.ts` del otro repositorio:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "https://dralejandromarino.com",
  },
});
```

Los ejemplos de abajo asumen ese `baseURL`. Una vista de escritorio es `1280×720`. Por debajo de `768px` el menú principal y la barra de servicios arrancan cerrados: primero hay que abrirlos con su botón.

Un envío válido del formulario manda un correo real a la consultoría. Los recorridos de navegación y de validación no lo hacen. El camino que confirma «La consulta se envió» sí. Conviene dejarlo para una corrida controlada: hay un cupo de dos envíos cada diez minutos por IP, y el tercero muestra el mensaje de límite.

## Piezas que están en todas las páginas

| `data-testid` | Qué es | Uso |
| --- | --- | --- |
| `site-skip` | Enlace «Saltar al contenido». Está oculto hasta que recibe el foco | `await page.getByTestId("site-skip").focus()` |
| `site-header` | Encabezado | Visible en cada ruta |
| `site-phone` | Teléfono `0223 451 1812`. El `href` es `tel:+542234511812` | `await expect(page.getByTestId("site-phone")).toHaveAttribute("href", "tel:+542234511812")` |
| `site-logo` | Nombre del doctor. Lleva a `/` | `await page.getByTestId("site-logo").click()` |
| `site-nav` | Navegación de secciones | |
| `site-menu-toggle` | Botón «Abrir menú» / «Cerrar menú». Solo se ve en pantallas chicas | Ver el recorrido de móvil |
| `site-menu` | Lista de secciones | En escritorio está visible. En el teléfono, después de abrir el menú |
| `nav-servicios` | Enlace a `/servicios` | |
| `nav-perfil` | Enlace a `/perfil` | |
| `nav-preguntas` | Enlace a `/preguntas` | |
| `nav-modalidad` | Enlace a `/modalidad` | |
| `nav-contacto` | Botón «Consultar un caso», hacia `/contacto` | |
| `site-content` | El `<main>` de la página | |
| `site-footer` | Pie | |
| `footer-servicios` | Enlace del pie a `/servicios` | |
| `footer-perfil` | Enlace del pie a `/perfil` | |
| `footer-preguntas` | Enlace del pie a `/preguntas` | |
| `footer-modalidad` | Enlace del pie a `/modalidad` | |
| `footer-experiencia` | Enlace del pie a `/#experiencia` | |
| `footer-contacto` | Enlace del pie a `/contacto` | |
| `whatsapp-link` | Acceso fijo a WhatsApp. Abre otra pestaña. El `href` empieza por `https://wa.me/5492236028090` | `await expect(page.getByTestId("whatsapp-link")).toHaveAttribute("href", /wa\.me\/5492236028090/)` |

Recorrido del menú en el teléfono:

```ts
test.use({ viewport: { width: 390, height: 844 } });

test("el menú móvil abre servicios", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("site-menu-toggle").click();
  await page.getByTestId("nav-servicios").click();
  await expect(page.getByTestId("services-title")).toBeVisible();
});
```

Recorrido de una sección desde el encabezado, en escritorio:

```ts
test("servicios se abre desde el encabezado", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("nav-servicios").click();
  await expect(page).toHaveURL("/servicios");
  await expect(page.getByTestId("services-title")).toBeVisible();
});
```

## Inicio `/`

| `data-testid` | Qué es |
| --- | --- |
| `home-hero` | Bloque de presentación |
| `home-title` | Título «Evaluaciones médico-legales y Auditoría médica» |
| `home-cta-contacto` | «Solicitar una evaluación». Lleva a `/contacto` |
| `home-cta-servicios` | «Conocer servicios». Lleva a `/servicios` |
| `home-experience` | Sección de experiencia, también alcanzable con `/#experiencia` |
| `home-experience-1` | Evaluación de secuelas |
| `home-experience-2` | Determinación de incapacidades |
| `home-experience-3` | Peritos de parte |
| `home-experience-4` | Litigios relacionados con seguros de personas |
| `home-experience-5` | Riesgos del Trabajo |
| `home-experience-6` | Responsabilidad civil |

```ts
test("la portada ofrece la consulta y los servicios", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("home-title")).toBeVisible();
  await expect(page.getByTestId("home-experience-6")).toBeVisible();
  await page.getByTestId("home-cta-contacto").click();
  await expect(page.getByTestId("contact-form")).toBeVisible();
});
```

## Servicios `/servicios`

| `data-testid` | Qué es |
| --- | --- |
| `services` | Cuerpo de la página, debajo de la barra |
| `services-title` | Título «Asesoramiento especializado para cada necesidad.» |
| `services-menu-toggle` | Botón «Servicios» que abre la barra. Solo se ve en pantallas chicas |
| `services-tabs` | Lista de destinatarios |
| `service-tab-estudios-juridicos` | Pestaña Estudios jurídicos |
| `service-tab-empresas` | Pestaña Empresas y RR. HH. |
| `service-tab-particulares` | Pestaña Particulares |
| `service-tab-companias-de-seguros` | Pestaña Compañías de seguros |
| `service-panel-estudios-juridicos` | Ficha visible al entrar. Es la primera |
| `service-panel-empresas` | Ficha de empresas. Reemplaza a la anterior |
| `service-panel-particulares` | Ficha de particulares |
| `service-panel-companias-de-seguros` | Ficha de compañías de seguros |

En el documento hay un solo panel: el del destinatario elegido. Al cambiar de pestaña, el `data-testid` del panel cambia.

```ts
test("la ficha de seguros reemplaza a la de estudios jurídicos", async ({ page }) => {
  await page.goto("/servicios");
  await expect(page.getByTestId("service-panel-estudios-juridicos")).toBeVisible();
  await page.getByTestId("service-tab-companias-de-seguros").click();
  await expect(page.getByTestId("service-panel-companias-de-seguros")).toBeVisible();
  await expect(page.getByTestId("service-panel-estudios-juridicos")).toHaveCount(0);
});
```

En el teléfono, la barra hay que abrirla antes:

```ts
await page.getByTestId("services-menu-toggle").click();
await page.getByTestId("service-tab-particulares").click();
```

## Perfil `/perfil`

| `data-testid` | Qué es |
| --- | --- |
| `profile-title` | «Dr. Daniel Alejandro Marino» |
| `profile-card` | Ficha con matrícula, áreas y títulos |

```ts
test("el perfil muestra la matrícula", async ({ page }) => {
  await page.goto("/perfil");
  await expect(page.getByTestId("profile-title")).toBeVisible();
  await expect(page.getByTestId("profile-card")).toContainText("94.131");
});
```

## Preguntas `/preguntas`

| `data-testid` | Qué es |
| --- | --- |
| `faq-title` | «Antes de iniciar una consulta.» |
| `faq-cta` | «¿Otra consulta? Escribime». Lleva a `/contacto` |
| `faq-list` | Acordeón |
| `faq-pericia-de-parte` | Pregunta por la diferencia con la pericia oficial. Arranca abierta |
| `faq-answer-pericia-de-parte` | Su respuesta. Está en la página al cargar |
| `faq-momento` | «¿Cuándo conviene consultar?» |
| `faq-answer-momento` | Su respuesta. Aparece al abrir la pregunta |
| `faq-documentacion` | «¿Necesito toda la documentación para consultar?» |
| `faq-answer-documentacion` | Su respuesta |
| `faq-plazo` | «¿Cuánto demora una evaluación o un informe?» |
| `faq-answer-plazo` | Su respuesta |
| `faq-reserva` | «¿La información que comparto es confidencial?» |
| `faq-answer-reserva` | Su respuesta |
| `faq-fuera-de-mar-del-plata` | «¿Atiende casos fuera de Mar del Plata?» |
| `faq-answer-fuera-de-mar-del-plata` | Su respuesta |

Abrir una pregunta cierra la que estaba abierta. La respuesta que se cierra sale del documento.

```ts
test("abrir otra pregunta cierra la primera", async ({ page }) => {
  await page.goto("/preguntas");
  await expect(page.getByTestId("faq-answer-pericia-de-parte")).toBeVisible();
  await page.getByTestId("faq-documentacion").click();
  await expect(page.getByTestId("faq-answer-documentacion")).toBeVisible();
  await expect(page.getByTestId("faq-answer-pericia-de-parte")).toHaveCount(0);
});
```

## Modalidad `/modalidad`

| `data-testid` | Qué es |
| --- | --- |
| `modality-title` | «Evaluación presencial y evaluación a distancia» |
| `modality-step-01` | Consulta inicial |
| `modality-step-02` | Revisión |
| `modality-step-03` | Evaluación |
| `modality-step-04` | Informe |
| `modality-mode-01` | Evaluación presencial, en Gascón 1622 |
| `modality-mode-02` | Evaluación a distancia |
| `modality-cta` | «Consultar un caso». Lleva a `/contacto` |

```ts
test("la modalidad distingue presencial y distancia", async ({ page }) => {
  await page.goto("/modalidad");
  await expect(page.getByTestId("modality-mode-01")).toContainText("Gascón 1622");
  await expect(page.getByTestId("modality-mode-02")).toBeVisible();
  await page.getByTestId("modality-cta").click();
  await expect(page.getByTestId("contact-form")).toBeVisible();
});
```

## Contacto `/contacto`

| `data-testid` | Qué es |
| --- | --- |
| `contact-title` | Título de la página |
| `contact-form` | Formulario |
| `contact-name` | Nombre y apellido. Obligatorio. Tope de 120 caracteres |
| `contact-email` | Correo. Obligatorio |
| `contact-type` | Tipo de consulta. Puede quedar en «Sin indicar» |
| `contact-summary` | Síntesis del caso. Obligatoria. Tope de 4000 caracteres |
| `contact-submit` | «Enviar consulta». Mientras envía, el botón dice «Enviando…» y queda deshabilitado |
| `contact-name-error` | Error del nombre. Solo está en la página si ese campo falló |
| `contact-email-error` | Error del correo. Misma condición |
| `contact-type-error` | Error del tipo. Misma condición |
| `contact-summary-error` | Error de la síntesis. Misma condición |
| `contact-status` | Resultado del envío. Solo está cuando hay un mensaje |
| `contact-details` | Ficha de teléfono, WhatsApp y correo |
| `contact-phone` | `tel:+542234511812` |
| `contact-whatsapp` | Enlace de WhatsApp de esa ficha. También abre otra pestaña |
| `contact-mail` | `mailto:info@ppgascon.com` |

Valores de `contact-type`:

| Valor | Texto |
| --- | --- |
| `""` | Sin indicar |
| `estudio-juridico` | Estudio jurídico |
| `compania-de-seguros` | Compañía de seguros |
| `empresa` | Empresa |
| `particular` | Particular |

Textos de error, para afirmarlos sobre el `data-testid` del campo:

| Situación | Dónde | Texto |
| --- | --- | --- |
| Nombre vacío | `contact-name-error` | Ingrese su nombre y apellido. |
| Nombre de más de 120 caracteres | `contact-name-error` | El nombre es demasiado largo. |
| Correo vacío o inválido | `contact-email-error` | Ingrese un correo electrónico válido. |
| Síntesis vacía | `contact-summary-error` | Escriba la síntesis del caso. |
| Síntesis de más de 4000 caracteres | `contact-summary-error` | La síntesis es demasiado larga. |
| Tipo que no es uno de los cuatro | `contact-type-error` | El tipo de consulta no es válido. |
| Hay algún campo marcado | `contact-status` | Revise los datos marcados antes de enviar. |
| La IP ya envió dos veces en diez minutos | `contact-status` | Excedió el límite de intentos de envío. Vuelva a intentar en unos minutos o comuníquese por teléfono o WhatsApp. |
| El correo no pudo salir | `contact-status` | No se pudo enviar la consulta. Intente de nuevo o comuníquese por teléfono o WhatsApp. |
| El envío salió | `contact-status` | La consulta se envió. |

El tipo inválido no se puede elegir desde la lista. Ese caso queda cubierto por los tests unitarios de este repositorio. Desde Playwright alcanza con vacío, formato y largos.

```ts
test("un formulario vacío pide los tres campos y no confirma el envío", async ({ page }) => {
  await page.goto("/contacto");
  await page.getByTestId("contact-submit").click();

  await expect(page.getByTestId("contact-name-error")).toHaveText(
    "Ingrese su nombre y apellido.",
  );
  await expect(page.getByTestId("contact-email-error")).toHaveText(
    "Ingrese un correo electrónico válido.",
  );
  await expect(page.getByTestId("contact-summary-error")).toHaveText(
    "Escriba la síntesis del caso.",
  );
  await expect(page.getByTestId("contact-status")).toHaveText(
    "Revise los datos marcados antes de enviar.",
  );
});
```

```ts
test("un correo sin dominio no llega a enviarse", async ({ page }) => {
  await page.goto("/contacto");
  await page.getByTestId("contact-name").fill("Ada Marino");
  await page.getByTestId("contact-email").fill("ada@estudio");
  await page.getByTestId("contact-summary").fill("Evaluación presencial.");
  await page.getByTestId("contact-submit").click();

  await expect(page.getByTestId("contact-email-error")).toBeVisible();
  await expect(page.getByTestId("contact-status")).not.toHaveText("La consulta se envió.");
});
```

El recorrido que sí envía, para usarlo a mano o en una corrida aislada:

```ts
test("una consulta completa confirma el envío", async ({ page }) => {
  await page.goto("/contacto");
  await page.getByTestId("contact-name").fill("Ada Marino");
  await page.getByTestId("contact-email").fill("ada@estudio.com");
  await page.getByTestId("contact-type").selectOption("estudio-juridico");
  await page.getByTestId("contact-summary").fill(
    "Evaluación presencial por un reclamo laboral.",
  );
  await page.getByTestId("contact-submit").click();

  await expect(page.getByTestId("contact-status")).toHaveText("La consulta se envió.");
});
```

## Página no encontrada

Cualquier ruta que no exista, por ejemplo `/ruta-que-no-existe`, responde 404 y muestra esta página dentro del encabezado y el pie.

| `data-testid` | Qué es |
| --- | --- |
| `not-found` | La sección de la página |
| `not-found-title` | «Esta dirección no forma parte del sitio.» |
| `not-found-home` | «Volver al inicio». Lleva a `/` |
| `not-found-contact` | «Consultar un caso». Lleva a `/contacto` |

```ts
test("una ruta desconocida vuelve al inicio", async ({ page }) => {
  const response = await page.goto("/ruta-que-no-existe");
  expect(response?.status()).toBe(404);
  await expect(page.getByTestId("not-found-title")).toBeVisible();
  await page.getByTestId("not-found-home").click();
  await expect(page.getByTestId("home-title")).toBeVisible();
});
```

## Orden sugerido para armar la suite

1. Recorrer el encabezado hacia servicios, perfil, preguntas, modalidad y contacto, y afirmar el título de cada página.
2. Abrir el menú en `390×844` y repetir un destino.
3. En servicios, cambiar de pestaña y comprobar que queda un solo panel.
4. En preguntas, abrir una pregunta cerrada y comprobar que la primera se cierra.
5. En contacto, enviar el formulario vacío y uno con correo inválido.
6. Visitar una ruta inexistente y volver al inicio.
7. Dejar el envío real de una consulta fuera de la corrida habitual.
