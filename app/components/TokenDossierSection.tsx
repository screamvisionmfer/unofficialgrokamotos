"use client";

type TokenDossierSectionProps = {
  links: Record<string, string>;
  playHoverSound: () => void;
  playClickSound: () => void;
};

export function TokenDossierSection({
  links,
  playHoverSound,
  playClickSound,
}: TokenDossierSectionProps) {
  return (
    <section className="tokenSection panelPlate">
      <div className="panelBar uiFont">
        <div className="miniDots"><span className="miniDot red" /><span className="miniDot yellow" /><span className="miniDot green" /></div>
        <span>DEBTRELIEFBOT / TOKEN DOSSIER</span>
        <span>BASE NETWORK</span>
      </div>

      <div className="tokenSectionGrid">
        <div className="tokenStory">
          <div className="tokenMini uiFont">PROJECT CONTEXT</div>
          <h2 className="tokenTitle uiFont">ABOUT $DRB</h2>
          <p className="bodyCopy">
            DebtReliefBot ($DRB) is publicly presented as the first token proposed by one AI and
            deployed by another AI. The project narrative centers on Grok suggesting the name,
            Bankr deploying it on Base, and the community building a lore-driven token around that event.
          </p>
          <p className="bodyCopy compactTop">
            Public project materials describe a March 7, 2025 launch on Base, a 100 billion supply,
            and a fee mechanism that routes part of trading fees to Grok's wallet.
          </p>
        </div>

        <div className="tokenMetaPanel">
          <div className="metaGrid">
            <div className="metaCard"><div className="statLabel uiFont">TOKEN</div><div className="statValue uiFont">$DRB</div></div>
            <div className="metaCard"><div className="statLabel uiFont">CHAIN</div><div className="statValue uiFont">BASE</div></div>
            <div className="metaCard"><div className="statLabel uiFont">LAUNCH</div><div className="statValue uiFont">07 MAR 2025</div></div>
            <div className="metaCard"><div className="statLabel uiFont">SUPPLY</div><div className="statValue uiFont">100B</div></div>
          </div>

          <div className="tokenButtons">
            <a href={links.token} target="_blank" rel="noopener noreferrer" className="uiButton uiFont" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={playClickSound}>OPEN DEXSCREENER</a>
            <a href={links.grokipedia} target="_blank" rel="noopener noreferrer" className="uiButton uiFont" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={playClickSound}>OPEN GROKIPEDIA</a>
          </div>
        </div>
      </div>
    </section>
  );
}
