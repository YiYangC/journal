"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
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

/* deterministic-ish rotation from an index seed */
function seededRotation(seed: number, range: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return (x - Math.floor(x) - 0.5) * 2 * range;
}

const STACK_SIZE = 4;

export default function SelavyView({ photos }: SelavyViewProps) {
  const [order, setOrder] = useState(photos);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [swiping, setSwiping] = useState<"left" | "right" | null>(null);
  const transitioning = useRef(false);

  useEffect(() => {
    setOrder(shuffle(photos));
    setMounted(true);

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [photos]);

  const current = order[index] ?? null;

  /* stable per-position rotations */
  const rotations = useMemo(
    () => order.map((_, i) => seededRotation(i, 4)),
    [order],
  );

  const navigate = useCallback(
    (dir: "left" | "right") => {
      if (transitioning.current) return;
      transitioning.current = true;
      setSwiping(dir);

      setTimeout(() => {
        if (dir === "right") {
          if (index >= order.length - 1) {
            setOrder(shuffle(photos));
            setIndex(0);
          } else {
            setIndex(index + 1);
          }
        } else {
          setIndex(index <= 0 ? order.length - 1 : index - 1);
        }
        setSwiping(null);
        transitioning.current = false;
      }, 320);
    },
    [index, order.length, photos],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      navigate(x < rect.width / 2 ? "left" : "right");
    },
    [navigate],
  );

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-49px)]">
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
          No photographs yet
        </p>
      </div>
    );
  }

  /* build visible stack — rendered back-to-front */
  const cards: React.ReactNode[] = [];

  for (let depth = STACK_SIZE - 1; depth >= 0; depth--) {
    const photoIdx = (index + depth) % order.length;
    const photo = order[photoIdx];
    if (!photo) continue;

    const isTop = depth === 0;
    const rot = isTop ? 0 : rotations[(photoIdx + depth) % rotations.length];
    const scale = 1 - depth * 0.018;
    const yShift = depth * -3;

    const swipeClass =
      isTop && swiping
        ? swiping === "right"
          ? "photo-stack-swipe-right"
          : "photo-stack-swipe-left"
        : "";

    cards.push(
      <div
        key={`${photoIdx}-${depth}`}
        className={`photo-stack-card ${swipeClass}`}
        style={
          isTop && swiping
            ? { zIndex: STACK_SIZE - depth }
            : {
                transform: `rotate(${rot}deg) scale(${scale}) translateY(${yShift}px)`,
                zIndex: STACK_SIZE - depth,
              }
        }
      >
        <Image
          src={photo.image}
          alt="Street photograph"
          fill
          className="object-cover"
          sizes="(max-height: 800px) 92vw, 80vh"
          priority={isTop}
        />
      </div>,
    );
  }

  return (
    <div className="h-[calc(100dvh-49px)] flex flex-col items-center justify-center px-3 sm:px-4 pt-2 pb-2">
      {/* stack area — fixed 3:2 card centred in the viewport */}
      <div
        onClick={handleClick}
        className="photo-stack-frame relative cursor-pointer"
      >
        {mounted && cards}
      </div>

      {/* info bar */}
      <div className="flex items-center justify-between w-full shrink-0 py-3">
        <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
          {current?.date
            ? new Date(current.date + "T00:00:00").toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
            : "\u00A0"}
        </span>
        <span className="text-sm leading-normal text-[var(--color-alt)]">
          {index + 1} / {photos.length}
        </span>
      </div>
    </div>
  );
}
