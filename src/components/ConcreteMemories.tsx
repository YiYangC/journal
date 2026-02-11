"use client";

import DrawingCarousel from "./DrawingCarousel";

const DETAIL_IMAGES = {
  row1: [
    "/images/concrete/detail1.jpg",
    "/images/concrete/detail8.jpg",
    "/images/concrete/detail3.jpg",
    "/images/concrete/detail4.jpg",
    "/images/concrete/detail5.jpg",
  ],
  row2: [
    "/images/concrete/detail6.jpg",
    "/images/concrete/detail5.jpg",
    "/images/concrete/detail7.jpg",
    "/images/concrete/detail6.jpg",
    "/images/concrete/detail9.jpg",
  ],
  row3: [
    "/images/concrete/detail9.jpg",
    "/images/concrete/detail2.jpg",
    "/images/concrete/detail9.jpg",
    "/images/concrete/detail1.jpg",
    "/images/concrete/detail9.jpg",
  ],
};

const IMPRINTS_GRID = [
  [
    "https://ik.imagekit.io/mrdwtdivtag/Concrete/9_MGLGG2hWR.jpg?updatedAt=1647661882476",
    "https://ik.imagekit.io/mrdwtdivtag/Concrete/2_sfiC1KVqvC.jpg?updatedAt=1647661884981",
    "https://ik.imagekit.io/mrdwtdivtag/Concrete/6_EwOeuz_ugxA28l8R.jpg?updatedAt=1682205721654",
  ],
  [
    "https://ik.imagekit.io/mrdwtdivtag/Concrete/5_LA3d6TEtI.jpg?updatedAt=1647661884146",
    "https://ik.imagekit.io/mrdwtdivtag/Concrete/8_8ktXaFrVFxZ.jpg?updatedAt=1647661879907",
    "https://ik.imagekit.io/mrdwtdivtag/Concrete/12_ezRgvY9oU.jpg?updatedAt=1647661881621",
  ],
  [
    "https://ik.imagekit.io/mrdwtdivtag/Concrete/7_nThSMaN_5J.jpg?updatedAt=1647661906808",
    "https://ik.imagekit.io/mrdwtdivtag/Concrete/IMG_9423_QvaxxfIN_.jpeg?updatedAt=1682206168134",
    "https://ik.imagekit.io/mrdwtdivtag/Concrete/11_G0Ccu3eql.jpg?updatedAt=1647661879016",
  ],
  [
    "https://ik.imagekit.io/mrdwtdivtag/Concrete/9_MGLGG2hWR.jpg?updatedAt=1647661882476",
    "https://ik.imagekit.io/mrdwtdivtag/Concrete/1_pr3Upvzlt.jpg?updatedAt=1647661885812",
    "https://ik.imagekit.io/mrdwtdivtag/Concrete/7_nThSMaN_5J.jpg?updatedAt=1647661906808",
  ],
];

