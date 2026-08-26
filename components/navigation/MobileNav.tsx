"use client";

import { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import { LINKS } from "@/lib/pageLinks";
import SwitchableMenuIcon from "../ui/SwitchableMenuIcon";

export default function MobileNav() {
  const [isShown, setIsShown] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const toggleNav = (newState?: boolean) => {
    setIsShown((prevState) => {
      if (newState === undefined || newState === null) {
        return !prevState;
      }

      if (newState !== prevState) {
        return newState;
      }

      return prevState;
    });
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        toggleNav(false);
      }
    };

    if (window.innerWidth < 768) {
      window.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={navRef} className="md:hidden">
      <SwitchableMenuIcon handleClick={() => toggleNav()} isActive={isShown} />
      <div className="absolute top-full left-0 h-fit w-full -z-1 overflow-hidden pointer-events-none">
        <nav
          className={`flex flex-col gap-6 items-center w-full px-8 py-6 bg-background/70 backdrop-blur-md ${isShown ? "" : "-translate-y-full"} transition-transform duration-300 pointer-events-auto`}
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.path}
              isMobile={true}
              href={link.path}
              onClick={() => toggleNav(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
