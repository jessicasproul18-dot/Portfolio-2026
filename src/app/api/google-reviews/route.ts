import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 3600;

type GoogleReviewsResponse = {
  reviews?: unknown[];
  [k: string]: unknown;
};

function readApiEndpointFromPublicConfig(): string {
  const configPath = path.join(process.cwd(), "public", "config.json");
  const raw = fs.readFileSync(configPath, "utf8");
  const parsed = JSON.parse(raw) as { api_endpoint?: unknown };
  return typeof parsed.api_endpoint === "string" ? parsed.api_endpoint.trim() : "";
}

function readAmpApiKeyFromPhpConfig(): string {
  const configPhpPath = path.join(process.cwd(), "public_html", "config.php");
  const raw = fs.readFileSync(configPhpPath, "utf8");

  // Matches: define('AMP_API_KEY', '...key...');
  const match = raw.match(
    /define\s*\(\s*['"]AMP_API_KEY['"]\s*,\s*['"]([^'"]+)['"]\s*\)\s*;/i,
  );
  return match?.[1]?.trim() ?? "";
}

export async function GET() {
  let apiEndpoint = "";
  let ampApiKey = "";

  try {
    apiEndpoint = readApiEndpointFromPublicConfig();
    ampApiKey = readAmpApiKeyFromPhpConfig();
  } catch {
    return NextResponse.json(
      { success: false, error: "Server configuration error" },
      { status: 500 },
    );
  }

  if (!apiEndpoint) {
    return NextResponse.json(
      { success: false, error: "Missing api_endpoint in public/config.json" },
      { status: 400 },
    );
  }

  if (!ampApiKey) {
    return NextResponse.json(
      { success: false, error: "Server configuration error" },
      { status: 500 },
    );
  }

  try {
    const upstream = await fetch(apiEndpoint, {
      headers: {
        "AMP-API-KEY": ampApiKey,
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    const text = await upstream.text();
    const json = (() => {
      try {
        return JSON.parse(text) as GoogleReviewsResponse;
      } catch {
        return null;
      }
    })();

    if (!upstream.ok) {
      return NextResponse.json(
        { success: false, error: "Upstream error", upstream: json ?? text },
        { status: upstream.status },
      );
    }

    if (!json || typeof json !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid JSON from upstream" },
        { status: 502 },
      );
    }

    return NextResponse.json(json, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, error: "Network error" }, { status: 502 });
  }
}
