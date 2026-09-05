import { describe, expect, it } from "vitest";

import { vec2 } from "@/structures/vec2.structure.js";
import { vec3 } from "@/structures/vec3.structure.js";
import { isVec4, vec4 } from "@/structures/vec4.structure.js";

describe("Vec4", () => {
  it("should create within one scalar", () => {
    const value = 10;

    expect(vec4(value)).toStrictEqual([value, value, value, value]);
  });

  it("should create within four scalars", () => {
    const x = 10;
    const y = 20;
    const z = 30;
    const w = 40;

    expect(vec4(x, y, z, w)).toStrictEqual([x, y, z, w]);
  });

  it("should create within one vec3 and one scalar and reverse", () => {
    const x = 10;
    const y = vec3(20, 30, 40);

    expect(vec4(x, y)).toStrictEqual([x, ...y]);
    expect(vec4(y, x)).toStrictEqual([...y, x]);
  });

  it("should create within two vec2s", () => {
    const x = vec2(10, 20);
    const y = vec2(30, 40);

    expect(vec4(x, y)).toStrictEqual([...x, ...y]);
  });

  it("should create within two scalars and one vec2", () => {
    const x = 10;
    const y = 20;
    const z = vec2(30, 40);

    expect(vec4(x, y, z)).toStrictEqual([x, y, ...z]);
  });

  it("should create within a scalar, vec2, and scalar", () => {
    const x = 10;
    const y = vec2(20, 30);
    const z = 40;

    expect(vec4(x, y, z)).toStrictEqual([x, ...y, z]);
  });

  it("should create within a vec2 and two scalars", () => {
    const x = vec2(10, 20);
    const y = 30;
    const z = 40;

    expect(vec4(x, y, z)).toStrictEqual([...x, y, z]);
  });

  it("should throw when two arguments are invalid", () => {
    expect(() =>
      // @ts-expect-error
      vec4(10, 20),
    ).throws(TypeError);
  });

  it("should throw when three arguments are invalid", () => {
    expect(() =>
      // @ts-expect-error
      vec4(10, 20, 30),
    ).throws(TypeError);
  });

  it("should pass 'isVec4'", () => {
    const myVec = vec4(10);
    const invalidEntries = [
      "test",
      10,
      null,
      undefined,
      vec2(10),
      vec3(10),
      [10, 20, 30],
      [10, 20, 30, 40, 50],
    ];

    expect(isVec4(myVec)).toBe(true);

    for (const invalidEntry of invalidEntries) {
      expect(isVec4(invalidEntry)).toBe(false);
    }
  });
});
