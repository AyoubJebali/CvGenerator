import { describe, it, expect } from "vitest";
import { supabaseAdmin } from "@/app/lib/supabaseServer";

describe("Supabase Auth & User Database Health", () => {
  it("verifies SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY exist in environment", () => {
    expect(process.env.SUPABASE_URL).toBeDefined();
    expect(process.env.SUPABASE_URL?.length).toBeGreaterThan(0);
    expect(process.env.SUPABASE_SERVICE_ROLE_KEY).toBeDefined();
    expect(process.env.SUPABASE_SERVICE_ROLE_KEY?.length).toBeGreaterThan(0);
  });

  it("successfully connects to Supabase and probes the 'users' table", async () => {
    const startTime = Date.now();
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("id")
      .limit(1);

    const latency = Date.now() - startTime;

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(Array.isArray(data)).toBe(true);

    // Verify response latency
    expect(latency).toBeLessThan(4000);
  });
});
