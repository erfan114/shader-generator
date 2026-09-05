import { describe, expect, it } from "vitest";

import { vec2 } from "@/structures/vec2.structure.js";
import { vec3 } from "@/structures/vec3.structure.js";

describe("Vec3", () => {
  it("should create within three args", () => {
    const x = 10;
    const y = 20;
    const z = 30;

    expect(vec3(x, y, z)).toStrictEqual([x, y, z]);
  });

  it("should create within one vec2 and one scalar and reverse", () => {
    const x = 10;
    const y = vec2(20, 30);

    expect(vec3(x, y)).toStrictEqual([x, ...y]);
    expect(vec3(y, x)).toStrictEqual([...y, x]);
  });
});
