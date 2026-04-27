PATCH v27: previous working MAIN/GALLERY changes + MAIN title glitch

Replace/copy these files into the project root preserving folders.

Included:
- app/page.tsx
  - gallery hover lock kept: hovered slot does not rotate
  - gallery selected item reads placeholder data from /public/data/gallery-traits.json
  - 6 rotating gallery slots kept
- app/components/GallerySection.tsx
  - right panel uses local JSON fields only: rarity/source/status/archiveId/traits/description
  - visible MINT button kept
- app/components/HeroSection.tsx
  - keeps MAIN previous fixes: 2026 PFP count, 358 traits, walker gif, exact scope-signal-v16.gif
  - adds glitch class/data-text to UNOFFICIAL GROKAMOTOS only
  - wraps lower-left system/status/walker into one visual block
- app/globals.css
  - keeps v21/v22 main + gallery layout CSS
  - adds inactive gallery B/W green hacker scan filter
  - adds unified lower-left block styling
  - adds title glitch CSS
- public/data/gallery-traits.json
- public/effects/scope-signal-v16.gif
- public/effects/grok-walker.gif
- public/icons/*.png


v7: Desktop wallet restored from v4; total wallet value kept visible; Chrome text overlap fixed without hiding mobile controls.
