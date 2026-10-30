"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactCta, mainNav } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Secciones">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center text-petroleum md:hidden"
        aria-expanded={open}
        aria-controls="menu-principal"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
      <ul
        id="menu-principal"
        className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full z-20 flex-col gap-4 border-b border-petroleum/10 bg-ivory px-5 py-6 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}
      >
        {mainNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`text-sm text-petroleum ${pathname === item.href ? "underline underline-offset-4" : ""}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={contactCta.href}
            className="inline-flex rounded-md bg-petroleum px-4 py-3 text-sm text-paper"
            onClick={() => setOpen(false)}
          >
            {contactCta.label}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
