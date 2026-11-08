import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { brandGroups, modelImageId } from '../src/brands.js';

const headers = { 'User-Agent': 'VireonDesignConcept/1.0 (car photography attribution)' };
const destination = new URL('../public/images/brands/', import.meta.url);
await mkdir(destination, { recursive: true });
const manifestPath = new URL('sources.json', destination);
const sources = await readFile(manifestPath, 'utf8').then(JSON.parse).catch(() => ({}));
// These articles share lead photos with differently badged versions of the car.
const fileOverrides = {
  'MG Hector': 'MG Hector Diesel (India) front view.png',
  'Honda Elevate': '2023 Honda Elevate VX (India) front view.jpg',
  'Tata Nexon EV': '2020 Tata Nexon EV (India) front view.png',
};
const plain = html => (html || '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
async function json(url) {
  for (let attempt = 0; attempt < 5; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 1800 + attempt * 4000));
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) });
    if (response.status === 429 && attempt < 4) continue;
    if (!response.ok) throw new Error(`${response.status}: ${url}`);
    return response.json();
  }
}
const queue = [...new Set(brandGroups.flatMap(group => group.brands.flatMap(brand => brand.models.map(([, page]) => page))))];
const failures = [];
async function worker() {
  while (queue.length) {
    const page = queue.shift();
    const id = modelImageId(page);
    if (sources[id] && (!fileOverrides[page] || decodeURIComponent(sources[id].source).endsWith(fileOverrides[page].replaceAll(' ', '_')))) continue;
    try {
      const summary = await json(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page.replaceAll(' ', '_'))}`);
      let photo = summary.thumbnail?.source;
      if (!photo) throw new Error('No lead photo');
      const file = fileOverrides[page] || decodeURIComponent(new URL(photo).pathname.split('/').at(-2));
      const params = new URLSearchParams({ action: 'query', format: 'json', titles: `File:${file}`, prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '330' });
      const commons = await json(`https://commons.wikimedia.org/w/api.php?${params}`);
      const info = Object.values(commons.query.pages)[0].imageinfo?.[0];
      const meta = info?.extmetadata;
      if (fileOverrides[page]) photo = info?.thumburl;
      if (!meta?.LicenseShortName?.value) throw new Error('Missing photo attribution');
      const response = await fetch(photo, { headers, signal: AbortSignal.timeout(30000) });
      if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`Photo response ${response.status}`);
      const extension = response.headers.get('content-type').includes('png') ? 'png' : response.headers.get('content-type').includes('webp') ? 'webp' : 'jpg';
      const filename = `${id}.${extension}`;
      await writeFile(new URL(filename, destination), Buffer.from(await response.arrayBuffer()));
      sources[id] = { model: page, image: `/images/brands/${filename}`, page: summary.content_urls.desktop.page, source: info.descriptionurl, author: plain(meta.Artist?.value), license: plain(meta.LicenseShortName.value), licenseUrl: meta.LicenseUrl?.value || info.descriptionurl };
      await writeFile(manifestPath, JSON.stringify(sources, null, 2) + '\n');
      console.log(`Saved ${page}`);
    } catch (error) {
      failures.push({ page, message: error.message });
      console.error(`Failed ${page}: ${error.message}`);
    }
  }
}
await worker();
const expectedIds = new Set(brandGroups.flatMap(group => group.brands.flatMap(brand => brand.models.map(([, page]) => modelImageId(page)))));
for (const id of Object.keys(sources)) if (!expectedIds.has(id)) delete sources[id];
await writeFile(manifestPath, JSON.stringify(sources, null, 2) + '\n');
console.log(`${Object.keys(sources).length} photos saved. ${failures.length} failed.`);
if (failures.length) process.exitCode = 1;
