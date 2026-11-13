import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }),
    useSearchParams: () => new URLSearchParams(),
    usePathname: () => "/",
    useParams: () => ({}),
    redirect: vi.fn((url: string) => {
      const err = new Error(`NEXT_REDIRECT:${url}`);
      (err as any).digest = `NEXT_REDIRECT;${url}`;
      throw err;
    }),
    notFound: vi.fn(() => {
      const err = new Error("NEXT_NOT_FOUND");
      (err as any).digest = "NEXT_NOT_FOUND";
      throw err;
    }),
  };
});

// Polyfill ResizeObserver for JSDOM
if (typeof window !== "undefined") {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
