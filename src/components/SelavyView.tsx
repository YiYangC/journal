"use client";

import { useState, useEffect, useCallback } from "react";
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

export default function SelavyView({ photos }: SelavyViewProps) {
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<SelavyPhoto[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    setOrder(shuffle(photos));
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [photos]);

  /* Desktop: hover to expand; Mobile: tap to expand */
  const handleEnter = useCallback((i: number) => {
    setExpandedIndex(i);
  }, []);

  const handleLeave = useCallback(() => {
    setExpandedIndex(null);
  }, []);

  const handleTap = useCallback(
    (i: number) => {
      /* Only on touch devices */
      if (!window.matchMedia("(pointer: coarse)").matches) return;
      setExpandedIndex((prev) => (prev === i ? null : i));
    },
    [],
  );

  if (!mounted || photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-49px)]">
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
          {photos.length === 0 ? "No photographs yet" : "\u00A0"}
        </p>
      </div>
    );
  }

  const n = order.length;
  const isAnyExpanded = expandedIndex !== null;

  return (
    <div className="accordion h-[calc(100dvh-49px)] flex flex-col">
      {/* Desktop: vertical slivers side by side */}
      <div className="accordion-desktop">
        {order.map((photo, i) => {
          const isExpanded = expandedIndex === i;

          return (
            <div
              key={photo.image}
              className="accordion-sliver"
              style={{
                flex: isExpanded
                  ? `0 0 60%`
                  : isAnyExpanded
                    ? `1 1 ${40 / (n - 1)}%`
                    : `1 1 ${100 / n}%`,
              }}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
            >
              <div className="accordion-sliver__img">
                <Image
                  src={photo.image}
                  alt="Street photograph"
                  fill
                  className="object-cover"
                  sizes={isExpanded ? "60vw" : "8vw"}
                  priority={i < 6}
                />
              </div>

              {/* Date overlay — visible only when expanded */}
              <div
                className="accordion-sliver__meta"
                style={{ opacity: isExpanded ? 1 : 0 }}
              >
                <span className="accordion-sliver__date">
                  {photo.date
                    ? new Date(photo.date + "T00:00:00").toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" },
                      )
                    : ""}
                </span>
                <span className="accordion-sliver__count">
                  {i + 1} / {n}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: horizontal bands stacked vertically */}
      <div className="accordion-mobile">
        {order.map((photo, i) => {
          const isExpanded = expandedIndex === i;

          return (
            <div
              key={photo.image}
              className="accordion-band"
              style={{
                flex: isExpanded
                  ? "0 0 55%"
                  : isAnyExpanded
                    ? `1 1 ${45 / (n - 1)}%`
                    : `1 1 ${100 / n}%`,
              }}
              onClick={() => handleTap(i)}
            >
              <div className="accordion-band__img">
                <Image
                  src={photo.image}
                  alt="Street photograph"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={i < 4}
                />
              </div>

              <div
                className="accordion-band__meta"
                style={{ opacity: isExpanded ? 1 : 0 }}
              >
                <span className="accordion-band__date">
                  {photo.date
                    ? new Date(photo.date + "T00:00:00").toLocaleDateString(
                        "en-US",
                        { month: "short", year: "numeric" },
                      )
                    : ""}
                </span>
                <span className="accordion-band__count">
                  {i + 1} / {n}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
