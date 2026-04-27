
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Difficulty = { key: string; label: string; rows: number; cols: number; debts: number };
type Cell = { id: number; row: number; col: number; isDebt: boolean; isOpen: boolean; isFlagged: boolean; adjacent: number };
type GameStatus = "playing" | "won" | "lost";

const difficulties: Difficulty[] = [
  { key: "easy", label: "EASY", rows: 8, cols: 8, debts: 10 },
  { key: "normal", label: "NORMAL", rows: 10, cols: 10, debts: 18 },
  { key: "hard", label: "HARD", rows: 12, cols: 12, debts: 28 },
  { key: "mode1337", label: "1337", rows: 13, cols: 13, debts: 37 },
];

function getNeighbors(row: number, col: number, rows: number, cols: number) {
  const out: number[] = [];
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) out.push(nr * cols + nc);
    }
  }
  return out;
}

function createBoard(config: Difficulty): Cell[] {
  const total = config.rows * config.cols;
  const debtIds = new Set<number>();
  while (debtIds.size < config.debts) debtIds.add(Math.floor(Math.random() * total));

  const board: Cell[] = Array.from({ length: total }, (_, id) => {
    const row = Math.floor(id / config.cols);
    const col = id % config.cols;
    return { id, row, col, isDebt: debtIds.has(id), isOpen: false, isFlagged: false, adjacent: 0 };
  });

  return board.map((cell) => ({
    ...cell,
    adjacent: getNeighbors(cell.row, cell.col, config.rows, config.cols).filter((id) => board[id].isDebt).length,
  }));
}

function revealCascade(board: Cell[], id: number, config: Difficulty) {
  const next = board.map((cell) => ({ ...cell }));
  const queue = [id];

  while (queue.length) {
    const currentId = queue.shift()!;
    const cell = next[currentId];
    if (cell.isOpen || cell.isFlagged) continue;
    cell.isOpen = true;

    if (!cell.isDebt && cell.adjacent === 0) {
      for (const nId of getNeighbors(cell.row, cell.col, config.rows, config.cols)) {
        const n = next[nId];
        if (!n.isOpen && !n.isFlagged && !n.isDebt) queue.push(nId);
      }
    }
  }

  return next;
}

