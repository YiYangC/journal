import fs from "node:fs";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";
import matter from "gray-matter";

// ── Config ──────────────────────────────────────────────────────────
const ROOT = path.resolve(import.meta.dirname, "..");
const INBOX = path.join(ROOT, "_inbox");
const PROCESSED = path.join(INBOX, "_processed");
const ARTICLES = path.join(ROOT, "content", "articles");
const SELAVY_JSON = path.join(ROOT, "content", "selavy.json");
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tiff"]);
const KEBAB_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DEBOUNCE_MS = 2000;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Helpers ─────────────────────────────────────────────────────────
const log = (msg) => console.log(`[watch-inbox] ${msg}`);
const warn = (msg) => console.warn(`[watch-inbox] ⚠ ${msg}`);
const err = (msg) => console.error(`[watch-inbox] ✗ ${msg}`);

function isImageFile(filename) {
  return IMAGE_EXTS.has(path.extname(filename).toLowerCase());
}

function getImageFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => isImageFile(f) && fs.statSync(path.join(dir, f)).isFile())
    .sort();
}

function isCoverFile(filename) {
  return path.basename(filename, path.extname(filename)).toLowerCase() === "cover";
}

function getLargestFile(dir, files) {
  let largest = files[0];
  let maxSize = 0;
  for (const f of files) {
    const size = fs.statSync(path.join(dir, f)).size;
    if (size > maxSize) {
      maxSize = size;
      largest = f;
    }
  }
  return largest;
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function titleFromSlug(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ── Manifest ────────────────────────────────────────────────────────
// Maps original filename → Cloudinary publicId so we can detect replacements.
function manifestPath(slug) {
  return path.join(PROCESSED, slug, "manifest.json");
}

function loadManifest(slug) {
  const p = manifestPath(slug);
  if (fs.existsSync(p)) {
    return JSON.parse(fs.readFileSync(p, "utf-8"));
  }
  return {}; // { "IMG_001.jpg": "public_id.jpg", … }
}

function saveManifest(slug, manifest) {
  const dir = path.join(PROCESSED, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(manifestPath(slug), JSON.stringify(manifest, null, 2));
}

// ── Upload ──────────────────────────────────────────────────────────
async function uploadImage(filepath, assetFolder) {
  const res = await cloudinary.uploader.upload(filepath, {
    asset_folder: assetFolder,
    resource_type: "image",
  });
  return res.public_id + "." + res.format;
}

// ── Process selavy folder ────────────────────────────────────────────
async function processSelavy() {
  const folderPath = path.join(INBOX, "selavy");

  if (!fs.existsSync(folderPath) || !fs.statSync(folderPath).isDirectory()) {
    return;
  }

  const images = getImageFiles(folderPath);
  if (images.length === 0) {
    warn(`Skipping "selavy" — no image files found`);
    return;
  }

  const manifest = loadManifest("selavy");
  const replacing = images.filter((f) => f in manifest);
  const adding = images.filter((f) => !(f in manifest));
  log(`Processing "selavy" — ${adding.length} new, ${replacing.length} replacement(s)…`);

  // Upload all images
  const uploaded = [];
  const failed = [];
  for (const img of images) {
    try {
      const publicId = await uploadImage(path.join(folderPath, img), "selavy");
      uploaded.push({ original: img, publicId });
      log(`  ✓ ${img} → ${publicId}`);
    } catch (e) {
      failed.push(img);
      err(`  ✗ ${img} — ${e.message}`);
    }
  }

  if (failed.length > 0) {
    err(`${failed.length} upload(s) failed for "selavy" — skipping JSON update`);
    return;
  }

  // Load existing selavy.json
  let selavyData = [];
  if (fs.existsSync(SELAVY_JSON)) {
    selavyData = JSON.parse(fs.readFileSync(SELAVY_JSON, "utf-8"));
  }

  for (const { original, publicId } of uploaded) {
    const oldId = manifest[original];

    if (oldId) {
      // Replacement — find and update existing entry
      const idx = selavyData.findIndex((e) => e.image === oldId);
      if (idx !== -1) {
        selavyData[idx].image = publicId;
        log(`  ↻ replaced: ${original}`);
      }
    } else {
      // Addition — append new entry with placeholder values
      selavyData.push({
        image: publicId,
        location: "FILL_IN",
        coordinates: [0, 0],
        date: todayISO(),
      });
    }
    manifest[original] = publicId;
  }

  fs.writeFileSync(SELAVY_JSON, JSON.stringify(selavyData, null, 2));
  log(`Updated ${path.relative(ROOT, SELAVY_JSON)}`);

  // Save manifest
  saveManifest("selavy", manifest);

  // Move to _processed
  fs.mkdirSync(PROCESSED, { recursive: true });
  const dest = path.join(PROCESSED, "selavy");
  if (fs.existsSync(dest)) {
    for (const img of images) {
      fs.renameSync(path.join(folderPath, img), path.join(dest, img));
    }
    fs.rmSync(folderPath, { recursive: true });
    log(`Merged into _inbox/_processed/selavy`);
  } else {
    fs.renameSync(folderPath, dest);
    log(`Moved to _inbox/_processed/selavy`);
  }
}

// ── Process a single folder ─────────────────────────────────────────
async function processFolder(slug) {
  // Handle selavy separately
  if (slug === "selavy") {
    return processSelavy();
  }

  const folderPath = path.join(INBOX, slug);

  // Validate kebab-case
  if (!KEBAB_RE.test(slug)) {
    warn(`Skipping "${slug}" — not kebab-case`);
    return;
  }

  // Check it's a directory
  if (!fs.statSync(folderPath).isDirectory()) return;

  // Gather images
  const images = getImageFiles(folderPath);
  if (images.length === 0) {
    warn(`Skipping "${slug}" — no image files found`);
    return;
  }

  const mdxPath = path.join(ARTICLES, `${slug}.mdx`);
  const isUpdate = fs.existsSync(mdxPath);

  // Load manifest to detect replacements vs additions
  const manifest = loadManifest(slug);

  if (isUpdate) {
    const replacing = images.filter((f) => f in manifest);
    const adding = images.filter((f) => !(f in manifest));
    log(
      `Updating "${slug}" — ${adding.length} new, ${replacing.length} replacement(s)…`,
    );
  } else {
    log(`Processing "${slug}" — ${images.length} image(s)…`);
  }

  // Upload all images
  const uploaded = []; // { original, publicId }
  const failed = [];
  for (const img of images) {
    try {
      const publicId = await uploadImage(path.join(folderPath, img), slug);
      uploaded.push({ original: img, publicId });
      log(`  ✓ ${img} → ${publicId}`);
    } catch (e) {
      failed.push(img);
      err(`  ✗ ${img} — ${e.message}`);
    }
  }

  if (failed.length > 0) {
    err(
      `${failed.length} upload(s) failed for "${slug}" — skipping MDX update`,
    );
    return;
  }

  if (isUpdate) {
    // ── Update existing article ──
    const raw = fs.readFileSync(mdxPath, "utf-8");
    const { data, content } = matter(raw);

    const gallery = Array.isArray(data.gallery) ? data.gallery : [];

    for (const { original, publicId } of uploaded) {
      const oldId = manifest[original];

      if (isCoverFile(original)) {
        // Explicit cover file — always set as cover
        data.coverImage = publicId;
        log(`  ↻ cover set: ${original}`);
      } else if (oldId) {
        // Replacement — swap old ID in coverImage or gallery
        if (data.coverImage === oldId) {
          data.coverImage = publicId;
          log(`  ↻ cover replaced: ${original}`);
        }
        const idx = gallery.indexOf(oldId);
        if (idx !== -1) {
          gallery[idx] = publicId;
          log(`  ↻ gallery replaced: ${original}`);
        }
      } else {
        // Addition — append to gallery
        gallery.push(publicId);
      }
      manifest[original] = publicId;
    }

    data.gallery = gallery;
    const updated = matter.stringify(content, data);
    fs.writeFileSync(mdxPath, updated);
    log(`Updated ${path.relative(ROOT, mdxPath)}`);
  } else {
    // ── Create new article ──
    const coverFilename =
      images.find((f) => isCoverFile(f)) || getLargestFile(folderPath, images);
    const coverEntry = uploaded.find((u) => u.original === coverFilename);
    const galleryEntries = uploaded.filter((u) => u.original !== coverFilename);

    const galleryYaml = galleryEntries
      .map((u) => `  - "${u.publicId}"`)
      .join("\n");

    const mdx = `---
title: "${titleFromSlug(slug)}"
date: "${todayISO()}"
excerpt: "FILL_IN"
coverImage: "${coverEntry.publicId}"
tags: []
location: "FILL_IN"
coordinates: [0, 0]
category: "architecture"
featured: false
gallery:
${galleryYaml}
---

FILL_IN: Write your article here.
`;

    fs.mkdirSync(path.dirname(mdxPath), { recursive: true });
    fs.writeFileSync(mdxPath, mdx);
    log(`Created ${path.relative(ROOT, mdxPath)}`);

    // Populate manifest for initial batch
    for (const { original, publicId } of uploaded) {
      manifest[original] = publicId;
    }
  }

  // Save manifest
  saveManifest(slug, manifest);

  // Move to _processed
  fs.mkdirSync(PROCESSED, { recursive: true });
  const dest = path.join(PROCESSED, slug);
  if (fs.existsSync(dest)) {
    // Merge into existing _processed folder
    for (const img of images) {
      fs.renameSync(path.join(folderPath, img), path.join(dest, img));
    }
    fs.rmSync(folderPath, { recursive: true });
    log(`Merged into _inbox/_processed/${slug}`);
  } else {
    fs.renameSync(folderPath, dest);
    log(`Moved to _inbox/_processed/${slug}`);
  }
}

// ── Startup scan ────────────────────────────────────────────────────
async function scanExisting() {
  fs.mkdirSync(INBOX, { recursive: true });
  const entries = fs
    .readdirSync(INBOX)
    .filter(
      (e) =>
        !e.startsWith("_") &&
        !e.startsWith(".") &&
        fs.statSync(path.join(INBOX, e)).isDirectory(),
    );
  for (const slug of entries) {
    await processFolder(slug);
  }
}

// ── Watch ───────────────────────────────────────────────────────────
const processing = new Set();
const debounceTimers = new Map();

function onFsEvent(eventType, filename) {
  if (!filename || filename.startsWith("_") || filename.startsWith(".")) return;

  const folderPath = path.join(INBOX, filename);
  try {
    if (!fs.statSync(folderPath).isDirectory()) return;
  } catch {
    return; // deleted or transient
  }

  // Debounce: wait for files to finish copying
  if (debounceTimers.has(filename)) {
    clearTimeout(debounceTimers.get(filename));
  }

  debounceTimers.set(
    filename,
    setTimeout(async () => {
      debounceTimers.delete(filename);

      if (processing.has(filename)) return;
      processing.add(filename);
      try {
        await processFolder(filename);
      } finally {
        processing.delete(filename);
      }
    }, DEBOUNCE_MS),
  );
}

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  log("Starting…");

  // Ensure _inbox exists
  fs.mkdirSync(INBOX, { recursive: true });

  // Process any folders already sitting in _inbox
  await scanExisting();

  // Watch for new folders
  fs.watch(INBOX, { recursive: false }, onFsEvent);
  log(`Watching ${path.relative(ROOT, INBOX)}/ for new folders`);
}

main().catch((e) => {
  err(e.message);
  process.exit(1);
});
