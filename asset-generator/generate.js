import fs from 'fs';
import path from 'path';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';

const fontUrl = 'https://unpkg.com/@fontsource/space-grotesk@5.0.18/files/space-grotesk-latin-700-normal.woff';

async function main() {
  console.log('Fetching font...');
  const fontData = await fetch(fontUrl).then(r => r.arrayBuffer());

  const outDir = path.join(process.cwd(), 'client/public');

  // OG Image
  console.log('Generating OG Image...');
  const ogMarkup = html`
    <div style="display: flex; height: 100%; width: 100%; background-color: #FFFDF5; align-items: center; justify-content: center; font-family: 'Space Grotesk'">
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #FFD93D;
        border: 4px solid #000;
        box-shadow: 12px 12px 0 #000;
        padding: 40px 80px;
      ">
        <div style="font-size: 120px; color: #000; font-weight: 700;">8Words</div>
      </div>
    </div>
  `;

  const ogSvg = await satori(ogMarkup, {
    width: 1200,
    height: 630,
    fonts: [{ name: 'Space Grotesk', data: fontData, weight: 700, style: 'normal' }],
  });

  const ogPng = new Resvg(ogSvg).render();
  fs.writeFileSync(path.join(outDir, 'og-image.png'), ogPng.asPng());


  // Icon (Favicon)
  console.log('Generating Icon...');
  const iconMarkup = html`
    <div style="display: flex; height: 100%; width: 100%; background-color: transparent; align-items: center; justify-content: center; font-family: 'Space Grotesk'">
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 400px;
        height: 400px;
        background-color: #FFD93D;
        border: 12px solid #000;
        box-shadow: 20px 20px 0 #000;
        border-radius: 40px;
      ">
        <div style="font-size: 280px; color: #000; font-weight: 700; margin-top: -20px;">8</div>
      </div>
    </div>
  `;

  const iconSvg = await satori(iconMarkup, {
    width: 512,
    height: 512,
    fonts: [{ name: 'Space Grotesk', data: fontData, weight: 700, style: 'normal' }],
  });

  const iconPng = new Resvg(iconSvg).render();
  fs.writeFileSync(path.join(outDir, 'icon.png'), iconPng.asPng());
  fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), iconPng.asPng());

  console.log('Done!');
}

main().catch(console.error);
