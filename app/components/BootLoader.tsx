"use client";

export function BootLoader() {
  return (
    <div className="bootScreen">
      <div className="bootGlow" />
      <div className="bootLoaderScreen uiFont">
        <div className="bootLoaderNoise" />
        <div className="bootCard bootLoaderCard">
          <div className="bootBrand uiFont">LAUNCH $DRB PROGRAM</div>
          <div className="bootSub uiFont">GROK HAS MONEY</div>
          <div className="bootLineWrap">
            <div className="bootLine visible uiFont">VAULT ACCESS / SLOT 1 / OPEN</div>
            <div className="bootLine visible uiFont">INJECTING GROKAMOTOS MENU PAYLOAD</div>
            <div className="bootLine visible uiFont">PATCHING ARCHIVE INTERFACE</div>
            <div className="bootLine visible uiFont">LOADING GROKAMOTO MODEL</div>
          </div>
          <div className="bootBar"><div className="bootFill bootLoaderFill" /></div>
          <div className="bootMeta uiFont"><span>BUILD 1.337 / FUN MODE</span><span>SCREAM.VISION 2026</span></div>
        </div>
      </div>
    </div>
  );
}
