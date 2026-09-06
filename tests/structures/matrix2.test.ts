import { vec2 } from "@/index.js";
import { matrix2 } from "@/structures/matrix2.structure.js";
import { describe, expect, it } from "vitest";

describe("Matrix2", () => {
  it("should create within two vec2", () => {
    const firstVec = vec2(1, 2);
    const secondVec = vec2(3, 4);
    const myMatrix = matrix2(firstVec, secondVec);

    expect(myMatrix).toStrictEqual([firstVec, secondVec]);
  });

  it("should create with four scalar", () => {
    const args = [1, 2, 3, 4] as const;
    const myMatrix = matrix2(...args);

    expect(myMatrix).toStrictEqual([
      [args[0], args[1]],
      [args[2], args[3]],
    ]);
  });
});
