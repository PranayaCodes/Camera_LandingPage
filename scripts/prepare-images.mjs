import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sources = [
  {
    src: "C:/Users/User/Downloads/Insta 360 Ace Pro Action Camera.jpg",
    out: "camera-hero.png"
  },
  {
    src: "C:/Users/User/Downloads/Insta360 X5 - wasserdichte 8K 360°-Action-Cam, Spitze bei wenig Licht, Unsichtbarer Selfie-Stick-Effekt, robuste austauschbare Linse, 3 h Akku, integr_ Windschutz, Stabilisierung, Dreifach-KI-Chip.jpg",
    out: "camera-360.png"
  },
  {
    src: "C:/Users/User/Downloads/download (23).jpg",
    out: "camera-video.png"
  },
  {
    src: "C:/Users/User/Downloads/11 Cosas Que Debes Hacer Tras Comprar Tu Nueva y Flamante Cámara.jpg",
    out: "camera-dslr.png"
  }
];

const targetDir = path.resolve("public/products");
await fs.mkdir(targetDir, { recursive: true });

for (const item of sources) {
  const target = path.join(targetDir, item.out);
  const { data, info } = await sharp(item.src)
    .resize({ width: 1200, withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const isWhiteBackdrop = r > 232 && g > 232 && b > 232;
    const isSoftEdge = r > 218 && g > 218 && b > 218;

    if (isWhiteBackdrop) {
      data[i + 3] = 0;
    } else if (isSoftEdge) {
      data[i + 3] = Math.min(data[i + 3], 120);
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 8 })
    .extend({
      top: 32,
      bottom: 32,
      left: 32,
      right: 32,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png({ quality: 95, compressionLevel: 8, adaptiveFiltering: true })
    .toFile(target);
  console.log(`Created ${target}`);
}
