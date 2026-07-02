import { describe, expect, it } from "vitest";

import { assertSafeIntegrationDatabaseUrl } from "@/lib/testing/assert-safe-integration-database-url";

const postgresUrl = (authority: string, database: string) =>
  `postgresql://${authority}/${database}`;

describe("integration database safety guard", () => {
  it("accepts local test and ci database URLs", () => {
    expect(() =>
      assertSafeIntegrationDatabaseUrl(
        postgresUrl("qantara:qantara@localhost:55432", "qantara_ai_test"),
      ),
    ).not.toThrow();
    expect(() =>
      assertSafeIntegrationDatabaseUrl(
        postgresUrl("qantara@127.0.0.1:5432", "qantara_ci"),
      ),
    ).not.toThrow();
  });

  it("rejects remote, production-looking and invalid database URLs", () => {
    expect(() =>
      assertSafeIntegrationDatabaseUrl(
        postgresUrl("user:pass@prod.example.com:5432", "qantara"),
      ),
    ).toThrow("local PostgreSQL database");
    expect(() =>
      assertSafeIntegrationDatabaseUrl(
        postgresUrl("user:pass@localhost:5432", "qantara"),
      ),
    ).toThrow("test or ci database name");
    expect(() => assertSafeIntegrationDatabaseUrl("not-a-url")).toThrow(
      "valid PostgreSQL URL",
    );
  });
});