export default function ConcreteMemories() {
  return (
    <div className="dark concrete-memories">
      {/* Section 1: Hero */}
      <section className="concrete-section">
        <p className="concrete-pretitle">
          impressions
        </p>
        <h1 className="concrete-hero-title">
          concrete memories
        </h1>
      </section>

      {/* Section 2: Opening text */}
      <section className="concrete-section concrete-numbered">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ik.imagekit.io/mrdwtdivtag/Concrete/IMG_8628_VToyWsYBw.heic?ik-sdk-version=javascript-1.4.3&updatedAt=1673065792349"
          alt="Concrete texture"
          className="concrete-small-img2"
        />
        <p className="concrete-text">
          For a material that takes the form of its form, that contours the
          texture from the surface of what it forms against, Concrete was never
          brutal, nor rough to me.
          <br /><br />
          Through the gradual curing in volume from liquid to solid, with
          moisture held inside during the process, Concrete takes up the negative
          space created by the mold and then turns into a subject of itself.
        </p>
      </section>

      {/* Section 3: Studies section title */}
      <div className="concrete-placeholder">
        <p className="concrete-section-title">
          <em>Studies of Soft Concrete</em>
        </p>
      </div>

      {/* Section 4: Horizontal tile grid - Studies */}
      <section className="concrete-tiles-horizontal">
        <div className="concrete-tiles-wrap">
          {[DETAIL_IMAGES.row1, DETAIL_IMAGES.row2, DETAIL_IMAGES.row3].map(
            (row, rowIdx) => (
              <div key={rowIdx} className="concrete-tiles-row">
                {row.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="concrete-tile-img-h"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </section>

      {/* Section 5: Studies description */}
      <section className="concrete-section concrete-numbered-left">
        <p className="concrete-text concrete-text-right">
          Some studies on concrete&apos;s softness &amp; freeformness: Rockite concrete
          was mixed and then flowed into fabric wraps, then lay onto wooden
          landscape &amp; architecture models. Bags of concrete meets forces of
          straight edges, rigid geometric volumes. And it tries to mimic, to
          interpret the counterpart in its own way.
          <br /><br />
          Landscape might change its topology. Houses might be built or torn
          down. But Concrete will remember. Almost anamnesis.
        </p>
      </section>

      {/* Section 6: Drawing carousel */}
      <section className="concrete-section-smaller">
        <DrawingCarousel />
      </section>

      {/* Section 7: Site description */}
      <section className="concrete-section-short2 concrete-numbered-left">
        <p className="concrete-text concrete-text-wide concrete-text-centered">
          The site is a piece of unstable ground. Weathering will takes away its
          silhouette as time goes by. But the concrete canopies will remain to
          tell the story to the passerbys. Concrete canopies were casted using
          landscapes as molds, and then &ldquo;misplaced&rdquo; on other parts of the site.
          Curious spaces are then created by the offset of landscape and its
          mirrored concrete.
        </p>
        <p className="concrete-smalltext concrete-text-wide concrete-text-right">
          <em>
            Walking under the canopy, you can touch and feel the concrete
            surface, and wonder how far the original landscape lies ...
            <br />
            Kids run up a grass slope, the ceiling above also follows them
            up ...
            <br />
            The sunken amphitheater has a parallel overcast for shading ...
          </em>
        </p>
      </section>

      {/* Section 8: Interior section title */}
      <div className="concrete-placeholder">
        <p className="concrete-section-title">
          <em>Interior&apos;s Interior</em>
        </p>
      </div>

      {/* Section 9: Interior closeup */}
      <section className="concrete-section concrete-numbered">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ik.imagekit.io/mrdwtdivtag/Concrete/closeup_gray_VOgP7h248.jpeg?updatedAt=1682202069524"
          alt="Concrete interior closeup"
          className="concrete-wide-img-right"
        />
        <p className="concrete-text">
          An exploration in concrete as an interior finish.
        </p>
      </section>

      {/* Section 10: Interior wood */}
      <section className="concrete-section concrete-bringtofront">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ik.imagekit.io/mrdwtdivtag/Concrete/C0D214BE-811E-4C33-A151-76D50A88818B_1_r4_xYbyqT.png?updatedAt=1680554350653"
          alt="Concrete and wood interior"
          className="concrete-wide-img-left"
        />
        <p className="concrete-smalltext concrete-text-wide concrete-gray">
          Concrete holds the presence and absence of wood.
        </p>
      </section>

      {/* Section 11: Shadow render */}
      <section className="concrete-section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ik.imagekit.io/mrdwtdivtag/Concrete/shadow_Qv5LqCjax.png?updatedAt=1680555840306"
          alt="Shadow study"
          className="concrete-wide-img-right concrete-more-padding"
        />
      </section>

      {/* Section 12: Daylight + Philosophy */}
      <section className="concrete-section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ik.imagekit.io/mrdwtdivtag/Concrete/daylight_o7G5rDMi1.png?updatedAt=1680555544158"
          alt="Daylight render"
          className="concrete-wide-img-left"
        />
        <p className="concrete-smalltext concrete-text-wide concrete-text-right">
          <em>
            Architecture is always already built.
            <br />
            Architecture is always in construction.
            <br />
            Architecture grows anytime.
          </em>
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ik.imagekit.io/mrdwtdivtag/Concrete/image_4_oxFUCy1gC.png?updatedAt=1680558336659"
          alt="Architectural model detail"
          className="concrete-small-img3"
        />
      </section>

      {/* Section 13: Imprints section title */}
      <div className="concrete-placeholder">
        <p className="concrete-section-title">
          <em>Imprints on Map</em>
        </p>
      </div>

      {/* Section 14: Imprints text */}
      <section className="concrete-section-short concrete-numbered">
        <p className="concrete-text concrete-text-centered">
          I was inspired a lot by the wrinkles in the landscape. The topography
          on landscape feels like the same imprints pattern but on a bigger
          scale.
        </p>
      </section>

      {/* Section 15: Vertical tile grid - Imprints */}
      <section className="concrete-tiles-vertical">
        <div className="concrete-tiles-columns">
          {IMPRINTS_GRID.map((column, colIdx) => (
            <div
              key={colIdx}
              className="concrete-tiles-column"
            >
              {column.map((img, imgIdx) => (
                <div
                  key={imgIdx}
                  className="concrete-tile-img-v"
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Section 16: Ripples text */}
      <section className="concrete-section-short">
        <p className="concrete-text concrete-text-centered">
          The ripples on the waters too...
        </p>
      </section>

      {/* Section 17: Final image */}
      <section className="concrete-section-smaller">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://ik.imagekit.io/mrdwtdivtag/Concrete/0_ZQtli2x5L.jpg?updatedAt=1647661886601"
          alt="Concrete memories"
          className="concrete-small-img"
        />
      </section>

      {/* Section 18: Footer */}
      <section className="concrete-section-short concrete-footer">
        <p className="concrete-fin">fin</p>
      </section>
    </div>
  );
}
