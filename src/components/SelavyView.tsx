"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
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

const PERF_COUNT = 38;

function SprocketHoles() {
  const holes = useMemo(
    () =>
      Array.from({ length: PERF_COUNT }, (_, i) => <span key={i} />),
    [],
  );
  return <>{holes}</>;
}

export default function SelavyView({ photos }: SelavyViewProps) {
  const [order, setOrder] = useState(photos);
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setOrder(shuffle(photos));
    setMounted(true);

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [photos]);

  const current = order[0] ?? null;

  const advance = useCallback(() => {
    setAnimKey((k) => k + 1);
    setOrder((prev) => {
      if (prev.length <= 1) return shuffle(photos);
      return prev.slice(1);
    });
  }, [photos]);

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-49px)]">
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
          No photographs yet
        </p>
      </div>
    );
  }

  const frameIndex = photos.length - order.length + 1;
  const frameCode = `${String(frameIndex).padStart(2, "0")}A`;

  return (
    <div className="h-[calc(100dvh-49px)] flex flex-col items-center px-3 sm:px-4 pt-2 pb-2">
      {current && (
        <button
          onClick={advance}
          className="relative w-full flex-1 min-h-0 cursor-pointer flex items-center justify-center"
        >
          {/* Film strip frame */}
          <div className="film-strip film-grain relative w-full h-full max-w-[min(100%,calc((100dvh-130px)*1.5))]">
            {/* Sprocket holes */}
            <div className="film-perf-top">
              <SprocketHoles />
            </div>
            <div className="film-perf-bottom">
              <SprocketHoles />
            </div>

            {/* Frame code markings */}
            <span className="film-code film-code--top">{frameCode}</span>
            <span className="film-code film-code--bottom">
              {photos.length}K
            </span>

            {/* Photo window */}
            <div className="film-window w-full h-full">
              <div key={animKey} className="film-slide-enter w-full h-full relative">
                <Image
                  src={current.image}
                  alt="Street photograph"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </button>
      )}

      <div className="flex items-center gap-6 shrink-0 py-3">
        <span className="text-sm leading-normal text-[var(--color-alt)]">
          {frameIndex} / {photos.length}
        </span>
      </div>
    </div>
  );
}
