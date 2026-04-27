"use client";

export function GameSection() {
  return (
    <section className="gameSection panelPlate">
      <div className="panelBar uiFont">
        <div className="miniDots"><span className="miniDot red" /><span className="miniDot yellow" /><span className="miniDot green" /></div>
        <span>GAME MODULE</span>
        <span>COMING SOON</span>
      </div>
      <div className="gameSectionBody">
        <div className="gamePlaceholder">
          <div className="tokenMini uiFont">ROBCO HACK MODULE</div>
          <h2 className="tokenTitle uiFont">COMING SOON</h2>
          <p className="bodyCopy">
            ROBCO HACK MODULE // COMING SOON
          </p>
        </div>
      </div>
    </section>
  );
}
