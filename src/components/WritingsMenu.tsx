"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface MenuItem {
  slug: string;
  title: string;
  href: string;
  category?: string;
}

interface WritingsMenuProps {
  items: MenuItem[];
}

export default function WritingsMenu({ items }: WritingsMenuProps) {
  const menuRef = useRef<HTMLElement>(null);
  const clonesHeightRef = useRef(0);
  const scrollHeightRef = useRef(0);
  const rafRef = useRef<number>(0);

  const cloneItems = useCallback(() => {
    const el = menuRef.current;
    if (!el) return;

    const menuItems = el.querySelectorAll(
      ".writings-menu__item:not(.loop__clone)"
    );
    if (menuItems.length === 0) return;

    // Remove existing clones
    el.querySelectorAll(".loop__clone").forEach((clone) => clone.remove());

    const itemHeight = (menuItems[0] as HTMLElement).offsetHeight;
    const fitIn = Math.ceil(window.innerHeight / itemHeight);

    let totalClones = 0;
    for (let i = 0; i < Math.min(fitIn, menuItems.length); i++) {
      const clone = menuItems[i].cloneNode(true) as HTMLElement;
      clone.classList.add("loop__clone");
      el.appendChild(clone);
      totalClones++;
    }

    clonesHeightRef.current = totalClones * itemHeight;
    scrollHeightRef.current = el.scrollHeight;
  }, []);

  const scrollUpdate = useCallback(() => {
    const el = menuRef.current;
    if (!el) return;

    const scrollPos = el.scrollTop;

    if (clonesHeightRef.current + scrollPos >= scrollHeightRef.current) {
      el.scrollTop = 1;
    } else if (scrollPos <= 0) {
      el.scrollTop = scrollHeightRef.current - clonesHeightRef.current;
    }
  }, []);

  const render = useCallback(() => {
    scrollUpdate();
    rafRef.current = requestAnimationFrame(render);
  }, [scrollUpdate]);

  useEffect(() => {
    // Only enable infinite scroll on desktop
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    cloneItems();

    // Start with 1px scroll to allow upward scrolling
    const el = menuRef.current;
    if (el && el.scrollTop <= 0) {
      el.scrollTop = 1;
    }

    rafRef.current = requestAnimationFrame(render);

    const handleResize = () => {
      cloneItems();
      if (el && el.scrollTop <= 0) {
        el.scrollTop = 1;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [cloneItems, render]);

  return (
    <nav ref={menuRef} className="writings-menu">
      {items.map((item) => (
        <div key={item.slug} className="writings-menu__item">
          <Link
            href={item.href}
            className={`writings-menu__link${item.category ? ` writings-menu__link--${item.category}` : ""}`}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </nav>
  );
}
