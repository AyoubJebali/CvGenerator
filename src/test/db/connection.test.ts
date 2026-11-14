import { describe, it, expect } from "vitest";
import { db } from "@/app/lib/db/drizzle";
import { sql } from "drizzle-orm";

describe("Database Connection & Health Probe", () => {
  it("verifies DATABASE_URL is defined in environment", () => {
    expect(process.env.DATABASE_URL).toBeDefined();
    expect(process.env.DATABASE_URL?.length).toBeGreaterThan(0);
  });

  it("successfully connects and executes ping query (SELECT 1)", async () => {
    const startTime = Date.now();
    const result = await db.execute(sql`SELECT 1 as alive;`);
    const latency = Date.now() - startTime;

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(Number((result[0] as any).alive)).toBe(1);

    // Verify response latency is healthy (under 3000ms for cloud DB)
    expect(latency).toBeLessThan(3000);
  });

  it("retrieves PostgreSQL version to confirm active database engine", async () => {
    const result = await db.execute(sql`SELECT version();`);
    expect(result).toBeDefined();
    expect(result.length).toBe(1);

    const versionStr = String((result[0] as any).version).toLowerCase();
    expect(versionStr).toContain("postgresql");
  });
});
