import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { brandAssets, brandColors } from "@/lib/brand";

const root = process.cwd();

describe("Qantara AI brand assets", () => {
  it("exposes the official public brand asset paths", () => {
    expect(brandAssets.logoPrimary).toBe("/brand/qantara-ai-logo-primary.svg");
    expect(brandAssets.logoLight).toBe("/brand/qantara-ai-logo-light.svg");
    expect(brandAssets.logoMonochrome).toBe("/brand/qantara-ai-logo-monochrome.svg");
    expect(brandAssets.mark).toBe("/brand/qantara-ai-mark.svg");
    expect(brandAssets.favicon).toBe("/brand/qantara-ai-favicon.svg");
  });

  it("keeps all referenced SVG files available in public/brand", () => {
    for (const assetPath of Object.values(brandAssets)) {
      const filePath = join(root, "public", assetPath);
      expect(existsSync(filePath), `${assetPath} is missing`).toBe(true);
      expect(readFileSync(filePath, "utf8")).toContain("<svg");
    }
  });

  it("matches the official brand palette", () => {
    expect(brandColors.background).toBe("#050914");
    expect(brandColors.backgroundSoft).toBe("#08111F");
    expect(brandColors.card).toBe("#0B1220");
    expect(brandColors.cardAlt).toBe("#111827");
    expect(brandColors.foreground).toBe("#F8FAFC");
    expect(brandColors.muted).toBe("#94A3B8");
    expect(brandColors.primary).toBe("#22D3EE");
    expect(brandColors.primaryDark).toBe("#0891B2");
    expect(brandColors.secondary).toBe("#D6A85A");
    expect(brandColors.secondaryDark).toBe("#B9852F");
  });

  it("keeps the brand kit design tokens in docs", () => {
    const css = readFileSync(
      join(root, "docs/qantara_ai_brand_kit/qantara-ai-design-tokens.css"),
      "utf8",
    );

    expect(css).toContain("--qantara-background: #050914");
    expect(css).toContain("--qantara-primary: #22d3ee");
    expect(css).toContain("--qantara-secondary: #d6a85a");
  });
});
