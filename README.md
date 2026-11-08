# Vireon — React automotive website

A React 19 + Vite project, recreated from the Volvo Cars India homepage with Vireon branding. Material UI provides buttons, the accessible dialog system, and the test-drive form. Custom CSS provides the premium automotive layout.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
cd web_new
npm install
npm run dev
```

Open the Local URL printed by Vite (normally http://localhost:5173).

```sh
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Included

- Full-height XC90, XC60 and EC40 hero carousel, changing every 3 seconds.
- Crossfades, progress indicators, previous/next controls, and pause/play.
- Reduced-motion support; automatic playback pauses while dialogs or the menu are open.
- Responsive desktop and mobile navigation, keyboard focus management, and Escape to close.
- Car collection with Electric/Hybrid filters, details, and model comparison.
- Brand navigation opens a Bentley-inspired dropdown with all 30 brands grouped into Mass market, Luxury, and Electric-focused. Selecting a brand closes the dropdown and scrolls to its two model photos and captions on the page. Choosing another brand replaces those two cards. The mobile menu provides the same flow; the full brand-card gallery has been removed.
- Dedicated XC60 and EC40 features, ownership section, and FAQ accordion.
- Responsive footer directory with popular brands, cars, searches, cities, tools and services, company, legal, social/contact labels, and disclaimers. Brand links scroll to the selected model photos. The footer uses responsive columns in the existing site style. Unprovided contact details are omitted; unconnected entries are plain text.
- Validated Material UI test-drive form with a local demonstration confirmation.

The form does not store or send information. Retailer listings, customer enquiries, service bookings, and used-car inventory need a real backend to become live services.

## Editing

- `src/main.jsx`: car data, homepage sections, carousel and dialogs.
- `src/styles.css`: layout, type, colours, and responsive styles.
- `src/brands.js`: brand groups and model examples.
- `src/BrandGallery.jsx`: selected brand’s two model photos, captions, and photography credits.
- `src/BrandMenu.jsx`: responsive brand dropdown navigation.
- `src/Footer.jsx`: footer directory and disclaimers.
- `public/images/brands/sources.json`: local photo paths and Wikimedia author, source, and licence information. The gallery exposes these credits under Photography credits.
- `public/images/`: bundled vehicle photography.
- `vite.config.js`: React Fast Refresh and production build configuration.

Reference: https://www.volvocars.com/in/. The original image CDN blocks downloads from this environment, so alternate photographs of the same models are bundled. This is a close visual interpretation rather than an exact image-for-image copy. Vireon is an independent concept and is not affiliated with Volvo Cars. The optional DM Sans font loads from Google Fonts, with Arial as a fallback.

### Bundled image sources

Brand gallery photographs are downloaded from Wikimedia Commons, with individual credits and licence links in `public/images/brands/sources.json`. Run `node scripts/fetch-brand-photos.mjs` to fetch missing brand photos; existing entries are preserved. Model examples are a visual catalogue, not live inventory or a statement of current availability.

- XC90: https://www.arnoldclark.com/newsroom/4112-volvo-xc90-2019-review
- XC60: https://images.unsplash.com/photo-1557323137-bd6bd20fe022
- EC40: https://media.zigcdn.com/media/model/2023/Sep/side-view-124761022_930x620.jpg
- Interior: https://apruhonice.s3.eu-central-1.amazonaws.com/9a/9ac5277e-9883-4288-a82d-48336923053d.box.jpg
