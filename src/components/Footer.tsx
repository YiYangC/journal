"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/archive", label: "Archive" },
  { href: "/studies", label: "Studies" },
  { href: "/selavy", label: "Selavy" },
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  const pathname = usePathname();
  const [randomLink, setRandomLink] = useState(links[0]);

  useEffect(() => {
    setRandomLink(links[Math.floor(Math.random() * links.length)]);
  }, []);

  if (pathname === "/selavy" || pathname === "/projects/concrete-memories") {
    return null;
  }

  return (
    <footer className="px-[3rem] py-4 border-t border-[var(--color-border)]">
      <div className="flex justify-between items-center">
        <p className="text-sm text-[var(--color-alt)]">
          Yi Yang {new Date().getFullYear()}
        </p>
        <Link
          href={randomLink.href}
          className="text-sm text-[var(--color-alt)] hover:text-[var(--color-text)] transition-colors"
        >
          {randomLink.label}
        </Link>
      </div>
    </footer>
  );
}
