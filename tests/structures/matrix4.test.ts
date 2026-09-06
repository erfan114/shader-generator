import { vec4 } from "@/index.js";
import { matrix4 } from "@/structures/matrix4.structure.js";
import { describe, expect, it } from "vitest";

describe("Matrix4", () => {
  it("should create within four vec4", () => {
    const firstVec = vec4(1, 2, 3, 4);
    const secondVec = vec4(5, 6, 7, 8);
    const thirdVec = vec4(9, 10, 11, 12);
    const fourthVec = vec4(13, 14, 15, 16);
    const myMatrix = matrix4(firstVec, secondVec, thirdVec, fourthVec);

    expect(myMatrix).toStrictEqual([firstVec, secondVec, thirdVec, fourthVec]);
  });

  it("should create with sixteen scalar", () => {
    const args = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    ] as const;
    const myMatrix = matrix4(...args);

    expect(myMatrix).toStrictEqual([
      [args[0], args[1], args[2], args[3]],
      [args[4], args[5], args[6], args[7]],
      [args[8], args[9], args[10], args[11]],
      [args[12], args[13], args[14], args[15]],
    ]);
  });
});
