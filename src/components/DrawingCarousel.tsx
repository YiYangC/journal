"use client";

import { useState } from "react";

const DRAWINGS = [
  "https://ik.imagekit.io/mrdwtdivtag/Concrete/drawing-01_Tnh9VVgG6.png?updatedAt=1647661912398",
  "https://ik.imagekit.io/mrdwtdivtag/Concrete/drawing-02_9jzpicGEh.png?updatedAt=1647661911542",
  "https://ik.imagekit.io/mrdwtdivtag/Concrete/drawing-03_7QOgAh3QFR9.png?updatedAt=1647661910640",
  "https://ik.imagekit.io/mrdwtdivtag/Concrete/drawing-04_qZzEMAyHtLUX.png?updatedAt=1647661909708",
  "https://ik.imagekit.io/mrdwtdivtag/Concrete/drawing-05_q7BsVqNd8A.jpg?updatedAt=1647661908574",
];

export default function DrawingCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % DRAWINGS.length);
  };

  return (
    <div className="concrete-drawing-carousel">
      <p className="concrete-section-title">
        <em>When placed on site ...</em>
      </p>
      <div className="concrete-carousel-counter">
        {index + 1} / {DRAWINGS.length}
      </div>
      <button onClick={next} className="concrete-carousel-btn">
        <span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DRAWINGS[index]}
            alt={`Architectural drawing ${index + 1} of ${DRAWINGS.length}`}
            className="concrete-carousel-img"
          />
        </span>
      </button>
    </div>
  );
}
