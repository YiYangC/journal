import SelavyView from "@/components/SelavyView";
import { SelavyPhoto } from "@/lib/types";
import selavyData from "@/../content/selavy.json";

export const metadata = {
  title: "Selavy",
  description: "Random street photography.",
};

export default function SelavyPage() {
  const photos = selavyData as SelavyPhoto[];

  return <SelavyView photos={photos} />;
}
