"use client";

/**
 * Formulario de la consulta inicial.
 *
 * Corre en el navegador para mostrar el envío en curso y los errores de cada
 * campo. La validación y el correo los resuelve `sendConsultation`.
 */
import { useActionState } from "react";
import { sendConsultation } from "@/app/contacto/actions";
import { consultationTypes } from "@/content/site";
import {
  consultationLimits,
  initialConsultationState,
} from "@/lib/consultation";

/** Borde, fondo y estado de error compartidos por los campos. */
const fieldClass =
  "mt-2 w-full rounded-lg border border-[#d9dfdb] bg-paper px-4 py-3 text-petroleum transition-[border-color,box-shadow] duration-300 placeholder:text-petroleum/40 aria-invalid:border-copper";

/**
 * Campos de la consulta y el resultado del envío.
 *
 * `noValidate` deja la revisión a la acción de servidor, que devuelve un
 * mensaje por campo. El tipo de consulta puede quedar sin indicar.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendConsultation,
    initialConsultationState,
  );

  return (
    <form
      action={formAction}
      data-testid="contact-form"
      className="space-y-5 rounded-2xl border border-petroleum/10 bg-paper p-6 shadow-[0_12px_32px_rgba(22,63,73,0.06)] md:p-8"
      noValidate
    >
      <div>
        <label htmlFor="name" className="block text-sm text-petroleum">
          Nombre y apellido
        </label>
        <input
          id="name"
          name="name"
          data-testid="contact-name"
          type="text"
          autoComplete="name"
          required
          maxLength={consultationLimits.name}
          aria-invalid={state.fieldErrors.name ? true : undefined}
          aria-describedby={state.fieldErrors.name ? "name-error" : undefined}
          className={fieldClass}
        />
        {state.fieldErrors.name ? (
          <p id="name-error" data-testid="contact-name-error" className="mt-2 text-sm text-copper">
            {state.fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-petroleum">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          data-testid="contact-email"
          type="email"
          autoComplete="email"
          required
          maxLength={consultationLimits.email}
          aria-invalid={state.fieldErrors.email ? true : undefined}
          aria-describedby={state.fieldErrors.email ? "email-error" : undefined}
          className={fieldClass}
        />
        {state.fieldErrors.email ? (
          <p id="email-error" data-testid="contact-email-error" className="mt-2 text-sm text-copper">
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      {/* Opcional. "Sin indicar" envía un valor vacío y la acción lo acepta. */}
      <div>
        <label htmlFor="consultationType" className="block text-sm text-petroleum">
          Tipo de consulta
        </label>
        <select
          id="consultationType"
          name="consultationType"
          data-testid="contact-type"
          defaultValue=""
          aria-invalid={state.fieldErrors.consultationType ? true : undefined}
          aria-describedby={
            state.fieldErrors.consultationType ? "type-error" : undefined
          }
          className={fieldClass}
        >
          <option value="">Sin indicar</option>
          {consultationTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {state.fieldErrors.consultationType ? (
          <p id="type-error" data-testid="contact-type-error" className="mt-2 text-sm text-copper">
            {state.fieldErrors.consultationType}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm text-petroleum">
          Síntesis del caso
        </label>
        <textarea
          id="summary"
          name="summary"
          data-testid="contact-summary"
          required
          rows={6}
          maxLength={consultationLimits.summary}
          placeholder="Describa el caso e indique si requiere evaluación presencial o a distancia."
          aria-invalid={state.fieldErrors.summary ? true : undefined}
          aria-describedby={state.fieldErrors.summary ? "summary-error" : undefined}
          className={`${fieldClass} min-h-36 resize-y`}
        />
        {state.fieldErrors.summary ? (
          <p id="summary-error" data-testid="contact-summary-error" className="mt-2 text-sm text-copper">
            {state.fieldErrors.summary}
          </p>
        ) : null}
      </div>

      <p className="text-sm text-petroleum/80">
        La información será utilizada para responder esta consulta y tratada con
        reserva profesional.
      </p>

      {/* Alerta si falló; estado si la consulta salió. No se anuncia mientras no hay mensaje. */}
      {state.message ? (
        <p
          role={state.status === "error" ? "alert" : "status"}
          data-testid="contact-status"
          className="text-sm"
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        data-testid="contact-submit"
        disabled={pending}
        className="nav-cta inline-flex rounded-md bg-petroleum px-4 py-3 text-sm text-paper disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar consulta"}
      </button>
    </form>
  );
}
