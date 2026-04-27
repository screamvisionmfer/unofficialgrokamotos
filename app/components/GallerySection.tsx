"use client";

import { useEffect, useMemo, useState } from "react";

type GalleryItem = {
  id: number;
  title: string;
  image: string;
  theme: string;
};

type TraitRow = {
  type: string;
  value: string;
};

type GalleryTraitRecord = {
  id: number;
  title: string;
  rarity: string;
  archiveId: string;
  source: string;
  status: string;
  description: string;
  traits: TraitRow[];
};

type GallerySectionProps = {
  items: GalleryItem[];
  slots: number[];
  selectedId: number;
  setSelectedId: (id: number) => void;
  playHoverSound: () => void;
  playClickSound: () => void;
  mintUrl: string;
  setHoveredSlotIndex: (slotIndex: number | null) => void;
};

const fallbackTraits: GalleryTraitRecord[] = [
  {
    id: 421,
    title: "Diamond Grok #0421",
    rarity: "Legendary",
    archiveId: "#0421",
    source: "LOCAL JSON",
    status: "PLACEHOLDER",
    description: "A rare crystalline entity from the outer algorithm. Forged in diamonds, driven by stardust.",
    traits: [
      { type: "Background", value: "Cosmic" },
      { type: "Body", value: "Diamond" },
      { type: "Head", value: "Orbit Smile" },
      { type: "Eyes", value: "Crystal" },
      { type: "Aura", value: "Stardust" },
      { type: "Extra", value: "Floating Shards" },
    ],
  },
];

export function GallerySection({
  items,
  slots,
  selectedId,
  setSelectedId,
  playHoverSound,
  playClickSound,
  mintUrl,
  setHoveredSlotIndex,
}: GallerySectionProps) {
  const [traitRecords, setTraitRecords] = useState<GalleryTraitRecord[]>(fallbackTraits);

  useEffect(() => {
    return () => setHoveredSlotIndex(null);
  }, [setHoveredSlotIndex]);

  useEffect(() => {
    let cancelled = false;

    fetch("/data/gallery-traits.json", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { items?: GalleryTraitRecord[] }) => {
        if (!cancelled && Array.isArray(data.items) && data.items.length > 0) {
          setTraitRecords(data.items);
        }
      })
      .catch(() => {
        if (!cancelled) setTraitRecords(fallbackTraits);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedItem = useMemo(() => {
    return items.find((item) => item.id === selectedId) ?? items[0];
  }, [items, selectedId]);

  const selectedTraits = useMemo(() => {
    return (
      traitRecords.find((record) => record.id === selectedId) ??
      traitRecords.find((record) => record.id === selectedItem?.id) ??
      traitRecords[0]
    );
  }, [selectedId, selectedItem?.id, traitRecords]);

  return (
    <section id="gallery" className="galleryPipScreen">
      <div className="galleryArchivePanel">
        <div className="galleryTitleRow uiFont">
          <span>DRB PFP ARCHIVE</span>
          <i aria-hidden="true" />
        </div>

        <div className="galleryGridSix">
          {slots.slice(0, 6).map((itemIndex, slotIndex) => {
            const item = items[itemIndex % items.length];
            const active = selectedId === item.id;

            return (
              <button
                key={`${slotIndex}-${item.id}`}
                type="button"
                className={`galleryCard ${active ? "active" : ""}`}
                onMouseEnter={() => {
                  setHoveredSlotIndex(slotIndex);
                  setSelectedId(item.id);
                  playHoverSound();
                }}
                onMouseLeave={() => setHoveredSlotIndex(null)}
                onFocus={() => {
                  setHoveredSlotIndex(slotIndex);
                  setSelectedId(item.id);
                  playHoverSound();
                }}
                onBlur={() => setHoveredSlotIndex(null)}
                onClick={() => {
                  setSelectedId(item.id);
                  playClickSound();
                }}
              >
                <img src={item.image} alt={item.title} className="galleryThumb" />
                <span className="galleryCardIndex uiFont">{String(item.id).padStart(4, "0")}</span>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="galleryTraitPanel uiFont">
        <div className="galleryTraitHeader">
          <span className="galleryStar" aria-hidden="true">☆</span>
          <h2>{selectedTraits?.title ?? selectedItem?.title ?? "Grokamotos Unit"}</h2>
        </div>

        <div className="galleryMiniMeta">
          <div><span>RARITY:</span><strong>{selectedTraits?.rarity ?? "Archive"}</strong></div>
          <div><span>SOURCE:</span><strong>{selectedTraits?.source ?? "LOCAL JSON"}</strong></div>
        </div>

        <div className="galleryDivider" />

        <div className="galleryTraitLabel">TRAITS</div>
        <div className="galleryTraitRows">
          {(selectedTraits?.traits ?? []).map((trait) => (
            <div className="galleryTraitRow" key={`${trait.type}-${trait.value}`}>
              <span>{trait.type}</span>
              <strong>{trait.value}</strong>
            </div>
          ))}
        </div>

        <p className="galleryDescription">{selectedTraits?.description ?? "Trait JSON placeholder is loading from /data/gallery-traits.json."}</p>

        <div className="galleryMetaBottom">
          <div><span>ARCHIVE ID</span><strong>{selectedTraits?.archiveId ?? "#0000"}</strong></div>
          <div><span>STATUS</span><strong>{selectedTraits?.status ?? "PLACEHOLDER"}</strong></div>
        </div>

        <a
          className="galleryMintButton"
          href={mintUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={playHoverSound}
          onFocus={playHoverSound}
          onClick={playClickSound}
        >
          MINT
        </a>
      </aside>
    </section>
  );
}
