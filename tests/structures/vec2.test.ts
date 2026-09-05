import { describe, expect, it } from "vitest";

import { isVec2, vec2 } from "@/structures/vec2.structure.js";

describe("Vec2", () => {
  it("should create within two args", () => {
    const x = 10;
    const y = 20;

    expect(vec2(x, y)).toStrictEqual([x, y]);
  });

  it("should create within one arg", () => {
    const v = 20;

    expect(vec2(v)).toStrictEqual([v, v]);
  });

  it("should pass 'isVec2'", () => {
    const myVec = vec2(10);
    const invalidVec2List = ["test", 10, null, undefined];

    expect(isVec2(myVec)).toBe(true);

    for (const invalid of invalidVec2List) {
      expect(isVec2(invalid)).toBe(false);
    }
  });
});
