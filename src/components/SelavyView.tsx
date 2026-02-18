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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [aspectRatios, setAspectRatios] = useState<Map<number, number>>(
    new Map(),
  );
  const [lightbox, setLightbox] = useState<{
    index: number;
    phase: "entering" | "open" | "exiting";
  } | null>(null);

  const openLightbox = (i: number) => {
    setLightbox({ index: i, phase: "entering" });
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, phase: "exiting" });
    setTimeout(() => setLightbox(null), 300);
  };

  /* Sort chronologically for narrative flow */
  const sorted = [...photos].sort((a, b) => {
    const da = a.date || "9999";
    const db = b.date || "9999";
    return da.localeCompare(db);
  });

  /* Store aspect ratio when images load */
  const handleImageLoad =
    (index: number) => (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      const ratio = img.naturalWidth / img.naturalHeight;
      setAspectRatios((prev) => new Map(prev).set(index, ratio));
    };

  /* Compute inline width for each frame so total strip width stays constant.
     When a frame is hovered it expands; its immediate neighbours compact by
     the same total amount.  For portrait images the expansion is capped so
     the frame never gets wider than the image's natural fill width. */
  const getFrameStyle = (
    index: number,
  ): React.CSSProperties | undefined => {
    if (hoveredIndex === null) return undefined;
    if (window.innerWidth <= 640) return undefined; // no hover on mobile

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const baseW = Math.min(0.85 * vw, 0.6 * vh * 0.67);
    let expandedW = Math.min(0.85 * vw, 0.6 * vh * 1.2);

    // For portrait images, cap expansion so the image fills without zooming
    const ratio = aspectRatios.get(hoveredIndex);
    if (ratio !== undefined && ratio < 1) {
      const imgContainer = scrollRef.current?.querySelector(
        ".storyboard-frame__img",
      );
      if (imgContainer) {
        const maxW = imgContainer.clientHeight * ratio;
        expandedW = Math.min(expandedW, Math.max(baseW, maxW));
      }
    }

    let delta = expandedW - baseW;
    if (delta <= 0) return undefined; // no expansion needed

    const hasLeft = hoveredIndex > 0;
    const hasRight = hoveredIndex < sorted.length - 1;
    const neighborCount = (hasLeft ? 1 : 0) + (hasRight ? 1 : 0);
    if (neighborCount === 0) return undefined;

    // Cap so no neighbour shrinks below 50 % of base width
    const maxDelta = baseW * 0.5 * neighborCount;
    delta = Math.min(delta, maxDelta);
    const shrink = delta / neighborCount;

    if (index === hoveredIndex) return { width: baseW + delta };
    if (hasLeft && index === hoveredIndex - 1)
      return { width: baseW - shrink };
    if (hasRight && index === hoveredIndex + 1)
      return { width: baseW - shrink };
    return { width: baseW };
  };

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
      <div className="flex items-center justify-center h-[calc(100dvh-49px)] md:h-[calc(100dvh-65px)]">
        <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-alt)]">
          {photos.length === 0 ? "No photographs yet" : "\u00A0"}
        </p>
      </div>
    );
  }

  return (
    <div className="storyboard h-[calc(100dvh-49px)] md:h-[calc(100dvh-65px)] flex flex-col">
      {/* Horizontal strip */}
      <div ref={scrollRef} className={`storyboard-strip${hoveredIndex !== null ? " snapping-disabled" : ""}`}>
        {sorted.map((photo, i) => (
          <article
            key={photo.image}
            className="storyboard-frame"
            style={getFrameStyle(i)}
            onMouseEnter={() => {
              if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
              hoverTimerRef.current = setTimeout(() => setHoveredIndex(i), 500);
            }}
            onMouseLeave={() => {
              if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
              hoverTimerRef.current = null;
              setHoveredIndex(null);
            }}
            onClick={() => openLightbox(i)}
          >
            <div className="storyboard-frame__img">
              <Image
                src={photo.image}
                alt="Street photograph"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 85vw, 50vw"
                priority={i < 3}
                onLoad={handleImageLoad(i)}
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

      {/* Fullscreen lightbox — fade in / fade out */}
      {lightbox && (() => {
        const { phase, index } = lightbox;
        const visible = phase === "open";

        return (
          <div
            className="fixed inset-0 z-50 cursor-pointer"
            onClick={closeLightbox}
            style={{
              backgroundColor: visible ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0)",
              transition: "background-color 0.3s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.3s ease",
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
