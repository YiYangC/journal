"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const LEFT_LINKS = [
  { href: "/archive", label: "Archive" },
  { href: "/studies", label: "Studies" },
  { href: "/selavy", label: "Selavy" },
];

const RIGHT_LINKS = [
  { href: "/map", label: "Map" },
  { href: "/about", label: "About" },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="border-b border-[var(--color-border)]">
      {/* Desktop nav */}
      <nav className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center px-4 py-4">
        <div className="flex items-center gap-6">
          {LEFT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-[0.15em] transition-colors ${
                isActive(link.href)
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/archive"
          className="text-lg font-bold uppercase tracking-[0.2em] text-center px-6"
        >
          Yi Yang&nbsp;杨 艺
        </Link>

        <div className="flex items-center justify-end gap-6">
          {RIGHT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-[0.15em] transition-colors ${
                isActive(link.href)
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile nav */}
      <nav className="md:hidden flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto">
          {ALL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[10px] uppercase tracking-[0.15em] transition-colors whitespace-nowrap ${
                isActive(link.href)
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/archive"
          className="text-sm font-bold uppercase tracking-[0.2em] shrink-0 ml-3"
        >
          Yi Yang
        </Link>
      </nav>
    </header>
  );
}
