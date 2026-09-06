import { vec3 } from "@/index.js";
import { matrix3 } from "@/structures/matrix3.structure.js";
import { describe, expect, it } from "vitest";

describe("Matrix3", () => {
  it("should create within three vec3", () => {
    const firstVec = vec3(1, 2, 3);
    const secondVec = vec3(4, 5, 6);
    const thirdVec = vec3(7, 8, 9);
    const myMatrix = matrix3(firstVec, secondVec, thirdVec);

    expect(myMatrix).toStrictEqual([firstVec, secondVec, thirdVec]);
  });

  it("should create with nine scalar", () => {
    const args = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
    const myMatrix = matrix3(...args);

    expect(myMatrix).toStrictEqual([
      [args[0], args[1], args[2]],
      [args[3], args[4], args[5]],
      [args[6], args[7], args[8]],
    ]);
  });
});
