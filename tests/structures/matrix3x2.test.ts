import { vec2 } from "@/index.js";
import { matrix3x2 } from "@/structures/matrix3x2.structure.js";
import { describe, expect, it } from "vitest";

describe("Matrix3x2", () => {
  it("should create within three vec2", () => {
    const firstVec = vec2(1, 2);
    const secondVec = vec2(3, 4);
    const thirdVec = vec2(5, 6);
    const myMatrix = matrix3x2(firstVec, secondVec, thirdVec);

    expect(myMatrix).toStrictEqual([firstVec, secondVec, thirdVec]);
  });

  it("should create with six scalar", () => {
    const args = [1, 2, 3, 4, 5, 6] as const;
    const myMatrix = matrix3x2(...args);

    expect(myMatrix).toStrictEqual([
      [args[0], args[1]],
      [args[2], args[3]],
      [args[4], args[5]],
    ]);
  });
});
