import { describe, expect, it } from "vitest";

import { vec2 } from "@/structures/vec2.structure.js";

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
});
