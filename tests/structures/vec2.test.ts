import { describe, expect, it } from "vitest";

import { isVec2, vec2 } from "@/structures/vec2.structure.js";

describe("Vec2", () => {
  it("should create within one scalar", () => {
    const v = 20;

    expect(vec2(v)).toStrictEqual([v, v]);
  });

  it("should create within two args", () => {
    const x = 10;
    const y = 20;

    expect(vec2(x, y)).toStrictEqual([x, y]);
  });

  it("should pass 'isVec2'", () => {
    const myVec = vec2(10);
    const invalidEntries = ["test", 10, null, undefined];

    expect(isVec2(myVec)).toBe(true);

    for (const invalidEntry of invalidEntries) {
      expect(isVec2(invalidEntry)).toBe(false);
    }
  });
});
