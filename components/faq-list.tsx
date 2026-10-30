"use client";

import { useState } from "react";
import { faq, type FaqItem } from "@/content/faq";

export function FaqList() {
  const [openId, setOpenId] = useState<FaqItem["id"] | null>(faq[0].id);

  return (
    <div className="divide-y divide-petroleum/15 border-y border-petroleum/15">
      {faq.map((item) => {
        const open = openId === item.id;
        const panelId = `respuesta-${item.id}`;

        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-start justify-between gap-6 py-5 text-left font-serif text-lg text-petroleum"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              {item.question}
              <span className="mt-1 text-copper" aria-hidden="true">
                {open ? "−" : "+"}
              </span>
            </button>
            {open ? (
              <p id={panelId} className="max-w-2xl pb-5 text-sm leading-relaxed text-petroleum/75">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
