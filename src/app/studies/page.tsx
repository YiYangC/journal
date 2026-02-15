import WritingsMenu from "@/components/WritingsMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studies | Yi Yang",
  description:
    "Selected projects and essays on architecture, technology, media, and design.",
};

const ITEMS = [
  {
    slug: "concrete-memories",
    title: "Concrete Memories",
    href: "/projects/concrete-memories",
    category: "project",
  },
  {
    slug: "where-did-the-wires-go",
    title: "Where Did the Wires Go?",
    href: "/writings/where-did-the-wires-go",
    category: "product",
  },
  {
    slug: "what-is-archive",
    title: "What is Archive",
    href: "/writings/what-is-archive",
  },
  {
    slug: "theater-sets-redux",
    title: "Theater Sets Redux",
    href: "/writings/theater-sets-redux",
    category: "design",
  },
  {
    slug: "choreography-and-city",
    title: "Choreography & City",
    href: "/writings/choreography-and-city",
    category: "architecture",
  },
  {
    slug: "hitchcockian-threshold",
    title: "The Hitchcockian Threshold",
    href: "/writings/hitchcockian-threshold",
    category: "film",
  },
  {
    slug: "all-the-worlds-a-stage",
    title: "All the World's a Stage",
    href: "/writings/all-the-worlds-a-stage",
    category: "design",
  },
  {
    slug: "customers-and-users",
    title: "Customers & Users",
    href: "/writings/customers-and-users",
    category: "product",
  },
  {
    slug: "museum-as-an-archive",
    title: "Museum as an Archive",
    href: "/writings/museum-as-an-archive",
    category: "architecture",
  },
  {
    slug: "curated-by-grandpa",
    title: "Curated by Grandpa",
    href: "/writings/curated-by-grandpa",
    category: "design",
  },
];

export default function StudiesPage() {
  return <WritingsMenu items={ITEMS} />;
}
