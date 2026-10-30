import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-ivory">
      <div className="bg-petroleum text-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2 text-xs">
          <p>{site.topbar}</p>
          <a href={`tel:${site.phoneTel}`}>
            {site.phoneDisplay} · {site.city}
          </a>
        </div>
      </div>
      <div className="relative border-b border-petroleum/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
          <Link href="/" className="block">
            <span className="block font-serif text-xl text-petroleum">
              {site.name}
            </span>
            <span className="block text-[0.7rem] tracking-[0.14em] text-copper uppercase">
              {site.specialty}
            </span>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
