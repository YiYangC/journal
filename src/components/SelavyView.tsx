"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { SelavyPhoto } from "@/lib/types";

interface SelavyViewProps {
  photos: SelavyPhoto[];
}

export default function SelavyView({ photos }: SelavyViewProps) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevIndex = useRef(0);
  const velocity = useRef(0);

  /* Sort chronologically so the scrub timeline is linear */
  const sorted = [...photos].sort((a, b) => {
    const da = a.date || "9999";
    const db = b.date || "9999";
    return da.localeCompare(db);
  });

  const n = sorted.length;

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* Map a horizontal position (0–1 ratio) to an image index */
  const xToIndex = useCallback(
    (ratio: number) => {
      return Math.min(Math.max(Math.floor(ratio * n), 0), n - 1);
    },
    [n],
  );

  /* Desktop: mousemove scrubbing */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      const next = xToIndex(ratio);

      velocity.current = Math.abs(next - prevIndex.current);
      prevIndex.current = next;
      setIndex(next);
      setScrubbing(true);
    },
    [xToIndex],
  );

  const handleMouseLeave = useCallback(() => {
    setScrubbing(false);
    velocity.current = 0;
  }, []);

  /* Mobile: touch drag scrubbing */
  const touchStart = useRef<number | null>(null);
  const touchBaseIndex = useRef(0);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStart.current = e.touches[0].clientX;
      touchBaseIndex.current = index;
      setScrubbing(true);
    },
    [index],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const el = containerRef.current;
      if (!el) return;

      const dx = e.touches[0].clientX - touchStart.current;
      const width = el.getBoundingClientRect().width;
      /* Full drag across screen width = all frames */
      const framesDelta = Math.round((dx / width) * n);
      const next = Math.min(
        Math.max(touchBaseIndex.current + framesDelta, 0),
        n - 1,
      );

      velocity.current = Math.abs(next - prevIndex.current);
      prevIndex.current = next;
      setIndex(next);
    },
    [n],
  );

  const handleTouchEnd = useCallback(() => {
    touchStart.current = null;
    setScrubbing(false);
    velocity.current = 0;
  }, []);

  if (!mounted || photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-49px)]">
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
          {photos.length === 0 ? "No photographs yet" : "\u00A0"}
        </p>
      </div>
    );
  }

  const current = sorted[index];
  const progress = n > 1 ? index / (n - 1) : 0;

  return (
    <div className="scrubber h-[calc(100dvh-49px)] flex flex-col">
      {/* Main scrub area */}
      <div
        ref={containerRef}
        className="scrubber-stage"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Preload all images (hidden) so scrubbing is instant */}
        <div className="scrubber-preload">
          {sorted.map((photo, i) => (
            <Image
              key={photo.image}
              src={photo.image}
              alt=""
              fill
              className="object-contain"
              sizes="100vw"
              priority={i < 5}
            />
          ))}
        </div>

        {/* Active image */}
        <div className="scrubber-image">
          <Image
            key={current.image}
            src={current.image}
            alt="Street photograph"
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {/* Motion blur overlay */}
        <div
          className="scrubber-blur"
          style={{ opacity: scrubbing && velocity.current > 2 ? 0.4 : 0 }}
        />

        {/* Hint text (fades out once user starts scrubbing) */}
        <div
          className="scrubber-hint"
          style={{ opacity: scrubbing ? 0 : 0.4 }}
        >
          <span>drag to scrub through time</span>
        </div>
      </div>

      {/* Timeline bar */}
      <div className="scrubber-footer">
        <div className="scrubber-timeline">
          <div
            className="scrubber-timeline__fill"
            style={{ width: `${progress * 100}%` }}
          />
          <div
            className="scrubber-timeline__head"
            style={{ left: `${progress * 100}%` }}
          />
        </div>

        <div className="scrubber-meta">
          <span className="scrubber-meta__date">
            {current?.date
              ? new Date(current.date + "T00:00:00").toLocaleDateString(
                  "en-US",
                  { month: "short", year: "numeric" },
                )
              : "\u00A0"}
          </span>
          <span className="scrubber-meta__count">
            {index + 1} / {n}
          </span>
        </div>
      </div>
    </div>
  );
}
