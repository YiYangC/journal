"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { SelavyPhoto } from "@/lib/types";

interface SelavyViewProps {
  photos: SelavyPhoto[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/*
 * Pre-computed scattered positions for the desktop layout.
 * Each: [top%, left%, rotation deg, width%, zIndex]
 */
const SCATTER: [number, number, number, number, number][] = [
  [2, 3, -4, 28, 3],
  [5, 38, 2.5, 24, 5],
  [1, 68, -1.5, 26, 2],
  [22, 8, 3, 22, 7],
  [18, 48, -3, 30, 4],
  [20, 72, 1, 23, 6],
  [40, 2, -2, 25, 8],
  [38, 32, 4, 27, 1],
  [42, 62, -5, 24, 9],
  [36, 80, 2, 20, 3],
  [58, 5, 1.5, 26, 5],
  [55, 35, -3.5, 28, 2],
  [60, 65, 3, 22, 7],
  [56, 85, -1, 18, 4],
  [75, 10, -4, 24, 6],
  [72, 40, 2, 26, 8],
  [78, 70, -2, 25, 1],
  [70, 0, 3.5, 20, 9],
  [85, 25, -1.5, 23, 3],
  [88, 55, 4, 27, 5],
  [82, 78, -3, 22, 2],
  [95, 5, 1, 25, 7],
  [92, 45, -2.5, 24, 4],
  [98, 70, 3, 26, 6],
  [100, 30, -4.5, 20, 8],
];

export default function SelavyView({ photos }: SelavyViewProps) {
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<SelavyPhoto[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setOrder(shuffle(photos));
    setMounted(true);
  }, [photos]);

  /* Desktop: hover to focus */
  const handleMouseEnter = useCallback((i: number) => {
    setFocusedIndex(i);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setFocusedIndex(null);
  }, []);

  /* Mobile: scroll-to-focus using IntersectionObserver */
  useEffect(() => {
    if (!mounted) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouch) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let maxIdx = -1;
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-idx"));
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxIdx = idx;
          }
        });
        if (maxIdx >= 0 && maxRatio > 0.4) {
          setFocusedIndex(maxIdx);
        }
      },
      {
        root: containerRef.current,
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mounted, order.length]);

  if (!mounted || photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-49px)]">
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
          {photos.length === 0 ? "No photographs yet" : "\u00A0"}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="gaze h-[calc(100dvh-49px)] overflow-y-auto overflow-x-hidden"
    >
      {/* Desktop: scattered absolute layout */}
      <div className="gaze-desktop">
        {order.map((photo, i) => {
          const [top, left, rot, w, z] = SCATTER[i % SCATTER.length];
          const isFocused = focusedIndex === i;
          const hasAnyFocus = focusedIndex !== null;

          return (
            <div
              key={photo.image}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-idx={i}
              className="gaze-card"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${w}%`,
                zIndex: isFocused ? 50 : z,
                transform: `rotate(${rot}deg)${isFocused ? " scale(1.08)" : ""}`,
                filter:
                  hasAnyFocus && !isFocused
                    ? "blur(6px) brightness(0.3)"
                    : "none",
                opacity: hasAnyFocus && !isFocused ? 0.5 : 1,
                transition:
                  "filter 0.4s ease, opacity 0.4s ease, transform 0.3s ease, z-index 0s",
              }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="gaze-card__inner">
                <Image
                  src={photo.image}
                  alt="Street photograph"
                  fill
                  className="object-cover"
                  sizes="30vw"
                  priority={i < 6}
                />
              </div>
              {/* Date label visible on focus */}
              <div
                className="gaze-card__date"
                style={{ opacity: isFocused ? 1 : 0 }}
              >
                {photo.date
                  ? new Date(photo.date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric" },
                    )
                  : ""}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: staggered vertical layout with scroll-to-focus */}
      <div className="gaze-mobile">
        {order.map((photo, i) => {
          const isFocused = focusedIndex === i;
          const isLeft = i % 2 === 0;

          return (
            <div
              key={photo.image}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-idx={i}
              className={`gaze-mobile__card ${isLeft ? "gaze-mobile__card--left" : "gaze-mobile__card--right"}`}
              style={{
                filter: isFocused
                  ? "none"
                  : "blur(3px) brightness(0.5)",
                opacity: isFocused ? 1 : 0.6,
                transform: isFocused ? "scale(1.02)" : "scale(0.96)",
                transition:
                  "filter 0.5s ease, opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <div className="gaze-mobile__img">
                <Image
                  src={photo.image}
                  alt="Street photograph"
                  fill
                  className="object-cover"
                  sizes="75vw"
                  priority={i < 3}
                />
              </div>
              <span
                className="gaze-mobile__date"
                style={{ opacity: isFocused ? 1 : 0 }}
              >
                {photo.date
                  ? new Date(photo.date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric" },
                    )
                  : ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
