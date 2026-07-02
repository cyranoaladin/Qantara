import { describe, expect, it } from "vitest";

import { assertSafeIntegrationDatabaseUrl } from "@/lib/testing/assert-safe-integration-database-url";

type Protocol = "postgresql" | "postgres" | "mysql" | "mongodb" | "http" | "https";

const databaseUrl = (protocol: Protocol, authority: string, database: string) =>
  `${protocol}://${authority}/${database}`;

const credentialedAuthority = (host: string) => `${["user", "pass"].join(":")}@${host}`;

describe("integration database safety guard", () => {
  it("accepts PostgreSQL protocols for local test and ci database URLs", () => {
    expect(() =>
      assertSafeIntegrationDatabaseUrl(
        databaseUrl(
          "postgresql",
          credentialedAuthority("localhost:55432"),
          "qantara_ai_test",
        ),
      ),
    ).not.toThrow();
    expect(() =>
      assertSafeIntegrationDatabaseUrl(
        databaseUrl("postgres", "qantara@127.0.0.1:5432", "qantara_ci"),
      ),
    ).not.toThrow();
  });

  it("rejects non-PostgreSQL protocols", () => {
    for (const protocol of ["mysql", "mongodb", "http", "https"] as const) {
      expect(() =>
        assertSafeIntegrationDatabaseUrl(
          databaseUrl(protocol, "localhost:5432", "qantara_test"),
        ),
      ).toThrow("PostgreSQL DATABASE_URL");
    }
  });

  it("accepts loopback hosts only, including IPv6 loopback", () => {
    for (const host of ["localhost:5432", "127.0.0.1:5432", "[::1]:5432"]) {
      expect(() =>
        assertSafeIntegrationDatabaseUrl(
          databaseUrl("postgresql", host, "qantara_ai_test"),
        ),
      ).not.toThrow();
    }
  });

  it("rejects remote hosts even when the database name is test-like", () => {
    for (const host of [
      "prod.example.com:5432",
      "db.internal:5432",
      "qantara-db-prod.example.com:5432",
    ]) {
      expect(() =>
        assertSafeIntegrationDatabaseUrl(
          databaseUrl("postgresql", credentialedAuthority(host), "qantara_test"),
        ),
      ).toThrow("local PostgreSQL database");
    }
  });

  it("rejects local production-looking database names", () => {
    for (const database of ["qantara", "qantara_prod", "production", "qantara_ai"]) {
      expect(() =>
        assertSafeIntegrationDatabaseUrl(
          databaseUrl("postgresql", "localhost:5432", database),
        ),
      ).toThrow("test or ci database name");
    }
  });

  it("rejects invalid URLs and URLs without a protocol", () => {
    expect(() =>
      assertSafeIntegrationDatabaseUrl("//localhost:5432/qantara_test"),
    ).toThrow("valid PostgreSQL URL");
    expect(() => assertSafeIntegrationDatabaseUrl("not-a-url")).toThrow(
      "valid PostgreSQL URL",
    );
  });
});
