import type { Metadata } from "next";
import Image from "next/image";
import { profile, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Perfil profesional",
  description:
    "Dr. Daniel Alejandro Marino, matrícula provincial N.º 94.131. Médico especialista en cirugía general, medicina legal y medicina laboral. Auditor de servicios de salud.",
};

export default function PerfilPage() {
  return (
    <section className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:py-20 lg:gap-16">
      <div>
        <p className="text-xs tracking-[0.16em] text-copper uppercase">
          {profile.kicker}
        </p>
        <h1 className="mt-4 font-serif text-4xl text-petroleum md:text-5xl">
          {site.fullName}
        </h1>
        <div className="mt-8 grid items-center gap-6 sm:grid-cols-[11rem_1fr]">
          <div className="aspect-square overflow-hidden rounded-full">
            <Image
              src="/images/perfil-dr-marino.png"
              alt="Retrato del Dr. Alejandro Marino"
              width={537}
              height={537}
              priority
              sizes="11rem"
              className="h-full w-full origin-top scale-125 object-cover object-[center_18%]"
            />
          </div>
          <blockquote>
            <p className="leading-relaxed text-petroleum/80">{profile.quote}</p>
            <footer className="mt-4 text-sm text-copper">— {profile.quoteBy}</footer>
          </blockquote>
        </div>
        <p className="mt-8 leading-relaxed text-petroleum/80">{profile.summary}</p>
      </div>
      <aside className="bg-paper p-8 shadow-[0_10px_40px_rgba(22,63,73,0.06)]">
        <p className="text-xs tracking-[0.16em] text-copper uppercase">
          {profile.cardKicker}
        </p>
        <h2 className="mt-4 font-serif text-3xl text-petroleum">{site.fullName}</h2>
        <p className="mt-3 text-sm text-petroleum/70">
          {profile.cardRole} · {site.license}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {profile.areas.map((area) => (
            <li
              key={area}
              className="rounded-full bg-ivory px-3 py-1 text-xs text-copper"
            >
              {area}
            </li>
          ))}
        </ul>
        <ul className="mt-8 space-y-4 border-t border-petroleum/10 pt-6">
          {profile.credentials.map((credential) => (
            <li key={credential} className="flex items-center gap-3 text-sm">
              <span className="h-px w-4 bg-copper" aria-hidden="true" />
              {credential}
            </li>
          ))}
        </ul>
        <div className="mt-8 space-y-1 border-t border-petroleum/10 pt-6 text-sm text-petroleum/70">
          <p>{site.license}</p>
          <p>{profile.cardPlace}</p>
        </div>
      </aside>
    </section>
  );
}
