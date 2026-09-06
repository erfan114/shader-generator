import { vec3 } from "@/index.js";
import { matrix2x3 } from "@/structures/matrix2x3.structure.js";
import { describe, expect, it } from "vitest";

describe("Matrix2x3", () => {
  it("should create with two vec3", () => {
    const firstVec = vec3(1, 2, 3);
    const secondVec = vec3(4, 5, 6);
    const myMatrix = matrix2x3(firstVec, secondVec);

    expect(myMatrix).toStrictEqual([firstVec, secondVec]);
  });

  it("should create with six scalar", () => {
    const args = [1, 2, 3, 4, 5, 6] as const;
    const myMatrix = matrix2x3(...args);

    expect(myMatrix).toStrictEqual([
      [args[0], args[1], args[2]],
      [args[3], args[4], args[5]],
    ]);
  });
});
