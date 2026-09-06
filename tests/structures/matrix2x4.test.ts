import { vec4 } from "@/index.js";
import { matrix2x4 } from "@/structures/matrix2x4.structure.js";
import { describe, expect, it } from "vitest";

describe("Matrix2x4", () => {
  it("should create with two vec4", () => {
    const firstVec = vec4(1, 2, 3, 4);
    const secondVec = vec4(5, 6, 7, 8);
    const myMatrix = matrix2x4(firstVec, secondVec);

    expect(myMatrix).toStrictEqual([firstVec, secondVec]);
  });

  it("should create with eight scalar", () => {
    const args = [1, 2, 3, 4, 5, 6, 7, 8] as const;
    const myMatrix = matrix2x4(...args);

    expect(myMatrix).toStrictEqual([
      [args[0], args[1], args[2], args[3]],
      [args[4], args[5], args[6], args[7]],
    ]);
  });
});
