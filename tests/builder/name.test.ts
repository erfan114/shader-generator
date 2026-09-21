import { describe, expect, it } from "vitest";

import {
  NAME_GENERATOR_DEFAULT_PREFIX,
  createNameGenerator,
} from "@/compiler/name.js";

describe("Name generator", () => {
  it("Generate unique names", () => {
    const nameGenerator = createNameGenerator();

    const namesArray = Array.from({ length: 9999 }).map(() =>
      nameGenerator.generate(),
    );
    const namesSet = new Set(namesArray);

    expect(namesArray).toHaveLength(namesSet.size);
  });

  it("Skip 10 names", () => {
    const nameGenerator = createNameGenerator();

    expect(nameGenerator.generate()).toBe(`${NAME_GENERATOR_DEFAULT_PREFIX}0`);
    expect(nameGenerator.generate()).toBe(`${NAME_GENERATOR_DEFAULT_PREFIX}1`);
  });
});
