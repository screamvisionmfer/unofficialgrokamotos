"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BootLoader } from "./components/BootLoader";
import { BootMenu } from "./components/BootMenu";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { WalletStatsSection } from "./components/WalletStatsSection";
import { ContactsSection } from "./components/ContactsSection";

const items = [
  {
    id: 0,
    title: "Grokamoto #0",
    image: "/gallery/0.png",
    theme: "hypnosis-red"
  },
  {
    id: 1,
    title: "Grokamoto #1",
    image: "/gallery/1.png",
    theme: "mushrooms"
  },
  {
    id: 2,
    title: "Grokamoto #2",
    image: "/gallery/2.png",
    theme: "purple"
  },
  {
    id: 3,
    title: "Grokamoto #3",
    image: "/gallery/3.png",
    theme: "G"
  },
  {
    id: 4,
    title: "Grokamoto #4",
    image: "/gallery/4.png",
    theme: "fields"
  },
  {
    id: 5,
    title: "Grokamoto #5",
    image: "/gallery/5.png",
    theme: "purple"
  },
  {
    id: 6,
    title: "Grokamoto #6",
    image: "/gallery/6.png",
    theme: "lava"
  },
  {
    id: 7,
    title: "Grokamoto #7",
    image: "/gallery/7.png",
    theme: "green"
  },
  {
    id: 8,
    title: "Grokamoto #8",
    image: "/gallery/8.png",
    theme: "hypnosis-blue"
  },
  {
    id: 9,
    title: "Grokamoto #9",
    image: "/gallery/9.png",
    theme: "swamp"
  },
  {
    id: 10,
    title: "Grokamoto #10",
    image: "/gallery/10.png",
    theme: "de_wallstreet"
  },
  {
    id: 11,
    title: "Grokamoto #11",
    image: "/gallery/11.png",
    theme: "desert"
  },
  {
    id: 12,
    title: "Grokamoto #12",
    image: "/gallery/12.png",
    theme: "lava"
  },
  {
    id: 13,
    title: "Grokamoto #13",
    image: "/gallery/13.png",
    theme: "de_wallstreet"
  },
  {
    id: 14,
    title: "Grokamoto #14",
    image: "/gallery/14.png",
    theme: "R"
  },
  {
    id: 15,
    title: "Grokamoto #15",
    image: "/gallery/15.png",
    theme: "mint-green"
  },
  {
    id: 16,
    title: "Grokamoto #16",
    image: "/gallery/16.png",
    theme: "open-space"
  },
  {
    id: 17,
    title: "Grokamoto #17",
    image: "/gallery/17.png",
    theme: "hypnosis-black"
  },
  {
    id: 18,
    title: "Grokamoto #18",
    image: "/gallery/18.png",
    theme: "dark-grey"
  },
  {
    id: 19,
    title: "Grokamoto #19",
    image: "/gallery/19.png",
    theme: "noise"
  },
  {
    id: 20,
    title: "Grokamoto #20",
    image: "/gallery/20.png",
    theme: "portal"
  }
];

const links = {
  mint: "https://grokamotos.nfts2.me/",
  token: "https://dexscreener.com/base/0x5116773e18a9c7bb03ebb961b38678e45e238923",
  grokipedia: "https://grokipedia.com/page/debtreliefbot",
  wallet: "https://drbtaskforce.com/wallet/",
  basescan: "https://basescan.org/address/0xb1058c959987e3513600eb5b4fd82aeee2a0e4f9",
  community: "https://x.com/scream_vision",
};

const initialSlots = [0, 1, 2, 3, 4, 5];

