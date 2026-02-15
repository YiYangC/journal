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

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="border-b border-[var(--color-border)]">
      <nav className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center px-4 py-4">
        {/* Left — Nav links */}
        <div className="flex items-center gap-4 md:gap-6">
          {LEFT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[10px] md:text-xs uppercase tracking-[0.15em] transition-colors ${
                isActive(link.href)
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Center/Right — Brand (right-aligned on mobile, centered on desktop) */}
        {/* Mobile: Link to About */}
        <Link
          href="/about"
          className="md:hidden text-base font-bold uppercase tracking-[0.2em] text-right px-6"
        >
          Yi Yang
        </Link>
        {/* Desktop: Link to Archive */}
        <Link
          href="/archive"
          className="hidden md:block text-lg font-bold uppercase tracking-[0.2em] text-center px-6"
        >
          Yi Yang&nbsp;杨 艺
        </Link>

        {/* Right — Utility links + theme toggle (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-end gap-4 md:gap-6">
          {RIGHT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[10px] md:text-xs uppercase tracking-[0.15em] transition-colors ${
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
    </header>
  );
}
