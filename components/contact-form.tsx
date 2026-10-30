"use client";

import { useActionState } from "react";
import { sendConsultation } from "@/app/contacto/actions";
import { consultationTypes } from "@/content/site";
import {
  consultationLimits,
  initialConsultationState,
} from "@/lib/consultation";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendConsultation,
    initialConsultationState,
  );

  return (
    <form action={formAction} className="space-y-5 bg-paper p-6" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm">
          Nombre y apellido
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={consultationLimits.name}
          aria-invalid={state.fieldErrors.name ? true : undefined}
          aria-describedby={state.fieldErrors.name ? "name-error" : undefined}
          className="mt-2 w-full border border-petroleum/20 px-3 py-3"
        />
        {state.fieldErrors.name ? (
          <p id="name-error" className="mt-2 text-sm text-copper">
            {state.fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={consultationLimits.email}
          aria-invalid={state.fieldErrors.email ? true : undefined}
          aria-describedby={state.fieldErrors.email ? "email-error" : undefined}
          className="mt-2 w-full border border-petroleum/20 px-3 py-3"
        />
        {state.fieldErrors.email ? (
          <p id="email-error" className="mt-2 text-sm text-copper">
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="consultationType" className="block text-sm">
          Tipo de consulta
        </label>
        <select
          id="consultationType"
          name="consultationType"
          defaultValue=""
          aria-invalid={state.fieldErrors.consultationType ? true : undefined}
          aria-describedby={
            state.fieldErrors.consultationType ? "type-error" : undefined
          }
          className="mt-2 w-full border border-petroleum/20 bg-paper px-3 py-3"
        >
          <option value="">Sin indicar</option>
          {consultationTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {state.fieldErrors.consultationType ? (
          <p id="type-error" className="mt-2 text-sm text-copper">
            {state.fieldErrors.consultationType}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm">
          Síntesis del caso
        </label>
        <textarea
          id="summary"
          name="summary"
          required
          rows={6}
          maxLength={consultationLimits.summary}
          placeholder="Describa el caso e indique si requiere evaluación presencial o a distancia."
          aria-invalid={state.fieldErrors.summary ? true : undefined}
          aria-describedby={state.fieldErrors.summary ? "summary-error" : undefined}
          className="mt-2 w-full border border-petroleum/20 px-3 py-3"
        />
        {state.fieldErrors.summary ? (
          <p id="summary-error" className="mt-2 text-sm text-copper">
            {state.fieldErrors.summary}
          </p>
        ) : null}
      </div>

      <p className="text-sm text-petroleum/80">
        La información será utilizada para responder esta consulta y tratada con
        reserva profesional.
      </p>

      {state.message ? (
        <p role={state.status === "error" ? "alert" : "status"} className="text-sm">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="bg-petroleum px-5 py-3 text-sm text-paper disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar consulta"}
      </button>
    </form>
  );
}
