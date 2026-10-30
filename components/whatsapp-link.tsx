import { site, whatsappHref } from "@/content/site";

export function WhatsappLink() {
  return (
    <a
      href={whatsappHref()}
      className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full bg-petroleum px-4 py-3 text-sm text-paper shadow-lg"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M5 18.5 6.2 15A7.5 7.5 0 1 1 9.2 19L5 18.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 10.2c.2 1.4 1.6 2.8 3 3.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      WhatsApp
      <span className="sr-only">
        {" "}
        con {site.name}, al {site.whatsappDisplay}
      </span>
    </a>
  );
}
