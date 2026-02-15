"use client";

import { useState, useCallback, useEffect, useRef } from "react";
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
  const [order, setOrder] = useState(photos);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [shutterActive, setShutterActive] = useState(false);
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

  const goTo = useCallback(
    (next: number) => {
      if (transitioning.current) return;
      transitioning.current = true;
      setShutterActive(true);

      setTimeout(() => {
        setAnimKey((k) => k + 1);
        setIndex(next);
      }, 140);

      setTimeout(() => {
        setShutterActive(false);
        transitioning.current = false;
      }, 350);
    },
    [],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const isLeft = x < rect.width / 2;

      if (isLeft) {
        // Go back — wrap to end
        const next = index <= 0 ? order.length - 1 : index - 1;
        goTo(next);
      } else {
        // Go forward — reshuffle at end
        if (index >= order.length - 1) {
          setOrder(shuffle(photos));
          goTo(0);
        } else {
          goTo(index + 1);
        }
      }
    },
    [index, order.length, photos, goTo],
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

  return (
    <div className="h-[calc(100dvh-49px)] flex flex-col items-center px-3 sm:px-4 pt-2 pb-2">
      {current && (
        <button
          onClick={handleClick}
          className="relative w-full flex-1 min-h-0 cursor-pointer overflow-hidden"
        >
          <div
            key={animKey}
            className="selavy-frame w-full h-full relative"
          >
            <Image
              src={current.image}
              alt="Street photograph"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Black shutter overlay */}
          <div
            className={`selavy-shutter ${shutterActive ? "selavy-shutter--active" : ""}`}
          />
        </button>
      )}

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
