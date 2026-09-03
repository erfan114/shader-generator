import { describe, expect, it } from "vitest";

import { createCounter } from "@/counter.js";

describe("Counter", () => {
  it("should use zero as first", () => {
    const counter = createCounter();

    expect(counter.next().value).toBe(0);
  });

  it("should skip steps", () => {
    const counter = createCounter();

    expect(counter.next().value).toBe(0);
    expect(counter.next(5).value).toBe(5);
    expect(counter.next(10).value).toBe(15);
    expect(counter.next().value).toBe(16);
  });

  it("minimum should be zero", () => {
    const counter = createCounter();

    expect(counter.next().value).toBe(0);
    expect(counter.next().value).toBe(1);
    expect(counter.next(-1).value).toBe(0);
    expect(counter.next(-1).value).toBe(0);
    expect(counter.next(-50).value).toBe(0);
  });
});
