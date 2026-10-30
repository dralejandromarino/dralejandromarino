# Dr. Alejandro Marino

Sitio público de la consultoría médico-legal del Dr. Daniel Alejandro Marino. Presenta la práctica, dice para quién interviene y recibe la consulta inicial.

**Oferta:** evaluaciones médico-legales y auditoría médica.  
**Especialidad:** medicina legal.  
**Sede presencial:** Gascón 1622, Mar del Plata.  
**Sitio:** [dralejandromarino.com](https://dralejandromarino.com)

La práctica aporta una lectura médica comprensible, documentada y útil para orientar una decisión. El sitio no promete un resultado, no sustituye a un organismo ni a un perito oficial, y no tramita el informe.

## Para quién es

| Destinatario | Qué encuentra en el sitio |
| --- | --- |
| Estudios jurídicos | Apoyo técnico en litigios laborales, civiles y de seguros |
| Empresas | Asistencia médico-legal en contingencias laborales |
| Particulares | Asesoramiento frente a conflictos laborales |
| Compañías de seguros | Asistencia médico-legal a la aseguradora |

Hay dos modalidades de evaluación: presencial, en Mar del Plata, y a distancia. Quien consulta indica cuál necesita.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Oferta y experiencia profesional |
| `/servicios` | Los cuatro destinatarios, en una sola página |
| `/perfil` | Título profesional y función de auditor de servicios de salud |
| `/preguntas` | Preguntas frecuentes |
| `/modalidad` | Evaluación presencial y a distancia |
| `/contacto` | Teléfono, WhatsApp, correo y formulario |

El encabezado y el pie se repiten en todas las páginas. El idioma es español (`es-AR`).

El título profesional es médico especialista en cirugía general y especialista en medicina legal y medicina laboral. Auditor de servicios de salud es la función, y el sitio las distingue.

## Identidad visual

La dirección de marca del rediseño usa esta paleta y estas familias:

| Token | Valor | Uso |
| --- | --- | --- |
| Petróleo | `#163F49` | Texto, encabezado y botones |
| Blanco | `#FFFFFF` | Papel y fichas |
| Marfil | `#F6F4EF` | Fondo |
| Cobre | `#A66D50` | Acentos y etiquetas |
| Lora | títulos | |
| DM Sans | cuerpo | |

## Cómo está armado

Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS 4. El contenido vive en `content/`. El formulario de contacto se envía con [Resend](https://resend.com) desde una acción de servidor.

```text
app/            rutas del sitio
components/     encabezado, pie, formulario y navegación de servicios
content/        textos
lib/            validación y envío de la consulta
public/images/  fotografías del rediseño
```

## Desarrollo local

```bash
npm install
npm run dev
```

El sitio queda en [http://localhost:3000](http://localhost:3000).

Para que el formulario envíe el correo hacen falta dos variables de entorno. Sin ellas, el sitio muestra un error y no confirma el envío.

```bash
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
```

`CONTACT_FROM_EMAIL` es un remitente verificado en Resend. El mensaje llega a la casilla definida en `content/site.ts`. Esas variables no se commitean.

```bash
npm run lint
npm run build
```

## Qué queda fuera

Honorarios, turnos, pagos, historia clínica y descarga de informes. El sitio institucional de la Policlínica Privada Gascón también queda fuera: el pie nombra el lugar de atención, y no ese otro sitio.

## Licencia

El software se publica bajo la licencia MIT. El nombre, la matrícula, las fotografías y los textos que identifican al Dr. Marino quedan fuera de esa licencia: un fork puede reutilizar el código y tiene que retirar esa identidad. El uso debido de una consulta real está en el código de ética. Los tres textos están en [LICENSE.md](LICENSE.md).
