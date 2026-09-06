import { vec2 } from "@/index.js";
import { matrix4x2 } from "@/structures/matrix4x2.structure.js";
import { describe, expect, it } from "vitest";

describe("Matrix4x2", () => {
  it("should create within four vec2", () => {
    const firstVec = vec2(1, 2);
    const secondVec = vec2(3, 4);
    const thirdVec = vec2(5, 6);
    const fourthVec = vec2(7, 8);
    const myMatrix = matrix4x2(firstVec, secondVec, thirdVec, fourthVec);

    expect(myMatrix).toStrictEqual([firstVec, secondVec, thirdVec, fourthVec]);
  });

  it("should create with eight scalar", () => {
    const args = [1, 2, 3, 4, 5, 6, 7, 8] as const;
    const myMatrix = matrix4x2(...args);

    expect(myMatrix).toStrictEqual([
      [args[0], args[1]],
      [args[2], args[3]],
      [args[4], args[5]],
      [args[6], args[7]],
    ]);
  });
});
