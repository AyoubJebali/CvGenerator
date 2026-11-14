import { describe, it, expect } from "vitest";
import { db } from "@/app/lib/db/drizzle";
import { sql } from "drizzle-orm";

describe("Database Schema Integrity", () => {
  it("verifies the 'resumes' table exists in public schema", async () => {
    const result = await db.execute(
      sql`SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = 'resumes';`
    );

    expect(result.length).toBe(1);
    expect((result[0] as any).table_name).toBe("resumes");
  });

  it("verifies required columns and data types exist in 'resumes' table", async () => {
    const columns = await db.execute(
      sql`SELECT column_name, data_type, is_nullable 
          FROM information_schema.columns 
          WHERE table_schema = 'public' AND table_name = 'resumes';`
    );

    const columnMap = new Map<string, { dataType: string; isNullable: string }>();
    for (const col of columns) {
      columnMap.set((col as any).column_name, {
        dataType: (col as any).data_type,
        isNullable: (col as any).is_nullable,
      });
    }

    // Required columns
    expect(columnMap.has("id")).toBe(true);
    expect(columnMap.get("id")?.dataType).toBe("uuid");

    expect(columnMap.has("name")).toBe(true);
    expect(columnMap.get("name")?.dataType).toBe("text");

    expect(columnMap.has("user_id")).toBe(true);
    expect(columnMap.get("user_id")?.dataType).toBe("uuid");
    expect(columnMap.get("user_id")?.isNullable).toBe("NO");

    expect(columnMap.has("resume_data")).toBe(true);
    expect(columnMap.get("resume_data")?.dataType).toBe("jsonb");
    expect(columnMap.get("resume_data")?.isNullable).toBe("NO");

    expect(columnMap.has("last_modified")).toBe(true);
    expect(columnMap.get("last_modified")?.dataType).toContain("timestamp");
  });
});
