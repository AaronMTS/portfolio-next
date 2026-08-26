import Link from "next/link";
import NavLink from "./NavLink";
import { LINKS } from "@/lib/pageLinks";
import MobileNav from "./MobileNav";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-100">
      <div className="absolute size-full bg-background/70 backdrop-blur-md border-b border-muted/20"></div>
      <div className="relative mx-auto max-w-7xl flex gap-10 justify-between items-center px-8 py-6 md:gap-16">
        <Link href="/">
          <h2 className="text-4xl md:text-5xl text-primary">AaronMTS</h2>
        </Link>
        <nav className="hidden md:block space-x-6">
          {LINKS.map((link) => (
            <NavLink key={link.path} href={link.path}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
