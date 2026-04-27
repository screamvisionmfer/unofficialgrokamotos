"use client";

import { useMemo } from "react";

type WalletData = {
  drb: number;
  weth: number;
  drbUsdPrice: number;
  wethUsdPrice: number;
  drbUsdValue: number;
  wethUsdValue: number;
  updated: string;
  source: string;
  loading: boolean;
};

type WalletStatsSectionProps = {
  walletData: WalletData;
  wethShare: number;
  drbShare: number;
  links: Record<string, string>;
  formatCompactAmount: (value: number) => string;
  formatUsdApprox: (value: number) => string;
  playHoverSound: () => void;
  playClickSound: () => void;
};

const WALLET_ADDRESS = "0xb1058c959987e3513600eb5b4fd82aeee2a0e4f9";
const TOKEN_CONTRACT = "0x3ec2156D4c0A9CBdAB4a016633b7BcF6a8d68Ea2";
const SEGMENTS = 44;

function shortAddress(value: string) {
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export function WalletStatsSection({
  walletData,
  wethShare,
  drbShare,
  links,
  formatCompactAmount,
  formatUsdApprox,
  playHoverSound,
  playClickSound,
}: WalletStatsSectionProps) {
  const totalUsd = walletData.wethUsdValue + walletData.drbUsdValue;
  const safeWethShare = Number.isFinite(wethShare) ? wethShare : 50;
  const safeDrbShare = Number.isFinite(drbShare) ? drbShare : 50;

  const progressSegments = useMemo(() => {
    const wethSegments = Math.max(0, Math.min(SEGMENTS, Math.round((safeWethShare / 100) * SEGMENTS)));
    return Array.from({ length: SEGMENTS }, (_, index) => ({
      id: index,
      side: index < wethSegments ? "weth" : "drb",
    }));
  }, [safeWethShare]);

  const copyWallet = () => {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(WALLET_ADDRESS).catch(() => undefined);
    }
  };

  const copyContract = () => {
    playClickSound();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(TOKEN_CONTRACT).catch(() => undefined);
    }
  };

  return (
    <section id="walletstats" className="drbWalletTerminal uiFont" aria-label="DRB wallet overview">
      <div className="drbWalletGrid">
        <div className="drbWalletLeft">
          <div className="drbBlockTitle"><span>WALLET OVERVIEW</span></div>

          <div className="drbBattlePanel">
            <div className="drbAssetRow">
              <div className="drbAssetCard weth">
                <div className="drbAssetIconFrame weth" aria-hidden="true">
                  <img className="drbAssetPngIcon weth" src="/icons/weth-logo.png" alt="" />
                </div>

                <div className="drbAssetSide weth">
                  <div className="drbAssetName">WETH</div>
                  <div className="drbAssetAmount">{formatCompactAmount(walletData.weth)}</div>
                  <div className="drbAssetUsd">{formatUsdApprox(walletData.wethUsdValue)} USD</div>
                </div>
              </div>

              <div className="drbDuelDivider" aria-hidden="true" />

              <div className="drbAssetCard drb">
                <div className="drbAssetIconFrame drb" aria-hidden="true">
                  <img className="drbAssetPngIcon drb" src="/icons/drb-logo.png" alt="" />
                </div>

                <div className="drbAssetSide drb">
                  <div className="drbAssetName">$DRB</div>
                  <div className="drbAssetAmount">{formatCompactAmount(walletData.drb)}</div>
                  <div className="drbAssetUsd">{formatUsdApprox(walletData.drbUsdValue)} USD</div>
                </div>
              </div>
            </div>

            <div className="drbPercentRow">
              <span>{safeWethShare.toFixed(1)}%</span>
              <span>{safeDrbShare.toFixed(1)}%</span>
            </div>

            <div className="drbSegmentBar" aria-label="WETH versus DRB split by USD value">
              {progressSegments.map((segment) => (
                <span key={segment.id} className={`drbSegment ${segment.side}`} />
              ))}
              <i style={{ left: `${Math.max(0, Math.min(100, safeWethShare))}%` }} />
            </div>

            <div className="drbTotalValue">
              <span>TOTAL WALLET VALUE</span>
              <strong>{formatUsdApprox(totalUsd).replace("≈ ", "")}</strong>
            </div>
          </div>

          <div className="drbWalletLinks">
            <div className="drbBlockTitle small"><span>WALLET LINKS</span></div>
            <div className="drbLinkGrid">
              <a href={links.basescan} target="_blank" rel="noopener noreferrer" className="drbLinkCard" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={playClickSound}>
                <span className="drbLinkIcon globe" aria-hidden="true" />
                <strong>VIEW ON<br />BASESCAN</strong>
                <em>basescan.org</em>
                <b>›</b>
              </a>

              <a href={links.wallet} target="_blank" rel="noopener noreferrer" className="drbLinkCard" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={playClickSound}>
                <span className="drbLinkIcon chart" aria-hidden="true" />
                <strong>VIEW ON<br />DRB TASK FORCE</strong>
                <em>drbtaskforce.com</em>
                <b>›</b>
              </a>

              <button type="button" className="drbLinkCard" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={copyWallet}>
                <span className="drbLinkIcon copy" aria-hidden="true" />
                <strong>COPY GROK WALLET<br />ADDRESS</strong>
                <em>{shortAddress(WALLET_ADDRESS)}</em>
                <b>›</b>
              </button>
            </div>
          </div>
        </div>

        <aside className="drbWalletRight">
          <div className="drbInfoPanel">
            <div className="drbBlockTitle"><span>$DRB TOKEN INFORMATION</span></div>
            <div className="drbTokenInfoBody">
              <div className="drbTokenSeal animated">
                <div className="drbSealGrid" />
                <img className="drbTokenGif" src="/effects/drb-token-signal.gif" alt="" aria-hidden="true" />
              </div>

              <div className="drbTokenMeta">
                <div><span>TOKEN NAME</span><strong>DebtReliefBot</strong></div>
                <div><span>TICKER</span><strong>$DRB</strong></div>
                <div><span>ORIGIN</span><strong>X / Bankr / Grok</strong></div>
                <div><span>CREATED</span><strong>MAR 7, 2025</strong></div>
                <div><span>TOTAL SUPPLY</span><strong>100,000,000,000 $DRB</strong></div>
                <div><span>NETWORK</span><strong>BASE</strong></div>
                <div className="drbContractRow">
                  <span>CONTRACT</span>
                  <strong>{shortAddress(TOKEN_CONTRACT)}</strong>
                  <button type="button" className="drbContractCopy" aria-label="Copy token contract address" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={copyContract}>
                    <span className="drbCopyMiniIcon" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="drbAboutPanel">
            <div className="drbBlockTitle"><span>ABOUT $DRB</span></div>
            <p>
              $DRB, Debt Relief Bot, is Grok's first token deployed with the help of Bankr, a helpful AI companion. The coin was deployed directly in the X social feed and deployment was triggered when Grok suggested the name and ticker in a thread with Bankr.
            </p>
            <div className="drbTokenButtons">
              <a href={links.token} target="_blank" rel="noopener noreferrer" className="drbLinkCard compact" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={playClickSound}>
                <img className="drbLinkIcon drbLinkIconImage" src="/icons/token-dex.png" alt="" aria-hidden="true" />
                <strong>VIEW TOKEN</strong>
                <em>dexscreener.com</em>
                <b>›</b>
              </a>

              <a href={links.grokipedia} target="_blank" rel="noopener noreferrer" className="drbLinkCard compact" onMouseEnter={playHoverSound} onFocus={playHoverSound} onClick={playClickSound}>
                <span className="drbLinkIcon globe" aria-hidden="true" />
                <strong>READ LORE</strong>
                <em>grokipedia.com</em>
                <b>›</b>
              </a>
            </div>
          </div>
        </aside>
      </div>

      <div className="drbWalletMotto">──── CONTROL THE UNIT. BUILD THE FUTURE. ────</div>
    </section>
  );
}
