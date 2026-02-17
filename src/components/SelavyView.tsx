"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SelavyPhoto } from "@/lib/types";

interface SelavyViewProps {
  photos: SelavyPhoto[];
}

/* Screenplay-style sluglines paired with each frame */
const SLUGLINES: string[] = [
  "EXT. CROSSWALK — DUSK",
  "INT. STATION PLATFORM — MORNING",
  "EXT. ALLEYWAY — GOLDEN HOUR",
  "EXT. WATERFRONT — OVERCAST",
  "INT. CAFÉ WINDOW — AFTERNOON",
  "EXT. BOULEVARD — NIGHT",
  "EXT. BRIDGE — DAWN",
  "INT. LOBBY — MIDDAY",
  "EXT. MARKET — LATE AFTERNOON",
  "EXT. PARK BENCH — FOG",
  "INT. TRAIN CAR — EVENING",
  "EXT. ROOFTOP — TWILIGHT",
  "EXT. SIDEWALK — RAIN",
  "INT. STAIRWELL — SHADOW",
  "EXT. HARBOR — FIRST LIGHT",
  "EXT. CORNER — DUSK",
  "INT. CORRIDOR — NOON",
  "EXT. PLAZA — OVERCAST",
  "EXT. UNDERPASS — NIGHT",
  "INT. WINDOW SEAT — MORNING",
  "EXT. PIER — GOLDEN HOUR",
  "EXT. INTERSECTION — AFTERNOON",
  "INT. DOORWAY — HALF-LIGHT",
  "EXT. COURTYARD — EVENING",
  "EXT. FIRE ESCAPE — DAWN",
];

const SCENE_LINES: string[] = [
  "A figure hesitates at the edge of the frame.",
  "The light bends. Everything slows.",
  "She looks up. The camera doesn't follow.",
  "The reflection holds longer than the moment.",
  "Two strangers pass. Neither turns.",
  "The neon stutters. A door closes.",
  "Morning arrives like an afterthought.",
  "He waits for no one in particular.",
  "The shadow moves before the person does.",
  "A window catches something the street missed.",
  "The crowd thins. The silence widens.",
  "Someone left the radio on.",
  "The pavement still holds yesterday's rain.",
  "She turns the corner and disappears.",
  "A single gesture, unrepeatable.",
  "The sign flickers. The city exhales.",
  "Nothing happens. Everything shifts.",
  "The distance between them is exact.",
  "A hand reaches for something out of frame.",
  "The hour changes. The mood doesn't.",
  "Light falls through the gap like a sentence.",
  "He stands where the photograph will be.",
  "The scene rewrites itself in the glass.",
  "A door opens to a different time.",
  "The last frame before the cut.",
];

export default function SelavyView({ photos }: SelavyViewProps) {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState<{
    index: number;
    rect: DOMRect;
    phase: "entering" | "open" | "exiting";
  } | null>(null);

  const openLightbox = (i: number, e: React.MouseEvent) => {
    const imgEl = (e.currentTarget as HTMLElement).querySelector(
      ".storyboard-frame__img",
    );
    if (!imgEl) return;
    setLightbox({
      index: i,
      rect: imgEl.getBoundingClientRect(),
      phase: "entering",
    });
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    // Re-read the source frame rect (may have scrolled)
    const frames =
      scrollRef.current?.querySelectorAll<HTMLElement>(".storyboard-frame__img");
    const rect =
      frames?.[lightbox.index]?.getBoundingClientRect() ?? lightbox.rect;
    setLightbox({ ...lightbox, rect, phase: "exiting" });
    setTimeout(() => setLightbox(null), 400);
  };

  /* Sort chronologically for narrative flow */
  const sorted = [...photos].sort((a, b) => {
    const da = a.date || "9999";
    const db = b.date || "9999";
    return da.localeCompare(db);
  });

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* Transition entering → open after initial paint */
  useEffect(() => {
    if (lightbox?.phase !== "entering") return;
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => {
        setLightbox((prev) => (prev ? { ...prev, phase: "open" } : null));
      });
    });
    return () => cancelAnimationFrame(id);
  }, [lightbox?.phase]);

  /* Close fullscreen on Escape */
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  /* Track which frame is centered */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      const frames = el.querySelectorAll<HTMLElement>(".storyboard-frame");
      let closest = 0;
      let minDist = Infinity;
      frames.forEach((f, i) => {
        const mid = f.offsetLeft + f.offsetWidth / 2;
        const d = Math.abs(center - mid);
        if (d < minDist) {
          minDist = d;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [sorted.length, mounted]);

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
    <div className="storyboard h-[calc(100dvh-49px)] flex flex-col">
      {/* Horizontal strip */}
      <div ref={scrollRef} className="storyboard-strip">
        {sorted.map((photo, i) => (
          <article
            key={photo.image}
            className="storyboard-frame"
            onClick={(e) => openLightbox(i, e)}
          >
            <div className="storyboard-frame__img">
              <Image
                src={photo.image}
                alt="Street photograph"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 85vw, 60vh"
                priority={i < 3}
              />
            </div>

            <div className="storyboard-frame__caption">
              <span className="storyboard-frame__slugline">
                {SLUGLINES[i % SLUGLINES.length]}
              </span>
              <span className="storyboard-frame__scene">
                {SCENE_LINES[i % SCENE_LINES.length]}
              </span>
            </div>
          </article>
        ))}

        {/* End spacer so last frame can center */}
        <div className="storyboard-spacer" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between w-full shrink-0 px-3 sm:px-4 py-3">
        <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)] font-mono">
          {sorted[activeIndex]?.date
            ? new Date(
                sorted[activeIndex].date + "T00:00:00",
              ).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
            : "\u00A0"}
        </span>
        <span className="text-sm leading-normal text-[var(--color-alt)]">
          {activeIndex + 1} / {sorted.length}
        </span>
      </div>

      {/* Fullscreen lightbox — FLIP animation from source frame */}
      {lightbox && (() => {
        const { rect: r, phase, index } = lightbox;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const collapsed = phase !== "open";

        // Uniform scale so the fullscreen container maps to the source rect
        const scale = Math.min(r.width / vw, r.height / vh);
        const tx = r.left + r.width / 2 - vw / 2;
        const ty = r.top + r.height / 2 - vh / 2;

        return (
          <div
            className="fixed inset-0 z-50 cursor-pointer"
            onClick={closeLightbox}
            style={{
              backgroundColor: collapsed
                ? "rgba(0,0,0,0)"
                : "rgba(0,0,0,0.95)",
              transition: "background-color 0.4s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: collapsed
                  ? `translate3d(${tx}px,${ty}px,0) scale(${scale})`
                  : "translate3d(0,0,0) scale(1)",
                transition:
                  phase === "entering"
                    ? "none"
                    : "transform 0.4s cubic-bezier(0.2,1,0.7,1)",
              }}
            >
              <Image
                src={sorted[index].image}
                alt="Street photograph"
                fill
                className="object-contain p-4 sm:p-8"
                sizes="100vw"
              />
            </div>
            <span
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.15em] text-[#555] font-mono"
              style={{
                opacity: phase === "open" ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              {SLUGLINES[index % SLUGLINES.length]}
            </span>
          </div>
        );
      })()}
    </div>
  );
}
