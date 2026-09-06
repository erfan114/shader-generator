import { vec4 } from "@/index.js";
import { matrix3x4 } from "@/structures/matrix3x4.structure.js";
import { describe, expect, it } from "vitest";

describe("Matrix3x4", () => {
  it("should create within three vec4", () => {
    const firstVec = vec4(1, 2, 3, 4);
    const secondVec = vec4(5, 6, 7, 8);
    const thirdVec = vec4(9, 10, 11, 12);
    const myMatrix = matrix3x4(firstVec, secondVec, thirdVec);

    expect(myMatrix).toStrictEqual([firstVec, secondVec, thirdVec]);
  });

  it("should create with twelve scalar", () => {
    const args = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
    const myMatrix = matrix3x4(...args);

    expect(myMatrix).toStrictEqual([
      [args[0], args[1], args[2], args[3]],
      [args[4], args[5], args[6], args[7]],
      [args[8], args[9], args[10], args[11]],
    ]);
  });
});