const bootBackgrounds = [
  "/boot-gallery/boot-01.png",
  "/boot-gallery/boot-02.png",
  "/boot-gallery/boot-03.png",
  "/boot-gallery/boot-04.png",
  "/boot-gallery/boot-05.png",
  "/boot-gallery/boot-06.png",
  "/boot-gallery/boot-07.png",
  "/boot-gallery/boot-08.png",
  "/boot-gallery/boot-09.png",
  "/boot-gallery/boot-10.png",
  "/boot-gallery/boot-11.png",
  "/boot-gallery/boot-12.png",
  "/boot-gallery/boot-13.png",
  "/boot-gallery/boot-14.png",
  "/boot-gallery/boot-15.png",
  "/boot-gallery/boot-16.png",
  "/boot-gallery/boot-17.png",
  "/boot-gallery/boot-18.png",
  "/boot-gallery/boot-19.png",
  "/boot-gallery/boot-20.png",
  "/boot-gallery/boot-21.png",
  "/boot-gallery/boot-22.png",
  "/boot-gallery/boot-23.png",
  "/boot-gallery/boot-24.png",
];

const achievementCatalog = [
  { id: "boot", title: "Booted The Program", desc: "Entered the Grokamotos interface." },
  { id: "archive", title: "Archive Goblin", desc: "Opened the archive route." },
  { id: "wallet", title: "Wallet Watcher", desc: "Checked the wallet signal." },
  { id: "token", title: "Token Scanner", desc: "Opened the token route." },
  { id: "root", title: "Grok Has Root", desc: "Activated hacker mode." },
  { id: "contacts", title: "Signal Dialer", desc: "Opened contact routes." },
];

const traitBreakdown = [
  { label: "ACHIEVEMENTS", count: 12 },
  { label: "BACK ACCESSORIES", count: 15 },
  { label: "BG", count: 56 },
  { label: "BODY", count: 34 },
  { label: "CLOTHING", count: 100 },
  { label: "EFFECTS", count: 12 },
  { label: "EYES", count: 7 },
  { label: "FACE ACCESSORIES", count: 19 },
  { label: "GROKCORE", count: 12 },
  { label: "HATS", count: 65 },
  { label: "LEGENDARIES BY GROK", count: 12 },
  { label: "MOUTH", count: 14 },
];

const navTabs = [
  { id: "main", label: "MAIN" },
  { id: "gallery", label: "GALLERY" },
  { id: "wallet", label: "DRB WALLET" },
  { id: "contacts", label: "CONTACTS" },
  { id: "game", label: "GAME" },
] as const;

type ActiveTab = (typeof navTabs)[number]["id"];