export default function MinesPage() {
  const [difficultyKey, setDifficultyKey] = useState(difficulties[0].key);
  const difficulty = useMemo(() => difficulties.find((item) => item.key === difficultyKey) ?? difficulties[0], [difficultyKey]);
  const [board, setBoard] = useState<Cell[]>(() => createBoard(difficulty));
  const [status, setStatus] = useState<GameStatus>("playing");
  const [startedAt, setStartedAt] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const longPressRef = useRef<number | null>(null);
  const longPressUsedRef = useRef(false);

  const resetGame = (config = difficulty) => {
    setBoard(createBoard(config));
    setStatus("playing");
    setStartedAt(Date.now());
    setElapsed(0);
  };

  useEffect(() => { resetGame(difficulty); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [difficultyKey]);

  useEffect(() => {
    if (status !== "playing") return;
    const t = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt) / 1000)), 500);
    return () => window.clearInterval(t);
  }, [startedAt, status]);

  const flaggedCount = board.filter((cell) => cell.isFlagged).length;
  const safeTotal = board.length - difficulty.debts;
  const safeOpen = board.filter((cell) => cell.isOpen && !cell.isDebt).length;

  const finishWinIfNeeded = (next: Cell[]) => {
    const opened = next.filter((cell) => cell.isOpen && !cell.isDebt).length;
    if (opened === safeTotal) {
      setStatus("won");
      return next.map((cell) => (cell.isDebt ? { ...cell, isFlagged: true } : cell));
    }
    return next;
  };

  const openCell = (id: number) => {
    if (status !== "playing") return;
    setBoard((prev) => {
      const cell = prev[id];
      if (!cell || cell.isOpen || cell.isFlagged) return prev;
      if (cell.isDebt) {
        setStatus("lost");
        return prev.map((item) => (item.isDebt ? { ...item, isOpen: true } : item));
      }
      return finishWinIfNeeded(revealCascade(prev, id, difficulty));
    });
  };

  const toggleFlag = (id: number) => {
    if (status !== "playing") return;
    setBoard((prev) => {
      const cell = prev[id];
      if (!cell || cell.isOpen) return prev;
      return prev.map((item) => (item.id === id ? { ...item, isFlagged: !item.isFlagged } : item));
    });
  };

  const handleContextMenu = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    toggleFlag(id);
  };

  const handlePointerDown = (id: number) => {
    longPressUsedRef.current = false;
    if (longPressRef.current) window.clearTimeout(longPressRef.current);
    longPressRef.current = window.setTimeout(() => {
      longPressUsedRef.current = true;
      toggleFlag(id);
    }, 420);
  };

  const clearPointer = () => {
    if (longPressRef.current) window.clearTimeout(longPressRef.current);
    longPressRef.current = null;
  };

  const handleCellClick = (id: number) => {
    if (longPressUsedRef.current) {
      longPressUsedRef.current = false;
      return;
    }
    openCell(id);
  };

  const statusText = status === "won"
    ? "RELIEF PROTOCOL COMPLETE"
    : status === "lost"
      ? "DEBT DETONATED"
      : "SWEEP THE FIELD // MARK ALL DEBT";

  return (
    <main className="minesPage">
      <div className="shellNoise" />
      <div className="shellScanlines" />

      <section className="minesWrap">
        <div className="minesFrame panelPlate">
          <div className="frameHeader uiFont">
            <span>DEBT SWEEPER // RELIEF GRID</span>
            <div className="miniDots" aria-hidden="true">
              <span className="miniDot red" />
              <span className="miniDot yellow" />
              <span className="miniDot green" />
            </div>
          </div>

          <div className="minesHeaderGrid">
            <div className="minesHero panelPlate">
              <div className="panelBar uiFont">
                <span>OPERATIVE TOOL / MINESWEEPER VARIANT</span>
                <span>BUILD 1.337</span>
              </div>
              <div className="minesHeroBody">
                <div>
                  <p className="minesEyebrow uiFont">Debt Relief Bot // Field Utility</p>
                  <h1 className="minesTitle uiFont">Locate debt before debt locates you.</h1>
                  <p className="minesText">
                    This is a DRB-themed minesweeper. Every hidden trap is a <strong>DEBT</strong> cell. Open safe cells,
                    read the number hints, and mark the debt positions without detonating the board.
                  </p>
                </div>
                <div className="minesActions">
                  <Link href="/" className="uiButton uiFont minesButtonPrimary">BACK TO SITE</Link>
                  <button type="button" className="uiButton uiFont minesButtonGhost" onClick={() => resetGame()}>RESTART RUN</button>
                </div>
              </div>
            </div>

            <div className="minesStats panelPlate">
              <div className="panelBar uiFont"><span>RUN STATUS</span><span>{status.toUpperCase()}</span></div>
              <div className="minesCounters uiFont">
                <div className="minesCounterCard">
                  <span className="minesCounterLabel">DEBT LEFT</span>
                  <strong>{String(Math.max(0, difficulty.debts - flaggedCount)).padStart(2, "0")}</strong>
                </div>
                <div className="minesCounterCard">
                  <span className="minesCounterLabel">TIME</span>
                  <strong>{String(elapsed).padStart(3, "0")}</strong>
                </div>
                <div className="minesCounterCard">
                  <span className="minesCounterLabel">SAFE OPEN</span>
                  <strong>{safeOpen}/{safeTotal}</strong>
                </div>
              </div>
              <div className={`minesStatusLine uiFont ${status}`}>{statusText}</div>
            </div>
          </div>

          <div className="minesMainGrid">
            <div className="minesBoardPanel panelPlate">
              <div className="panelBar uiFont">
                <span>RELIEF GRID</span>
                <span>{difficulty.rows}x{difficulty.cols} // {difficulty.debts} DEBT</span>
              </div>

              <div className="minesModeRow">
                {difficulties.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`minesModeButton uiFont ${item.key === difficultyKey ? "active" : ""}`}
                    onClick={() => setDifficultyKey(item.key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="minesGridWrap">
                <div
                  className="minesGrid"
                  style={{
                    gridTemplateColumns: `repeat(${difficulty.cols}, var(--mines-cell-size))`,
                    gridTemplateRows: `repeat(${difficulty.rows}, var(--mines-cell-size))`,
                  }}
                  onContextMenu={(event) => event.preventDefault()}
                >
                  {board.map((cell) => {
                    const showDebt = cell.isDebt && (cell.isOpen || status === "lost");
                    const classes = [
                      "minesCell",
                      cell.isOpen ? "open" : "",
                      cell.isFlagged ? "flagged" : "",
                      showDebt ? "debt" : "",
                      cell.isOpen && !cell.isDebt && cell.adjacent > 0 ? `n${cell.adjacent}` : "",
                    ].filter(Boolean).join(" ");

                    return (
                      <button
                        key={cell.id}
                        type="button"
                        className={classes}
                        onClick={() => handleCellClick(cell.id)}
                        onContextMenu={(event) => handleContextMenu(event, cell.id)}
                        onPointerDown={() => handlePointerDown(cell.id)}
                        onPointerUp={clearPointer}
                        onPointerLeave={clearPointer}
                        aria-label={showDebt ? "Debt" : cell.isFlagged ? "Marked debt" : cell.isOpen ? `Safe ${cell.adjacent}` : "Hidden cell"}
                      >
                        {showDebt ? <span className="minesDebtTag uiFont">DEBT</span> : null}
                        {!showDebt && cell.isFlagged ? <span className="minesFlagTag uiFont">DRB</span> : null}
                        {!showDebt && !cell.isFlagged && cell.isOpen && cell.adjacent > 0 ? cell.adjacent : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="minesInfo panelPlate">
              <div className="panelBar uiFont">
                <span>HOW IT WORKS</span>
                <span>TAP GUIDE</span>
              </div>
              <div className="minesInfoBody">
                <div className="minesInfoBlock">
                  <p className="minesInfoLabel uiFont">GAME LOGIC</p>
                  <p className="minesInfoText">Each hidden mine is replaced by a <strong>DEBT</strong> cell. The number on an opened cell shows how many debt cells touch it.</p>
                </div>
                <div className="minesInfoBlock">
                  <p className="minesInfoLabel uiFont">CONTROLS</p>
                  <ul className="minesInfoList">
                    <li><strong>Click / tap</strong> to open a cell.</li>
                    <li><strong>Right click</strong> or <strong>long press</strong> to mark a debt cell.</li>
                    <li>Open every safe cell to win the run.</li>
                  </ul>
                </div>
                <div className="minesLegend uiFont">
                  <div><span className="legendChip debt">DEBT</span> hidden trap</div>
                  <div><span className="legendChip drb">DRB</span> your marker</div>
                  <div><span className="legendChip safe">1-8</span> nearby debt count</div>
                </div>
                <Link href="/" className="uiButton uiFont minesButtonGhost">RETURN HOME</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
