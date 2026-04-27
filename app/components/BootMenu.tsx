"use client";

type BootMenuItem = {
  label: string;
  action: () => void;
};

type BootMenuProps = {
  hackerMode: boolean;
  isStarting: boolean;
  bootMenuItems: BootMenuItem[];
  bootMenuIndex: number;
  bootModal: null | "stats" | "contacts";
  linksWallet: string;
  setBootMenuIndex: (index: number) => void;
  setBootModal: (modal: null | "stats" | "contacts") => void;
  playHoverSound: () => void;
  playClickSound: () => void;
  unlockAchievement: (id: string) => void;
};

export function BootMenu({
  hackerMode,
  isStarting,
  bootMenuItems,
  bootMenuIndex,
  bootModal,
  linksWallet,
  setBootMenuIndex,
  setBootModal,
  playHoverSound,
  playClickSound,
  unlockAchievement,
}: BootMenuProps) {
  return (
    <div className={`bootMenuScreen ${hackerMode ? "hackerBoot" : ""} ${isStarting ? "bootStarting" : ""}`}>
      <div className="bootMenuArt">
        <div className="bootMenuBackdropInner">
          <img
            className="bootMenuBackdropGif"
            src="/effects/boot-menu-bg.gif"
            alt=""
            aria-hidden="true"
            draggable={false}
          />
        </div>
        <div className="bootMenuVhs" />
        <div className="bootMenuTracking" />
        <div className="bootMenuVignette" />
      </div>

      <div className="bootMenuMeta bootMenuMetaLeft uiFont">MEMORY CARD SLOT 1</div>
      <div className="bootMenuMeta bootMenuMetaRight uiFont">SCREAM.VISION 2026</div>
      <div className="bootMenuVersion uiFont">v 1.337</div>

      <div className="bootMenuActions uiFont" role="menu" aria-label="Boot menu">
        {bootMenuItems.map((item, index) => (
          <button
            key={item.label}
            type="button"
            className={`bootMenuButton ${bootMenuIndex === index ? "active" : ""}`}
            onMouseEnter={() => { setBootMenuIndex(index); playHoverSound(); }}
            onFocus={() => { setBootMenuIndex(index); playHoverSound(); }}
            onClick={() => {
              playClickSound();
              item.action();
            }}
          >
            <span className="bootMenuArrow">&gt;</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="bootMenuHints uiFont">
        <span>↑↓ SELECT</span>
        <span>ENTER CONFIRM</span>
      </div>

      <div className="bootStartFlash" />

      {bootModal === "stats" && (
        <div className="bootConfirmWrap">
          <div className="bootConfirmCard uiFont">
            <div className="bootConfirmTitle">LEAVING CURRENT SCREEN</div>
            <div className="bootConfirmText">You are about to open DRB wallet stats in a new window.</div>
            <div className="bootConfirmActions">
              <button type="button" className="bootConfirmButton" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={() => { playClickSound(); setBootModal(null); }}>CANCEL</button>
              <button
                type="button"
                className="bootConfirmButton primary"
                onMouseEnter={playHoverSound}
                onFocus={playHoverSound}
                onClick={() => {
                  playClickSound();
                  window.open(linksWallet, "_blank", "noopener,noreferrer");
                  setBootModal(null);
                }}
              >
                OPEN STATS
              </button>
            </div>
          </div>
        </div>
      )}

      {bootModal === "contacts" && (
        <div className="bootConfirmWrap">
          <div className="bootConfirmCard uiFont contactsCard contactTerminalCard">
            <div className="bootConfirmTitle">CONTACT TERMINAL / ROUTE SELECT</div>
            <div className="contactTerminal">
              <div className="contactTerminalLine"><span>&gt;</span><strong>ROUTES ONLINE</strong><em>DIALING SIGNAL...</em></div>
              <a href="https://linktr.ee/screamvision" target="_blank" rel="noopener noreferrer" className="contactTerminalRoute" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={() => { playClickSound(); unlockAchievement("contacts"); }}>
                <span>01</span><strong>LINKTREE</strong><em>SCREAMVISION HUB</em>
              </a>
              <a href="https://x.com/scream_vision" target="_blank" rel="noopener noreferrer" className="contactTerminalRoute" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={() => { playClickSound(); unlockAchievement("contacts"); }}>
                <span>02</span><strong>X.COM</strong><em>@SCREAM_VISION</em>
              </a>
              <a href="mailto:screamvisionmfer@gmail.com" className="contactTerminalRoute" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={() => { playClickSound(); unlockAchievement("contacts"); }}>
                <span>03</span><strong>EMAIL</strong><em>SCREAMVISIONMFER@GMAIL.COM</em>
              </a>
            </div>
            <div className="bootConfirmActions single">
              <button type="button" className="bootConfirmButton primary" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={() => { playClickSound(); setBootModal(null); }}>CLOSE TERMINAL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
