"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on full-screen pages
  if (pathname === "/selavy" || pathname === "/projects/concrete-memories") {
    return null;
  }

  return (
    <footer className="p-[3rem] border-t border-[var(--color-border)]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-[var(--color-alt)]">
          Yi Yang {new Date().getFullYear()}
        </p>
        <div className="flex gap-6">
          <a
            href="https://instagram.com/catherineyang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-alt)] hover:text-[var(--color-text)] transition-colors"
          >
            Instagram
          </a>
          <Link
            href="/projects/concrete-memories"
            className="text-sm text-[var(--color-alt)] hover:text-[var(--color-text)] transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="/writings"
            className="text-sm text-[var(--color-alt)] hover:text-[var(--color-text)] transition-colors"
          >
            Writings
          </Link>
        </div>
      </div>
    </footer>
  );
}
