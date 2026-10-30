import Link from "next/link";
import { footerNav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="bg-petroleum text-paper">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-serif text-xl">{site.name}</p>
            <p className="text-[0.7rem] tracking-[0.14em] text-copper uppercase">
              {site.specialty}
            </p>
          </div>
          <nav aria-label="Pie">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-paper/20 pt-6 text-sm md:flex-row md:justify-between">
          <p>
            {site.fullName} · {site.license}
          </p>
          <p>{site.placeLine}</p>
        </div>
        <p className="mt-4 text-sm">
          © {site.name} · Consultoría médico-legal · {site.city}
        </p>
      </div>
    </footer>
  );
}
