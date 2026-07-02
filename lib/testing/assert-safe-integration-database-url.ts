const localHosts = new Set(["localhost", "127.0.0.1"]);
const safeDatabaseNamePattern = /(?:^|_)(test|ci)(?:$|_)/i;

export function assertSafeIntegrationDatabaseUrl(url: string) {
  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    throw new Error("DATABASE_URL must be a valid PostgreSQL URL.");
  }

  const databaseName = parsed.pathname.replace("/", "");

  if (!localHosts.has(parsed.hostname)) {
    throw new Error(
      "Integration tests require a local PostgreSQL database, not a remote host.",
    );
  }

  if (!safeDatabaseNamePattern.test(databaseName)) {
    throw new Error(
      "Integration tests require a test or ci database name before cleanup.",
    );
  }
}
