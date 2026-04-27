"use client";

type ActiveTab = "main" | "gallery" | "wallet" | "contacts" | "game";

type HeroSectionProps = {
  links: Record<string, string>;
  traitBreakdown: { label: string; count: number }[];
  parallax: { x: number; y: number };
  hackLineA: string;
  hackLineB: string;
  playHoverSound: () => void;
  playClickSound: () => void;
  unlockAchievement: (id: string) => void;
  showSaveIcon: () => void;
  setShowAchievements: (show: boolean) => void;
  setActiveTab: (tab: ActiveTab) => void;
};


export function HeroSection({
  links,
  parallax,
  playHoverSound,
  playClickSound,
  unlockAchievement,
  showSaveIcon,
  setShowAchievements,
  setActiveTab,
}: HeroSectionProps) {
  return (
    <section className="pipMainScreen" id="main">
      <aside className="pipMainRoutes uiFont" aria-label="Main routes">
        <div className="pipSectionLabel">MAIN ROUTES</div>

        <a href={links.mint} className="pipRouteItem active" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={(event) => { event.preventDefault(); playClickSound(); setActiveTab("gallery"); unlockAchievement("archive"); showSaveIcon(); }}>
          <span className="pipRouteNumber">01</span>
          <img className="pipRouteIcon" src="/icons/mint.png" alt="" aria-hidden="true" />
          <strong>MINT</strong>
        </a>
        <button type="button" className="pipRouteItem pipRouteButton" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={() => { playClickSound(); setActiveTab("gallery"); unlockAchievement("archive"); showSaveIcon(); }}>
          <span className="pipRouteNumber">02</span>
          <img className="pipRouteIcon" src="/icons/art.png" alt="" aria-hidden="true" />
          <strong>VIEW ART</strong>
        </button>
        <a href={links.token} target="_blank" rel="noopener noreferrer" className="pipRouteItem" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={() => { playClickSound(); unlockAchievement("token"); }}>
          <span className="pipRouteNumber">03</span>
          <img className="pipRouteIcon" src="/icons/token.png" alt="" aria-hidden="true" />
          <strong>VIEW TOKEN</strong>
        </a>
        <button type="button" className="pipRouteItem pipRouteButton" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={() => { playClickSound(); setActiveTab("wallet"); unlockAchievement("wallet"); showSaveIcon(); }}>
          <span className="pipRouteNumber">04</span>
          <img className="pipRouteIcon" src="/icons/wallet.png" alt="" aria-hidden="true" />
          <strong>WALLET</strong>
        </button>
        <button type="button" className="pipRouteItem pipRouteButton" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={() => { playClickSound(); setShowAchievements(true); }}>
          <span className="pipRouteNumber">05</span>
          <img className="pipRouteIcon" src="/icons/achieve.png" alt="" aria-hidden="true" />
          <strong>ACHIEVE</strong>
        </button>

        <div className="pipRouteStatusCluster">
          <div className="pipRouteSystemBox">
            <div><span>PIP-OS</span><strong>v2.0.3</strong></div>
            <div><span>TERMINAL</span><strong>GROKA-01</strong></div>
            <div><span>USER</span><strong>ANONYMOUS</strong></div>
          </div>

          <div className="pipRouteStatus"><span /> SYSTEM STATUS: NOMINAL</div>

          <div className="pipWalkerPanel" aria-hidden="true">
            <img className="pipWalkerGif" src="/effects/grok-walker.gif" alt="" />
          </div>
        </div>
      </aside>

      <div className="pipCharacterPanel">
        <div className="pipPanelTitle uiFont">CHARACTER BAY // VISUAL IDENTITY UNIT</div>

        <div className="pipStatsTop uiFont">
          <div className="pipStatBox">
            <span>PFP COUNT</span>
            <strong>2026</strong>
          </div>
          <div className="pipReticle" aria-hidden="true">⊙</div>
          <div className="pipStatBox right">
            <span>TRAITS</span>
            <strong>358</strong>
          </div>
        </div>

        <div className="pipModelViewport">
          <model-viewer
            className="pipModelViewer"
            src="/grokamotos.glb"
            camera-controls="false"
            auto-rotate
            rotation-per-second="24deg"
            disable-zoom
            disable-pan
            interaction-prompt="none"
            shadow-intensity="0"
            exposure="1.05"
            environment-image="neutral"
            camera-orbit="0deg 76deg 2.82m"
            camera-target="0m 0.02m 0m"
            field-of-view="24deg"
          />

          <div className="parallaxLayer parallaxGridLayer" style={{ transform: `translate3d(${parallax.x * -0.25}px, ${parallax.y * -0.2}px, 0)` }} />
          <div className="parallaxLayer parallaxGlowLayer" style={{ transform: `translate3d(${parallax.x * 0.35}px, ${parallax.y * 0.3}px, 0)` }} />
          <div className="scannerBrackets" aria-hidden="true"><span /><span /><span /><span /></div>
        </div>

        <div className="pipNetworkPanel uiFont">
          <div className="pipNetworkSide pipNetworkSideLeft">
            <div>
              <span>NETWORK</span>
              <strong>BASE</strong>
            </div>
          </div>

          <div className="pipSignalWave" aria-hidden="true">
            <img className="pipSignalGif" src="/effects/scope-signal-v16.gif" alt="" />
          </div>

          <div className="pipNetworkSide pipNetworkSideRight">
            <div>
              <span>STATUS</span>
              <strong>LIVE</strong>
            </div>
            <span className="pipNetworkDot" aria-hidden="true" />
          </div>
        </div>
      </div>

      <aside className="pipInfoPanel">
        <div className="heroKicker uiFont">MISSION FILE / SUPPORT SIGNAL</div>
        <h1
          className="pipHeroTitle uiFont pipTitleGlitch"
          data-text={`UNOFFICIAL
GROKAMOTOS`}
        >
          <span>UNOFFICIAL<br />GROKAMOTOS</span>
        </h1>
        <p className="pipHeroDescription">
          Unofficial Grokamotos is a 2,026-piece fan-made PFP NFT archive built around the $DRB universe, pushing its visual identity through low-poly early-2000s game aesthetics, ironic terminal-core energy, and community-made underground mythology.
        </p>
        <p className="pipHeroDescription smallLine">Satoshi #Grokamotos Has Money.</p>
      </aside>
    </section>
  );
}