export default function Page() {
  const [selectedId, setSelectedId] = useState(1);
  const [hoveredGallerySlot, setHoveredGallerySlot] = useState<number | null>(null);
  const [slots, setSlots] = useState(initialSlots);
  const [rotationStep, setRotationStep] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [bootMenuIndex, setBootMenuIndex] = useState(0);
  const [bootModal, setBootModal] = useState<null | "stats" | "contacts">(null);
  const [hackerMode, setHackerMode] = useState(false);
  const [bootBgIndex, setBootBgIndex] = useState(() => Math.floor(Math.random() * bootBackgrounds.length));
  const konamiRef = useRef<string[]>([]);
  const bootShuffleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const startVoiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);
  const [isStarting, setIsStarting] = useState(false);
  const [bootLoadingDone, setBootLoadingDone] = useState(false);
  const [pageReveal, setPageReveal] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorPressed, setCursorPressed] = useState(false);
  const [cursorPointer, setCursorPointer] = useState(false);
  const cursorPressTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [walletData, setWalletData] = useState({
    drb: 0,
    weth: 0,
    drbUsdPrice: 0,
    wethUsdPrice: 0,
    drbUsdValue: 0,
    wethUsdValue: 0,
    updated: "syncing...",
    source: "basescan-html",
    loading: true,
  });
  const [hackLineA, setHackLineA] = useState("SYSTEM BREACH // CHARACTER BAY OVERRIDE");
  const [hackLineB, setHackLineB] = useState("MINT ROUTE READY // ARCHIVE INDEX OPEN");
  const [achievements, setAchievements] = useState<Record<string, boolean>>({});
  const [achievementToast, setAchievementToast] = useState<null | { title: string; desc: string }>(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<ActiveTab>("main");
  const [navFocusIndex, setNavFocusIndex] = useState(0);
  const [clockNow, setClockNow] = useState(() => new Date());

  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  const showSaveIcon = () => {
    setSaveToast(true);
    window.setTimeout(() => setSaveToast(false), 1400);
  };

  const unlockAchievement = (id: string) => {
    const achievement = achievementCatalog.find((item) => item.id === id);
    if (!achievement) return;

    setAchievements((prev) => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: true };
      try {
        localStorage.setItem("grokamotosAchievements", JSON.stringify(next));
      } catch {}
      setAchievementToast({ title: achievement.title, desc: achievement.desc });
      window.setTimeout(() => setAchievementToast(null), 6000);
      showSaveIcon();
      return next;
    });
  };

  const closeIntro = () => {
    setShowIntro(false);
    try {
      localStorage.setItem("grokamotosIntroSeen", "1");
    } catch {}
    unlockAchievement("boot");
  };

  const resetAchievements = () => {
    setAchievements({});
    setAchievementToast(null);
    try {
      localStorage.removeItem("grokamotosAchievements");
      localStorage.removeItem("grokamotosIntroSeen");
    } catch {}
    showSaveIcon();
  };

  useEffect(() => {
    document.body.style.overflow = bootDone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [bootDone]);

  useEffect(() => {
    document.body.classList.toggle("hackerMode", hackerMode);
    return () => {
      document.body.classList.remove("hackerMode");
    };
  }, [hackerMode]);

  useEffect(() => {
    const timer = window.setTimeout(() => setBootLoadingDone(true), 3800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      const storedAchievements = localStorage.getItem("grokamotosAchievements");
      if (storedAchievements) setAchievements(JSON.parse(storedAchievements));
    } catch {}
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setClockNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);


  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 14;
      setParallax({ x, y });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);


  useEffect(() => {
    const lineA = [
      "SYSTEM BREACH // CHARACTER BAY OVERRIDE",
      "ARCHIVE ACCESS // IDENTITY SIGNAL FOUND",
      "TOKEN SIGNAL BOOST // COMMUNITY FEED LIVE",
      "VAULT TRACE // COMMUNITY UNIT ACTIVE",
    ];
    const lineB = [
      "MINT ROUTE READY // ARCHIVE INDEX OPEN",
      "DRB LINK CONFIRMED // FAN CHANNEL ACTIVE",
      "SIGNAL CACHE PRIMED // SYSTEM HOLDING",
      "VISUAL IDENTITY UNIT // SIGNAL UNLOCKED",
    ];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/$#*";
    const scramble = (source: string) => source.split("").map((ch) => ch === " " ? " " : Math.random() > 0.72 ? chars[Math.floor(Math.random() * chars.length)] : ch).join("");
    const interval = window.setInterval(() => {
      const nextA = lineA[Math.floor(Math.random() * lineA.length)];
      const nextB = lineB[Math.floor(Math.random() * lineB.length)];
      setHackLineA(scramble(nextA));
      setHackLineB(scramble(nextB));
      window.setTimeout(() => setHackLineA(nextA), 130);
      window.setTimeout(() => setHackLineB(nextB), 180);
    }, 2500);
    return () => window.clearInterval(interval);
  }, []);


  useEffect(() => {
    return () => {
      if (bootShuffleRef.current) clearInterval(bootShuffleRef.current);
    };
  }, []);

  useEffect(() => {
    if (!bootDone) return;
    const t = setTimeout(() => setPageReveal(true), 40);
    return () => clearTimeout(t);
  }, [bootDone]);

  useEffect(() => {
    const hoverAudio = new Audio("/sound.mp3");
    hoverAudio.preload = "auto";
    hoverAudio.volume = 0.42;
    hoverAudio.load();
    hoverAudioRef.current = hoverAudio;

    const clickAudio = new Audio("/click.mp3");
    clickAudio.preload = "auto";
    clickAudio.volume = 0.55;
    clickAudio.load();
    clickAudioRef.current = clickAudio;

    const startVoiceAudio = new Audio("/start-voice.mp3");
    startVoiceAudio.preload = "auto";
    startVoiceAudio.volume = 0.5;
    startVoiceAudio.load();
    startVoiceAudioRef.current = startVoiceAudio;

    const unlockAudio = () => {
      const bases = [hoverAudioRef.current, clickAudioRef.current, startVoiceAudioRef.current].filter(Boolean) as HTMLAudioElement[];
      if (!bases.length || audioUnlockedRef.current) return;
      audioUnlockedRef.current = true;
      Promise.all(
        bases.map((baseAudio) => {
          const unlockClone = baseAudio.cloneNode(true) as HTMLAudioElement;
          unlockClone.volume = 0;
          return unlockClone.play().then(() => {
            unlockClone.pause();
            unlockClone.currentTime = 0;
          });
        })
      ).catch(() => {
        audioUnlockedRef.current = false;
      });
    };

    window.addEventListener("pointerdown", unlockAudio, { passive: true });
    window.addEventListener("keydown", unlockAudio);

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      hoverAudioRef.current = null;
      clickAudioRef.current = null;
      startVoiceAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const updatePointerState = (target: EventTarget | null) => {
      const el = target instanceof Element ? target : null;
      setCursorPointer(Boolean(el?.closest('a, button, [role="button"], .slotCard, .bootMenuButton, .bootConfirmButton, .bootContactLink, .uiButton')));
    };

    const handlePointerMove = (event: PointerEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
      updatePointerState(event.target);
    };

    const handlePointerDown = (event: PointerEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
      updatePointerState(event.target);
      setCursorPressed(true);
      if (cursorPressTimeoutRef.current) clearTimeout(cursorPressTimeoutRef.current);
      cursorPressTimeoutRef.current = setTimeout(() => setCursorPressed(false), 140);
    };

    const handlePointerOver = (event: PointerEvent) => updatePointerState(event.target);
    const handlePointerLeave = () => setCursorPointer(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerleave', handlePointerLeave);
      if (cursorPressTimeoutRef.current) clearTimeout(cursorPressTimeoutRef.current);
    };
  }, []);

  const primeAudio = () => {
    const bases = [hoverAudioRef.current, clickAudioRef.current, startVoiceAudioRef.current].filter(Boolean) as HTMLAudioElement[];
    if (!bases.length || audioUnlockedRef.current) return;
    audioUnlockedRef.current = true;
    Promise.all(
      bases.map((baseAudio) => {
        const unlockClone = baseAudio.cloneNode(true) as HTMLAudioElement;
        unlockClone.volume = 0;
        return unlockClone.play().then(() => {
          unlockClone.pause();
          unlockClone.currentTime = 0;
        });
      })
    ).catch(() => {
      audioUnlockedRef.current = false;
    });
  };

  const playAudio = (baseAudio: HTMLAudioElement | null, volume: number) => {
    if (!baseAudio) return;
    try {
      const sound = baseAudio.cloneNode(true) as HTMLAudioElement;
      sound.volume = volume;
      sound.currentTime = 0;
      const cleanup = () => {
        sound.onended = null;
        sound.onerror = null;
      };
      sound.onended = cleanup;
      sound.onerror = cleanup;
      void sound.play().catch(() => {
        try {
          baseAudio.pause();
          baseAudio.currentTime = 0;
          baseAudio.volume = volume;
          void baseAudio.play().catch(() => {});
        } catch {}
      });
    } catch {
      try {
        baseAudio.pause();
        baseAudio.currentTime = 0;
        baseAudio.volume = volume;
        void baseAudio.play().catch(() => {});
      } catch {}
    }
  };

  const playHoverSound = () => {
    playAudio(hoverAudioRef.current, 0.42);
  };

  const playClickSound = () => {
    playAudio(clickAudioRef.current, 0.55);
  };

  const playStartVoice = () => {
    const baseAudio = startVoiceAudioRef.current;
    if (!baseAudio) return;
    const sound = baseAudio.cloneNode(true) as HTMLAudioElement;
    sound.volume = 0.5;
    sound.currentTime = 0;
    void sound.play().catch(() => {});
  };

  const startGrokamotos = () => {
    if (isStarting) return;
    primeAudio();
    playClickSound();
    playStartVoice();
    setIsStarting(true);
    stopBootShuffle();
    setBootModal(null);
    window.setTimeout(() => {
      setBootDone(true);
      showSaveIcon();
      window.setTimeout(() => {
        setIsStarting(false);
        try {
          if (localStorage.getItem("grokamotosIntroSeen") !== "1") {
            setShowIntro(true);
          } else {
            unlockAchievement("boot");
          }
        } catch {
          setShowIntro(true);
        }
      }, 120);
    }, 1050);
  };

  const pickNextBootBackground = () => {
    setBootBgIndex((prev) => {
      if (bootBackgrounds.length <= 1) return prev;
      let next = prev;
      while (next === prev) {
        next = Math.floor(Math.random() * bootBackgrounds.length);
      }
      return next;
    });
  };

  const startBootShuffle = () => {
    if (bootShuffleRef.current) clearInterval(bootShuffleRef.current);
    bootShuffleRef.current = setInterval(() => {
      pickNextBootBackground();
    }, 120);
  };

  const stopBootShuffle = () => {
    if (bootShuffleRef.current) {
      clearInterval(bootShuffleRef.current);
      bootShuffleRef.current = null;
    }
  };

  const bootMenuItems = useMemo(
    () => [
      { label: "START GROKAMOTOS", action: startGrokamotos },
      { label: "STATS", action: () => setBootModal("stats") },
      { label: "CONTACTS", action: () => setBootModal("contacts") },
      {
        label: "EXIT",
        action: () => {
          window.open("", "_self");
          window.close();
          setTimeout(() => {
            if (!document.hidden) {
              window.location.href = "about:blank";
            }
          }, 120);
        },
      },
    ],
    []
  );

  useEffect(() => {
    const combo = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight"];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!bootDone) {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          setBootMenuIndex((prev) => (prev - 1 + bootMenuItems.length) % bootMenuItems.length);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          setBootMenuIndex((prev) => (prev + 1) % bootMenuItems.length);
        } else if (event.key === "Enter" || event.key.toLowerCase() === "e") {
          event.preventDefault();
          if (bootModal === "stats") {
            playClickSound();
            window.open(links.wallet, "_blank", "noopener,noreferrer");
            setBootModal(null);
          } else if (bootModal === "contacts") {
            playClickSound();
            setBootModal(null);
          } else {
            playClickSound();
            bootMenuItems[bootMenuIndex]?.action();
          }
        } else if (event.key === "Escape" && bootModal) {
          event.preventDefault();
          setBootModal(null);
        }
      } else {
        const moveNav = (direction: 1 | -1) => {
          setNavFocusIndex((prev) => (prev + direction + navTabs.length) % navTabs.length);
          playHoverSound();
        };

        if (event.key === "Tab") {
          event.preventDefault();
          moveNav(event.shiftKey ? -1 : 1);
        } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          moveNav(1);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          moveNav(-1);
        } else if (event.key.toLowerCase() === "e" || event.key === "Enter") {
          event.preventDefault();
          const nextTab = navTabs[navFocusIndex]?.id ?? "main";
          setActiveTab(nextTab);
          playClickSound();
          if (nextTab === "gallery") unlockAchievement("archive");
          if (nextTab === "wallet") unlockAchievement("wallet");
          if (nextTab === "contacts") unlockAchievement("contacts");
        } else if (event.key === "Escape") {
          event.preventDefault();
          playClickSound();
          setPageReveal(false);
          setBootMenuIndex(0);
          setBootModal(null);
          setBootDone(false);
        }
      }

      if (!combo.includes(event.key)) return;
      const next = [...konamiRef.current, event.key].slice(-combo.length);
      konamiRef.current = next;

      if (combo.every((key, index) => next[index] === key)) {
        setHackerMode((prev) => !prev);
        unlockAchievement("root");
        konamiRef.current = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [bootDone, bootMenuIndex, bootMenuItems, bootModal, navFocusIndex, playClickSound, playHoverSound, unlockAchievement]);

  useEffect(() => {
    if (!bootDone) return;
    const timer = setInterval(() => {
      setSlots((prev) => {
        const next = [...prev];
        const lockedSlot = hoveredGallerySlot;
        let slotIndex = rotationStep % next.length;

        if (lockedSlot !== null && next.length > 1 && slotIndex === lockedSlot) {
          slotIndex = (slotIndex + 1) % next.length;
        }

        const current = next[slotIndex];
        const options = items.map((_, i) => i).filter((i) => i !== current && !next.includes(i));
        const pool = options.length > 0 ? options : items.map((_, i) => i).filter((i) => i !== current);
        const picked = pool[Math.floor(Math.random() * pool.length)];
        next[slotIndex] = picked;

        if (lockedSlot === null) {
          setSelectedId(items[picked]?.id ?? items[0].id);
        }

        return next;
      });
      setRotationStep((v) => v + 1);
    }, 2300);
    return () => clearInterval(timer);
  }, [bootDone, rotationStep, hoveredGallerySlot]);

  useEffect(() => {
    if (!bootDone) return;

    const loadWallet = async () => {
      try {
        const res = await fetch(`/api/wallet?ts=${Date.now()}`, { cache: "no-store", headers: { "cache-control": "no-store" } });
        const data = await res.json();

        setWalletData({
          drb: data.drb ?? 0,
          weth: data.weth ?? 0,
          drbUsdPrice: data.drbUsdPrice ?? 0,
          wethUsdPrice: data.wethUsdPrice ?? 0,
          drbUsdValue: data.drbUsdValue ?? 0,
          wethUsdValue: data.wethUsdValue ?? 0,
          updated:
            data.updated && data.updated !== "fallback"
              ? new Intl.DateTimeFormat("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                }).format(new Date(data.updated))
              : "fallback snapshot",
          source: data.source || "basescan-html",
          loading: false,
        });
      } catch {
        setWalletData((prev) => ({ ...prev, loading: false }));
      }
    };

    loadWallet();
    const timer = setInterval(loadWallet, 60000);
    return () => clearInterval(timer);
  }, [bootDone]);

  const trimCompact = (value: number) => value.toFixed(3).replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");

  const formatCompactAmount = (value: number) => {
    if (!Number.isFinite(value)) return "0.000";
    if (Math.abs(value) >= 1_000_000_000) return `${trimCompact(value / 1_000_000_000)}b`;
    if (Math.abs(value) >= 1_000_000) return `${trimCompact(value / 1_000_000)}m`;
    if (Math.abs(value) >= 1_000) return `${trimCompact(value / 1_000)}k`;
    return value.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  };

  const formatUsdApprox = (value: number) => {
    if (!Number.isFinite(value) || value <= 0) return "≈ $0.000";
    if (value >= 1_000_000_000) return `≈ $${trimCompact(value / 1_000_000_000)}b`;
    if (value >= 1_000_000) return `≈ $${trimCompact(value / 1_000_000)}m`;
    if (value >= 1_000) return `≈ $${trimCompact(value / 1_000)}k`;
    return `≈ $${value.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
  };

  const formatUsdTicker = (value: number) => {
    if (!Number.isFinite(value) || value <= 0) return "SYNCING";
    if (value >= 1_000_000_000) return "$" + trimCompact(value / 1_000_000_000) + "B";
    if (value >= 1_000_000) return "$" + trimCompact(value / 1_000_000) + "M";
    if (value >= 1_000) return "$" + trimCompact(value / 1_000) + "K";
    return "$" + value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const totalUsdBattle = walletData.drbUsdValue + walletData.wethUsdValue;
  const drbShare = totalUsdBattle > 0 ? (walletData.drbUsdValue / totalUsdBattle) * 100 : 50;
  const wethShare = totalUsdBattle > 0 ? (walletData.wethUsdValue / totalUsdBattle) * 100 : 50;
  const footerDate = new Intl.DateTimeFormat("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" }).format(clockNow);
  const footerTime = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(clockNow);

  return (
    <>
      <div
        className={`crosshairCursor ${cursorPointer ? "pointerZone" : ""} ${cursorPressed ? "pressed" : ""}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
        aria-hidden="true"
      />

      {saveToast && (
        <div className="saveToast uiFont">
          <span>SAVING...</span>
          <small>DO NOT TURN OFF GROKAMOTOS</small>
        </div>
      )}

      {achievementToast && (
        <div className="achievementToast uiFont">
          <div className="achievementToastLabel">ACHIEVEMENT UNLOCKED</div>
          <div className="achievementToastTitle">{achievementToast.title}</div>
          <div className="achievementToastDesc">{achievementToast.desc}</div>
        </div>
      )}
      {!bootLoadingDone && (
        <BootLoader />
      )}

      {bootLoadingDone && !bootDone && (
        <BootMenu
          hackerMode={hackerMode}
          isStarting={isStarting}
          bootBackground={bootBackgrounds[bootBgIndex]}
          bootMenuItems={bootMenuItems}
          bootMenuIndex={bootMenuIndex}
          bootModal={bootModal}
          linksWallet={links.wallet}
          startBootShuffle={startBootShuffle}
          stopBootShuffle={stopBootShuffle}
          setBootMenuIndex={setBootMenuIndex}
          setBootModal={setBootModal}
          playHoverSound={playHoverSound}
          playClickSound={playClickSound}
          unlockAchievement={unlockAchievement}
        />
      )}
      {showIntro && (
        <div className="introOverlay">
          <div className="introCard panelPlate uiFont">
            <div className="panelBar">
              <span>NEW SESSION / OPERATIVE BRIEFING</span>
              <span>ONE-TIME MESSAGE</span>
            </div>
            <div className="introBody">
              <div className="introKicker">WELCOME OPERATIVE.</div>
              <div className="introTitle">Inspect the archive, verify the signal, and confirm Grok has money.</div>
              <p>Unofficial Grokamotos is a visual support signal. Explore the interface, scan traits, check wallet data, and collect small site achievements while you move through the archive.</p>
              <button type="button" className="uiButton introButton" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={() => { playClickSound(); closeIntro(); }}>CONTINUE</button>
            </div>
          </div>
        </div>
      )}

      {showAchievements && (
        <div className="introOverlay">
          <div className="introCard achievementCollection panelPlate uiFont">
            <div className="panelBar">
              <span>ACHIEVEMENT COLLECTION</span>
              <span>{achievementCatalog.filter((item) => achievements[item.id]).length}/{achievementCatalog.length}</span>
            </div>
            <div className="achievementList">
              {achievementCatalog.map((item) => (
                <div key={item.id} className={`achievementRow ${achievements[item.id] ? "unlocked" : ""}`}>
                  <span>{achievements[item.id] ? "✓" : "□"}</span>
                  <strong>{item.title}</strong>
                  <em>{item.desc}</em>
                </div>
              ))}
            </div>
            <div className="achievementModalActions">
              <button type="button" className="uiButton introButton" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={() => { playClickSound(); resetAchievements(); }}>RESET ACHIEVEMENTS</button>
              <button type="button" className="uiButton introButton" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={() => { playClickSound(); setShowAchievements(false); }}>CLOSE</button>
            </div>
          </div>
        </div>
      )}

      <main className={`gameShell ${hackerMode ? "hackerLive" : ""} ${pageReveal ? "pageReveal" : "pageHidden"}`}>
        <div className="shellNoise" />
        <div className="shellScanlines" />

        <section className="frameOuter">
          <div className="frameHeader uiFont panelBar">
            <div className="miniDots"><span className="miniDot red" /><span className="miniDot yellow" /><span className="miniDot green" /></div>
            <span>UNOFFICIAL GROKAMOTOS / ARCHIVE MODE</span>
            <span>BUILD 2003</span>
          </div>

          <nav className="pipTopTabs uiFont" aria-label="Pip-Boy sections">
            {navTabs.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                className={`pipTab ${activeTab === tab.id ? "active" : ""} ${navFocusIndex === index ? "focused" : ""}`}
                onMouseEnter={() => { setNavFocusIndex(index); playHoverSound(); }}
                onFocus={() => { setNavFocusIndex(index); playHoverSound(); }}
                onClick={() => { playClickSound(); setActiveTab(tab.id); setNavFocusIndex(index); }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="pipTicker uiFont" aria-live="polite">
            <div className="pipTickerViewport">
              <div className="pipTickerInner">
              <span>» TOTAL GROK WALLET VALUE: {formatUsdTicker(totalUsdBattle)}</span>
              <span>WETH SIGNAL: {formatUsdTicker(walletData.wethUsdValue)}</span>
              <span>$DRB SIGNAL: {formatUsdTicker(walletData.drbUsdValue)}</span>
              <span>{walletData.loading ? "SYNCING WALLET..." : `UPDATED: ${walletData.updated}`}</span>
            </div>
            </div>
            <span className="pipTickerSignal">
              <span className="pipTickerSignalLabel">SIGNAL: STRONG</span>
              <span className="pipSignalBars" aria-hidden="true">
                <span className="pipSignalBar pipSignalBar1" />
                <span className="pipSignalBar pipSignalBar2" />
                <span className="pipSignalBar pipSignalBar3" />
              </span>
            </span>
          </div>

          <div className="pipTabContent">
            {activeTab === "main" && (
              <HeroSection
                links={links}
                traitBreakdown={traitBreakdown}
                parallax={parallax}
                hackLineA={hackLineA}
                hackLineB={hackLineB}
                playHoverSound={playHoverSound}
                playClickSound={playClickSound}
                unlockAchievement={unlockAchievement}
                showSaveIcon={showSaveIcon}
                setShowAchievements={setShowAchievements}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === "gallery" && (
              <GallerySection
                items={items}
                slots={slots}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                playHoverSound={playHoverSound}
                playClickSound={playClickSound}
                mintUrl={links.mint}
                setHoveredSlotIndex={setHoveredGallerySlot}
              />
            )}

            {activeTab === "wallet" && (
              <WalletStatsSection
                walletData={walletData}
                wethShare={wethShare}
                drbShare={drbShare}
                links={links}
                formatCompactAmount={formatCompactAmount}
                formatUsdApprox={formatUsdApprox}
                playHoverSound={playHoverSound}
                playClickSound={playClickSound}
              />
            )}

            {activeTab === "contacts" && (
              <ContactsSection
                playHoverSound={playHoverSound}
                playClickSound={playClickSound}
              />
            )}

            {activeTab === "game" && (
              <section className="pipUtilityPanel pipGamePanel uiFont">
                <div className="pipUtilityTitle">ROBCO HACK MODULE</div>
                <div className="pipGameSoon">COMING SOON</div>
                <p>Terminal mini-game will be installed in a later build.</p>
              </section>
            )}
          </div>

          <footer className="statusBar pipHintBar uiFont">
            <div className="pipHintGroup">
              <span>[↑↓←→] NAVIGATION</span>
              <span>[TAB] SWITCH TAB</span>
              <span>[E] SELECT</span>
              <span>[F5] REFRESH</span>
              <span>[ESC] MENU</span>
            </div>
            <div className="pipClock">
              <span>{footerDate}</span>
              <span>{footerTime}</span>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
