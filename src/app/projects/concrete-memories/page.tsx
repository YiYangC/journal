import ConcreteMemories from "@/components/ConcreteMemories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Memories | Yi Yang",
  description:
    "For a material that takes the form of its form, Concrete was never brutal, nor rough to me.",
};

export default function ConcreteMemoriesPage() {
  return <ConcreteMemories />;
}
