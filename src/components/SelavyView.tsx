"use client";

import { useState, useCallback } from "react";
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
  const [order, setOrder] = useState(() => shuffle(photos));

  const reshuffle = useCallback(() => {
    setOrder(shuffle(photos));
  }, [photos]);

  const current = order[0] ?? null;

  const advance = useCallback(() => {
    setOrder((prev) => {
      if (prev.length <= 1) return shuffle(photos);
      return prev.slice(1);
    });
  }, [photos]);

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-57px)]">
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
          No photographs yet
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-57px)] flex flex-col items-center justify-center relative px-4">
      {current && (
        <button
          onClick={advance}
          className="relative max-h-[80vh] max-w-full cursor-pointer"
        >
          <Image
            src={current.image}
            alt="Street photograph"
            width={1600}
            height={2400}
            className="max-h-[80vh] w-auto object-contain"
            sizes="100vw"
            priority
          />
        </button>
      )}

      <div className="absolute bottom-6 flex items-center gap-6">
        <button
          onClick={advance}
          className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-alt)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
        >
          Next
        </button>
        <span className="text-[10px] text-[var(--color-alt)]">
          {photos.length - order.length + 1} / {photos.length}
        </span>
        <button
          onClick={reshuffle}
          className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-alt)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}
