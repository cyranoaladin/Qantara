import { readFileSync } from "node:fs";
import { join } from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ActionMessage } from "@/components/forms/FormStatus";
import { organizationJsonLd, siteConfig } from "@/lib/seo";

const root = process.cwd();

function readProjectFile(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("accessibility review regressions", () => {
  it("announces successful action messages politely and errors assertively", () => {
    const success = renderToStaticMarkup(
      createElement(ActionMessage, { message: "Message envoyé.", status: "success" }),
    );
    const error = renderToStaticMarkup(
      createElement(ActionMessage, {
        message: "Une erreur est survenue.",
        status: "error",
      }),
    );

    expect(success).toContain('role="status"');
    expect(error).toContain('role="alert"');
  });

  it("locks and restores document scrolling while the mobile menu is open", () => {
    const source = readProjectFile("components/layout/MobileNav.tsx");

    expect(source).toContain('document.body.style.overflow = "hidden"');
    expect(source).toContain('document.body.style.overflow = ""');
  });

  it("keeps gradient headings visible in forced-colors mode", () => {
    const css = readProjectFile("app/globals.css");

    expect(css).toMatch(/@media\s+\(forced-colors:\s*active\)\s*{[\s\S]*\.gradient-text/);
    expect(css).toMatch(
      /@media\s+\(forced-colors:\s*active\)\s*{[\s\S]*-webkit-text-fill-color:\s*CanvasText/,
    );
  });

  it("gives animated underlines the same visible state on keyboard focus", () => {
    const css = readProjectFile("app/globals.css");

    expect(css).toContain(".link-underline:hover::after,");
    expect(css).toContain(".link-underline:focus-visible::after");
  });

  it("uses the centralized LinkedIn URL for structured data", () => {
    const originalLinkedIn = siteConfig.linkedin;
    siteConfig.linkedin = "https://www.linkedin.com/company/qantara-ai-review";

    try {
      expect(organizationJsonLd().sameAs).toEqual([siteConfig.linkedin]);
    } finally {
      siteConfig.linkedin = originalLinkedIn;
    }
  });

  it("hides visible SVG SMIL motion elements for reduced-motion users", () => {
    const css = readProjectFile("app/globals.css");
    const heroIllustration = readProjectFile("components/visual/HeroIllustration.tsx");
    const sectionIllustration = readProjectFile(
      "components/visual/SectionIllustration.tsx",
    );

    expect(css).toMatch(
      /@media\s+\(prefers-reduced-motion:\s*reduce\)\s*{[\s\S]*\.motion-safe-smil\s*{[\s\S]*display:\s*none/,
    );
    expect(heroIllustration).toContain('className="motion-safe-smil"');
    expect(sectionIllustration).toContain('className="motion-safe-smil"');
  });
});
