"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import { useTheme } from "./ThemeProvider";
import { Article, Location, SelavyPhoto } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import "mapbox-gl/dist/mapbox-gl.css";

type SelectedPin =
  | { type: "article"; slug: string }
  | { type: "location"; index: number }
  | { type: "selavy"; index: number }
  | null;

interface MapViewProps {
  articles: Article[];
  locations: Location[];
  selavyPhotos?: SelavyPhoto[];
}

export default function MapView({ articles, locations, selavyPhotos = [] }: MapViewProps) {
  const { theme } = useTheme();
  const [selected, setSelected] = useState<SelectedPin>(null);
  const [indexOpen, setIndexOpen] = useState(false);
  const mapRef = useRef<MapRef>(null);

  const selectedArticle = useMemo(
    () =>
      selected?.type === "article"
        ? articles.find((a) => a.slug === selected.slug) ?? null
        : null,
    [articles, selected]
  );

  const selectedLocation = useMemo(
    () =>
      selected?.type === "location" ? locations[selected.index] ?? null : null,
    [locations, selected]
  );

  const selectedSelavy = useMemo(
    () =>
      selected?.type === "selavy" ? selavyPhotos[selected.index] ?? null : null,
    [selavyPhotos, selected]
  );

  const allCoords = useMemo(() => {
    const fromArticles = articles.map((a) => a.coordinates!);
    const fromLocations = locations.map((l) => l.coordinates);
    const fromSelavy = selavyPhotos.map((p) => p.coordinates);
    return [...fromArticles, ...fromLocations, ...fromSelavy];
  }, [articles, locations, selavyPhotos]);

  const initialViewState = useMemo(() => {
    if (allCoords.length === 0) return { latitude: 40, longitude: 0, zoom: 2 };
    const lats = allCoords.map((c) => c[0]);
    const lngs = allCoords.map((c) => c[1]);
    return {
      latitude: (Math.min(...lats) + Math.max(...lats)) / 2,
      longitude: (Math.min(...lngs) + Math.max(...lngs)) / 2,
      zoom: 2,
    };
  }, [allCoords]);

  const mapStyle =
    theme === "dark"
      ? "mapbox://styles/mapbox/dark-v11"
      : "mapbox://styles/mapbox/light-v11";

  const handleClick = useCallback(
    (pin: NonNullable<SelectedPin>) => {
      setSelected((prev) => {
        if (!prev) return pin;
        if (prev.type === pin.type) {
          if (
            (prev.type === "article" &&
              pin.type === "article" &&
              prev.slug === pin.slug) ||
            (prev.type === "location" &&
              pin.type === "location" &&
              prev.index === pin.index) ||
            (prev.type === "selavy" &&
              pin.type === "selavy" &&
              prev.index === pin.index)
          )
            return null;
        }
        return pin;
      });
    },
    []
  );

  const flyTo = useCallback(
    (lat: number, lng: number) => {
      mapRef.current?.flyTo({ center: [lng, lat], zoom: 12, duration: 1500 });
    },
    []
  );

  const handleIndexArticleClick = useCallback(
    (article: Article) => {
      setSelected({ type: "article", slug: article.slug });
      flyTo(article.coordinates![0], article.coordinates![1]);
    },
    [flyTo]
  );

  const handleIndexLocationClick = useCallback(
    (index: number, location: Location) => {
      setSelected({ type: "location", index });
      flyTo(location.coordinates[0], location.coordinates[1]);
    },
    [flyTo]
  );

  const handleIndexSelavyClick = useCallback(
    (index: number, photo: SelavyPhoto) => {
      setSelected({ type: "selavy", index });
      flyTo(photo.coordinates[0], photo.coordinates[1]);
    },
    [flyTo]
  );

  // Group locations by visited status
  const visitedLocations = useMemo(
    () => locations.map((l, i) => ({ location: l, index: i })).filter((x) => x.location.visited),
    [locations]
  );
  const wishlistLocations = useMemo(
    () => locations.map((l, i) => ({ location: l, index: i })).filter((x) => !x.location.visited),
    [locations]
  );

  return (
    <div className="w-full h-[calc(100vh-57px)] relative">
      <Map
        ref={mapRef}
        initialViewState={initialViewState}
        mapStyle={mapStyle}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
        onClick={() => setSelected(null)}
      >
        <NavigationControl position="top-right" />

        {/* Article markers — filled circles */}
        {articles.map((article) => {
          const isSelected =
            selected?.type === "article" && selected.slug === article.slug;
          return (
            <Marker
              key={`article-${article.slug}`}
              latitude={article.coordinates![0]}
              longitude={article.coordinates![1]}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleClick({ type: "article", slug: article.slug });
              }}
            >
              <button
                className="w-3 h-3 rounded-full border-2 transition-all duration-200 hover:scale-150 cursor-pointer"
                style={{
                  backgroundColor: isSelected
                    ? "var(--color-text)"
                    : "var(--color-bg)",
                  borderColor: "var(--color-text)",
                }}
                aria-label={`View ${article.title}`}
              />
            </Marker>
          );
        })}

        {/* Location markers — circles for visited, flags for not visited */}
        {locations.map((location, i) => {
          const isSelected =
            selected?.type === "location" && selected.index === i;
          return (
            <Marker
              key={`location-${i}`}
              latitude={location.coordinates[0]}
              longitude={location.coordinates[1]}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleClick({ type: "location", index: i });
              }}
            >
              {location.visited ? (
                <button
                  className="w-2.5 h-2.5 rounded-full border transition-all duration-200 hover:scale-150 cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? "var(--color-text)"
                      : "var(--color-bg)",
                    borderColor: "var(--color-alt, var(--color-text))",
                  }}
                  aria-label={`View ${location.name}`}
                />
              ) : (
                <button
                  className="transition-all duration-200 hover:scale-150 cursor-pointer"
                  style={{ background: "none", border: "none", padding: 0 }}
                  aria-label={`View ${location.name}`}
                >
                  <svg width="18" height="18" viewBox="0 0 14 14">
                    <line x1="3" y1="2" x2="3" y2="13" stroke="var(--color-alt, var(--color-text))" strokeWidth="1.2" />
                    <path
                      d="M3,2 L11,3.5 L11,7.5 L3,6 Z"
                      fill={isSelected ? "var(--color-text)" : "var(--color-alt, var(--color-text))"}
                      opacity={isSelected ? 1 : 0.5}
                    />
                  </svg>
                </button>
              )}
            </Marker>
          );
        })}

        {/* Selavy markers — small diamonds */}
        {selavyPhotos.map((photo, i) => {
          const isSelected =
            selected?.type === "selavy" && selected.index === i;
          return (
            <Marker
              key={`selavy-${i}`}
              latitude={photo.coordinates[0]}
              longitude={photo.coordinates[1]}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleClick({ type: "selavy", index: i });
              }}
            >
              <button
                className="w-2.5 h-2.5 transition-all duration-200 hover:scale-150 cursor-pointer"
                style={{
                  backgroundColor: isSelected
                    ? "var(--color-text)"
                    : "var(--color-alt, var(--color-text))",
                  borderColor: "var(--color-text)",
                  border: "1px solid var(--color-text)",
                  transform: "rotate(45deg)",
                  opacity: isSelected ? 1 : 0.6,
                }}
                aria-label={`View selavy photo from ${photo.location}`}
              />
            </Marker>
          );
        })}

        {/* Article popup */}
        {selectedArticle && (
          <Popup
            latitude={selectedArticle.coordinates![0]}
            longitude={selectedArticle.coordinates![1]}
            onClose={() => setSelected(null)}
            closeOnClick={false}
            offset={12}
            className="map-popup"
            maxWidth="280px"
          >
            <Link
              href={`/archive/${selectedArticle.slug}`}
              className="block group"
            >
              <div className="relative w-full aspect-[3/2] overflow-hidden mb-2">
                <Image
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="280px"
                />
              </div>
              <h3 className="text-sm font-semibold leading-tight mb-1 text-[#111] group-hover:underline">
                {selectedArticle.title}
              </h3>
              <p className="text-xs text-[#666]">
                {selectedArticle.location}
              </p>
            </Link>
          </Popup>
        )}

        {/* Location popup */}
        {selectedLocation && (
          <Popup
            latitude={selectedLocation.coordinates[0]}
            longitude={selectedLocation.coordinates[1]}
            onClose={() => setSelected(null)}
            closeOnClick={false}
            offset={12}
            className="map-popup"
            maxWidth="280px"
          >
            <div>
              <h3 className="text-sm font-semibold leading-tight mb-1 text-[#111]">
                {selectedLocation.name}
              </h3>
              <p className="text-xs text-[#666]">
                {selectedLocation.address}
              </p>
              <p className="text-[10px] mt-1.5 uppercase tracking-wider text-[#999]">
                {selectedLocation.visited
                  ? selectedLocation.visitDate
                    ? `Visited ${new Date(selectedLocation.visitDate + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`
                    : "Visited"
                  : "Want to visit"}
              </p>
            </div>
          </Popup>
        )}

        {/* Selavy popup */}
        {selectedSelavy && (
          <Popup
            latitude={selectedSelavy.coordinates[0]}
            longitude={selectedSelavy.coordinates[1]}
            onClose={() => setSelected(null)}
            closeOnClick={false}
            offset={12}
            className="map-popup"
            maxWidth="280px"
          >
            <div>
              <div className="relative w-full aspect-[3/2] overflow-hidden mb-2">
                <Image
                  src={selectedSelavy.image}
                  alt={`Street photograph — ${selectedSelavy.location}`}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
              <p className="text-xs text-[#666]">
                {selectedSelavy.location}
              </p>
              {selectedSelavy.date && (
                <p className="text-[10px] mt-1 uppercase tracking-wider text-[#999]">
                  {new Date(selectedSelavy.date + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              )}
              <p className="text-[10px] mt-1 uppercase tracking-wider text-[#999]">
                Selavy
              </p>
            </div>
          </Popup>
        )}
      </Map>

      {/* Floating Index Toggle */}
      <button
        onClick={() => setIndexOpen((prev) => !prev)}
        className="absolute top-4 left-4 z-10 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] cursor-pointer border transition-colors"
        style={{
          backgroundColor: indexOpen
            ? "var(--color-text)"
            : "color-mix(in srgb, var(--color-bg) 80%, transparent)",
          color: indexOpen ? "var(--color-bg)" : "var(--color-text)",
          borderColor: "var(--color-text)",
          backdropFilter: "blur(12px)",
        }}
      >
        Index
      </button>

      {/* Floating Index Panel */}
      {indexOpen && (
        <div
          className="absolute top-14 left-4 z-10 w-72 max-h-[calc(100vh-140px)] overflow-y-auto border"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-bg) 85%, transparent)",
            borderColor: "var(--color-border)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Articles section */}
          {articles.length > 0 && (
            <div className="p-3 border-b" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: "var(--color-alt)" }}>
                Articles ({articles.length})
              </h3>
              <ul className="space-y-1">
                {articles.map((article) => (
                  <li key={article.slug}>
                    <button
                      onClick={() => handleIndexArticleClick(article)}
                      className="w-full text-left text-xs py-1 px-1.5 -mx-1.5 rounded transition-colors hover:bg-[var(--color-border)] cursor-pointer"
                      style={{ color: "var(--color-text)" }}
                    >
                      {article.title}
                      <span className="block text-[10px]" style={{ color: "var(--color-alt)" }}>
                        {article.location}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Visited locations section */}
          {visitedLocations.length > 0 && (
            <div className="p-3 border-b" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: "var(--color-alt)" }}>
                Visited ({visitedLocations.length})
              </h3>
              <ul className="space-y-1">
                {visitedLocations.map(({ location, index }) => (
                  <li key={index}>
                    <button
                      onClick={() => handleIndexLocationClick(index, location)}
                      className="w-full text-left text-xs py-1 px-1.5 -mx-1.5 rounded transition-colors hover:bg-[var(--color-border)] cursor-pointer"
                      style={{ color: "var(--color-text)" }}
                    >
                      {location.name}
                      <span className="block text-[10px]" style={{ color: "var(--color-alt)" }}>
                        {location.address}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Wishlist locations section */}
          {wishlistLocations.length > 0 && (
            <div className="p-3 border-b" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: "var(--color-alt)" }}>
                Want to visit ({wishlistLocations.length})
              </h3>
              <ul className="space-y-1">
                {wishlistLocations.map(({ location, index }) => (
                  <li key={index}>
                    <button
                      onClick={() => handleIndexLocationClick(index, location)}
                      className="w-full text-left text-xs py-1 px-1.5 -mx-1.5 rounded transition-colors hover:bg-[var(--color-border)] cursor-pointer"
                      style={{ color: "var(--color-text)" }}
                    >
                      {location.name}
                      <span className="block text-[10px]" style={{ color: "var(--color-alt)" }}>
                        {location.address}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Selavy photos section */}
          {selavyPhotos.length > 0 && (
            <div className="p-3">
              <h3 className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: "var(--color-alt)" }}>
                Selavy ({selavyPhotos.length})
              </h3>
              <ul className="space-y-1">
                {selavyPhotos.map((photo, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleIndexSelavyClick(index, photo)}
                      className="w-full text-left text-xs py-1 px-1.5 -mx-1.5 rounded transition-colors hover:bg-[var(--color-border)] cursor-pointer"
                      style={{ color: "var(--color-text)" }}
                    >
                      {photo.location}
                      {photo.date && (
                        <span className="block text-[10px]" style={{ color: "var(--color-alt)" }}>
                          {photo.date}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
