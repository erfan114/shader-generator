import { vec3 } from "@/index.js";
import { matrix4x3 } from "@/structures/matrix4x3.structure.js";
import { describe, expect, it } from "vitest";

describe("Matrix4x3", () => {
  it("should create within four vec3", () => {
    const firstVec = vec3(1, 2, 3);
    const secondVec = vec3(4, 5, 6);
    const thirdVec = vec3(7, 8, 9);
    const fourthVec = vec3(10, 11, 12);
    const myMatrix = matrix4x3(firstVec, secondVec, thirdVec, fourthVec);

    expect(myMatrix).toStrictEqual([firstVec, secondVec, thirdVec, fourthVec]);
  });

  it("should create with twelve scalar", () => {
    const args = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
    const myMatrix = matrix4x3(...args);

    expect(myMatrix).toStrictEqual([
      [args[0], args[1], args[2]],
      [args[3], args[4], args[5]],
      [args[6], args[7], args[8]],
      [args[9], args[10], args[11]],
    ]);
  });
});
