import Image from "next/image";

interface PhotoGridProps {
  images: string[];
  columns?: 2 | 3 | 4;
}

export default function PhotoGrid({ images, columns = 3 }: PhotoGridProps) {
  const colClass = {
    2: "columns-1 md:columns-2",
    3: "columns-1 md:columns-2 lg:columns-3",
    4: "columns-1 md:columns-2 lg:columns-4",
  }[columns];

  return (
    <div className={`${colClass} gap-4 p-[3rem]`}>
      {images.map((src, i) => (
        <div key={i} className="mb-4 break-inside-avoid overflow-hidden group">
          <Image
            src={src}
            alt={`Photo ${i + 1}`}
            width={1600}
            height={1200}
            className="w-full h-auto object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.7,1)] group-hover:scale-[1.03]"
            sizes={
              {
                2: "(min-width: 768px) 50vw, 100vw",
                3: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
                4: "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
              }[columns]
            }
          />
        </div>
      ))}
    </div>
  );
}
