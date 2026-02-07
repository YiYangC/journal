# Content Plan — Architecture Journal

Use this document to track published articles, plan upcoming content, and organize tags and themes.

---

## Site Structure

| Page             | Route               | Description                                                  |
| ---------------- | ------------------- | ------------------------------------------------------------ |
| Home             | `/`                 | Three-column magazine grid — two image columns, one expandable index |
| Architecture     | `/tags/architecture` | Filtered article list                                        |
| Ephemeral        | `/tags/ephemeral`   | Filtered article list (no content yet)                       |
| Selavy           | `/selavy`           | Photo collection with map                                    |
| Articles         | `/articles`         | All articles                                                 |
| Article detail   | `/articles/[slug]`  | MDX article with gallery                                     |
| Tags             | `/tags/[tag]`       | Filtered by any tag                                          |
| Map              | `/map`              | Mapbox map of all locations                                  |
| Gallery          | `/gallery`          | Photo grid                                                   |
| About            | `/about`            | About page                                                   |

---

## Categories

| Category       | Description                                                        | Articles |
| -------------- | ------------------------------------------------------------------ | -------- |
| architecture   | Buildings, structures, spatial experiences, architects              | 11       |
| ephemeral      | Temporary installations, events, moments                           | 0        |
| selavy          | Rrose Sélavy — atmospheric photos                                 | 1 entry  |

---

## Published Articles

| Title                                      | Location                   | Date       | Tags                                                  |
| ------------------------------------------ | -------------------------- | ---------- | ----------------------------------------------------- |
| Fondazione Querini Stampalia               | Venice, Italy              | 2021-11-13 | venice, scarpa, renovation, museum                    |
| 津梅棧道 Jin-Mei Forest Walkway            | Yilan City, Taiwan         | 2024-02-28 | yilan, taiwan, huang-sheng-yuan, walkway              |
| 羅東文化工場 Luodong Cultural Working House | Luodong, Yilan County, Taiwan | 2024-02-28 | yilan, taiwan, huang-sheng-yuan, cultural-center      |
| Seattle Central Library                    | Seattle, USA               | 2024-04-06 | seattle, library, oma, rem-koolhaas                    |
| Hyatt Regency San Francisco                | San Francisco, USA         | 2024-05-10 | san-francisco, john-portman, hotel, atrium             |
| Palais de Tokyo                            | Paris, France              | 2024-08-24 | paris, concrete, museum, contemporary-art              |
| Villa La Roche                             | Paris, France              | 2024-08-24 | paris, le-corbusier, modernism, residential            |
| Villa Savoye                               | Poissy, France             | 2024-08-24 | paris, le-corbusier, modernism, residential            |
| Schindler House                            | West Hollywood, USA        | 2025-01-15 | los-angeles, schindler, modernism, residential         |
| TWA Flight Center                          | Queens, New York, USA      | 2025-01-20 | new-york, eero-saarinen, terminal, concrete            |
| Vitra Campus                               | Weil am Rhein, Germany     | 2025-02-01 | vitra, germany, museum                                 |

---

## Tags (active)

### Places
paris, venice, yilan, taiwan, seattle, san-francisco, los-angeles, new-york, germany, vitra

### Architects
le-corbusier, scarpa, huang-sheng-yuan, rem-koolhaas, oma, john-portman, eero-saarinen, schindler

### Building Types
museum, residential, library, hotel, terminal, walkway, cultural-center

### Themes
architecture, modernism, concrete, renovation, contemporary-art, atrium

---

## Images

All article images are hosted on Cloudinary (cloud: `dqq1pqjz9`). Folders follow the pattern `city-building-name` (e.g., `paris-villa-roche`, `venice-stampalia`).

### Cloudinary Folders

| Folder                       | Article                        | Images |
| ---------------------------- | ------------------------------ | ------ |
| paris-villa-roche            | Villa La Roche                 | 13     |
| paris-villa-savoye           | Villa Savoye                   | 12     |
| venice-stampalia              | Fondazione Querini Stampalia   | 9      |
| palais-de-tokyo              | Palais de Tokyo                | 10     |
| sf-hyatt                     | Hyatt Regency San Francisco    | —      |
| seattle-central-library      | Seattle Central Library        | —      |
| la-schindler                 | Schindler House                | —      |
| ny-jfk                       | TWA Flight Center              | —      |
| basel-vitra                  | Vitra Campus                   | —      |
| yilan-luodong                | Luodong Cultural Working House | —      |
| yilan-meijing-forest-walkway | Jin-Mei Forest Walkway         | —      |
| venice-olivetti              | (no article yet)               | —      |
| la-holyhock                  | (no article yet)               | —      |
| sf-de-young                  | (no article yet)               | —      |
| seattle-holl-church          | (no article yet)               | —      |
| random                       | —                              | —      |

---

## Locations

92 locations tracked in `content/locations.json`. Only locations with published articles containing images are marked as visited (currently 11).

---

## Article Ideas

### With Cloudinary images ready (no article yet)

| Building                          | Location              | Cloudinary folder     |
| --------------------------------- | --------------------- | --------------------- |
| Olivetti Showroom (Negozio Olivetti) | Venice, Italy      | venice-olivetti       |
| Hollyhock House                   | Los Angeles, USA      | la-holyhock           |
| De Young Museum                   | San Francisco, USA    | sf-de-young           |
| Steven Holl Chapel of St. Ignatius | Seattle, USA         | seattle-holl-church   |

### Planned (no images yet)

| Title (working)                              | Location              | Key tags                          |
| -------------------------------------------- | --------------------- | --------------------------------- |
| Sacred Spaces in Ronchamp                    | Ronchamp, France      | concrete, sacred, le-corbusier    |
| Tomba Brion                                  | San Vito d'Altivole, Italy | scarpa, sacred, concrete      |
| Castelvecchio Museum                         | Verona, Italy         | scarpa, renovation, museum        |
| Glass House (Philip Johnson)                 | New Canaan, CT, USA   | modernism, residential, glass     |
| Arcosanti                                    | Mayer, AZ, USA        | concrete, soleri, experimental    |
| Katsura Imperial Villa                       | Kyoto, Japan          | japanese, garden, residential     |

---

## Writing Style

- Contemplative, observational tone
- First person where appropriate — personal encounters with buildings
- Mix architectural knowledge with sensory description
- Let photographs carry the visual weight; text provides context and reflection
- Keep paragraphs short, leave space for the reader to think

---

*Last updated: 2026-02-03*
