"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/archive/villa-savoye", label: "Villa Savoye" },
  { href: "/archive/ronchamp", label: "Ronchamp" },
  { href: "/archive/sf-de-young", label: "de Young Museum" },
  { href: "/archive/seattle-central-library", label: "Seattle Central Library" },
  { href: "/archive/vitra-campus", label: "Vitra Campus" },
  { href: "/archive/kyoto-katsura", label: "Katsura Imperial Villa" },
  { href: "/archive/twa-flight-center", label: "TWA Flight Center" },
  { href: "/archive/schindler-house", label: "Schindler House" },
  { href: "/archive/villa-la-roche", label: "Villa La Roche" },
  { href: "/archive/fondazione-querini-stampalia", label: "Querini Stampalia" },
  { href: "/archive/palais-de-tokyo", label: "Palais de Tokyo" },
  { href: "/writings", label: "Writings" },
  { href: "/selavy", label: "Selavy" },
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
