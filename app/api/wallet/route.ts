import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const WALLET_ADDRESS = "0xb1058c959987e3513600eb5b4fd82aeee2a0e4f9";
const BASE_RPC_URL = "https://mainnet.base.org";
const DEXSCREENER_PAIR_URL = "https://api.dexscreener.com/latest/dex/pairs/base/0x5116773e18a9c7bb03ebb961b38678e45e238923";
const COINGECKO_ETH_URL = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
const WETH_ADDRESS = "0x4200000000000000000000000000000000000006";

const FALLBACK = {
  // Safety snapshot only. Live values still come from Base RPC + DexScreener/ETH price.
  // Kept close to the current Grok wallet target balance for the UI while the API is syncing.
  drb: 3666666666.667,
  weth: 100,
  drbUsdPrice: 0.000075,
  wethUsdPrice: 3200,
  updated: "fallback",
  source: "fallback-snapshot",
};

function strip0x(value: string) {
  return value.replace(/^0x/i, "").toLowerCase();
}

function padHexAddress(address: string) {
  return strip0x(address).padStart(64, "0");
}

function hexToBigInt(hex: string) {
  return BigInt(hex || "0x0");
}

function formatUnits(raw: bigint, decimals: number) {
  if (!Number.isFinite(decimals) || decimals < 0) return Number(raw);
  const base = 10n ** BigInt(decimals);
  const whole = raw / base;
  const fraction = raw % base;
  if (fraction === 0n) return Number(whole);
  const fractionText = fraction.toString().padStart(decimals, "0").replace(/0+$/, "");
  return Number(`${whole.toString()}.${fractionText}`);
}

async function rpcCall(to: string, data: string) {
  const res = await fetch(BASE_RPC_URL, {
    method: "POST",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store, no-cache, max-age=0",
      pragma: "no-cache",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: `${Date.now()}-${Math.random()}`,
      method: "eth_call",
      params: [{ to, data }, "latest"],
    }),
  });

  const json = await res.json();
  if (json?.error) throw new Error(json.error.message || "RPC error");
  if (typeof json?.result !== "string") throw new Error("RPC result missing");
  return json.result;
}

async function getTokenDecimals(tokenAddress: string) {
  try {
    const result = await rpcCall(tokenAddress, "0x313ce567");
    return Number(hexToBigInt(result));
  } catch {
    return 18;
  }
}

async function getTokenBalance(tokenAddress: string, walletAddress: string, decimals: number) {
  const data = `0x70a08231${padHexAddress(walletAddress)}`;
  const result = await rpcCall(tokenAddress, data);
  return formatUnits(hexToBigInt(result), decimals);
}

async function getDrbTokenMeta() {
  try {
    const res = await fetch(DEXSCREENER_PAIR_URL, {
      cache: "no-store",
      headers: {
        "user-agent": "Mozilla/5.0",
        accept: "application/json",
        "cache-control": "no-store, no-cache, max-age=0",
      },
    });

    const data = await res.json();
    const pair = Array.isArray(data?.pairs) ? data.pairs[0] : null;
    const baseToken = pair?.baseToken ?? null;
    const quoteToken = pair?.quoteToken ?? null;

    const drbToken = [baseToken, quoteToken].find((token: any) => String(token?.symbol || "").toUpperCase() === "DRB") || baseToken;
    const priceUsd = Number(pair?.priceUsd ?? 0);

    return {
      address: typeof drbToken?.address === "string" ? drbToken.address : null,
      priceUsd: Number.isFinite(priceUsd) && priceUsd > 0 ? priceUsd : FALLBACK.drbUsdPrice,
    };
  } catch {
    return { address: null, priceUsd: FALLBACK.drbUsdPrice };
  }
}

async function getWethUsdPrice(): Promise<number> {
  try {
    const res = await fetch(COINGECKO_ETH_URL, {
      cache: "no-store",
      headers: {
        "user-agent": "Mozilla/5.0",
        accept: "application/json",
        "cache-control": "no-store, no-cache, max-age=0",
      },
    });

    const data = await res.json();
    const priceUsd = Number(data?.ethereum?.usd ?? 0);
    return Number.isFinite(priceUsd) && priceUsd > 0 ? priceUsd : FALLBACK.wethUsdPrice;
  } catch {
    return FALLBACK.wethUsdPrice;
  }
}

export async function GET() {
  const [{ address: drbTokenAddress, priceUsd: drbUsdPrice }, wethUsdPrice] = await Promise.all([
    getDrbTokenMeta(),
    getWethUsdPrice(),
  ]);

  try {
    if (!drbTokenAddress) throw new Error("DRB token address unavailable");

    const [wethDecimals, drbDecimals] = await Promise.all([
      getTokenDecimals(WETH_ADDRESS),
      getTokenDecimals(drbTokenAddress),
    ]);

    const [weth, drb] = await Promise.all([
      getTokenBalance(WETH_ADDRESS, WALLET_ADDRESS, wethDecimals),
      getTokenBalance(drbTokenAddress, WALLET_ADDRESS, drbDecimals),
    ]);

    return NextResponse.json(
      {
        ok: true,
        drb,
        weth,
        drbUsdPrice,
        wethUsdPrice,
        drbUsdValue: drb * drbUsdPrice,
        wethUsdValue: weth * wethUsdPrice,
        updated: new Date().toISOString(),
        source: "base-rpc + market-price",
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch {
    return NextResponse.json(
      {
        ok: true,
        ...FALLBACK,
        drbUsdValue: FALLBACK.drb * FALLBACK.drbUsdPrice,
        wethUsdValue: FALLBACK.weth * FALLBACK.wethUsdPrice,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  }
}
