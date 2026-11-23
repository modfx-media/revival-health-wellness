#!/usr/bin/env node
/**
 * One-off image optimization pass.
 * Recompresses (and downsizes oversized) images in /public in place,
 * preserving file paths and extensions.
 *
 * Usage: node scripts/optimize-images.mjs
 */
import { execSync } from "node:child_process";
import path from "node:path";
import sharp from "sharp";

const MAX_WIDTH = 2400; // no page needs a wider source image than this
const MIN_SIZE_BYTES = 400 * 1024; // only touch files > 400KB

function listLargeImages() {
  const out = execSync(
    `find public -type f \\( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \\) -size +400k`,
    { encoding: "utf8" }
  );
  return out.split("\n").filter(Boolean);
}

async function optimize(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fs = await import("node:fs/promises");
  const beforeSize = (await fs.stat(filePath)).size;

  const image = sharp(filePath, { failOn: "none" });
  const meta = await image.metadata();
  const needsResize = meta.width && meta.width > MAX_WIDTH;

  let pipeline = sharp(filePath, { failOn: "none" });
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  let buffer;
  if (ext === ".jpg" || ext === ".jpeg") {
    buffer = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  } else if (ext === ".png") {
    buffer = await pipeline
      .png({ quality: 80, compressionLevel: 9, palette: true })
      .toBuffer();
  } else if (ext === ".webp") {
    buffer = await pipeline.webp({ quality: 80 }).toBuffer();
  } else {
    return { skipped: true };
  }

  // Only overwrite if we actually saved space.
  if (buffer.length < beforeSize) {
    await fs.writeFile(filePath, buffer);
    return { beforeSize, afterSize: buffer.length, resized: needsResize };
  }
  return { beforeSize, afterSize: beforeSize, skippedNoGain: true };
}

async function main() {
  const files = listLargeImages();
  console.log(`Found ${files.length} images over 400KB.\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    try {
      const result = await optimize(file);
      if (result.skipped) continue;
      totalBefore += result.beforeSize;
      totalAfter += result.afterSize;
      const savedPct = (
        ((result.beforeSize - result.afterSize) / result.beforeSize) *
        100
      ).toFixed(0);
      const tag = result.skippedNoGain
        ? "no gain, kept original"
        : `${savedPct}% smaller${result.resized ? ", resized" : ""}`;
      console.log(
        `${file}  ${(result.beforeSize / 1024).toFixed(0)}KB -> ${(
          result.afterSize / 1024
        ).toFixed(0)}KB (${tag})`
      );
    } catch (err) {
      console.error(`FAILED: ${file}: ${err.message}`);
    }
  }

  console.log(
    `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(
      totalAfter /
      1024 /
      1024
    ).toFixed(2)}MB`
  );
}

main();
