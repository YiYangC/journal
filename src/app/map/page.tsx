import { getAllArticles } from "@/lib/articles";
import { Location, SelavyPhoto } from "@/lib/types";
import MapView from "@/components/MapView";
import locationsData from "@/../content/locations.json";
import selavyData from "@/../content/selavy.json";

export const metadata = {
  title: "Map",
  description: "Explore article locations on an interactive map.",
};

export default function MapPage() {
  const articles = getAllArticles().filter((a) => a.coordinates);
  const locations = locationsData as Location[];
  const selavyPhotos = (selavyData as SelavyPhoto[]).filter(
    (p) => p.coordinates
  );

  return (
    <MapView
      articles={articles}
      locations={locations}
      selavyPhotos={selavyPhotos}
    />
  );
}
