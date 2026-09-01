import { describe, expect, it } from "vitest";

import {
  NAME_GENERATOR_NAMING_PREFIX,
  createNameGenerator,
} from "../../src/builder/name.js";

describe("Name generator", () => {
  it("Generate unique names", () => {
    const nameGenerator = createNameGenerator();

    const lastTenNamesArray = nameGenerator.take(99999).toArray();
    const lastTenNamesSet = new Set(lastTenNamesArray);

    expect(lastTenNamesArray).toHaveLength(lastTenNamesSet.size);
  });

  it("Skip 10 names", () => {
    const nameGenerator = createNameGenerator();

    expect(nameGenerator.next().value).toBe(`${NAME_GENERATOR_NAMING_PREFIX}0`);
    expect(nameGenerator.next().value).toBe(`${NAME_GENERATOR_NAMING_PREFIX}1`);

    // The next generated name advances by 10.
    expect(nameGenerator.next(10).value).toBe(
      `${NAME_GENERATOR_NAMING_PREFIX}b`,
    );
  });

  it("should throw for negative offsets", () => {
    const nameGenerator = createNameGenerator();

    nameGenerator.next();

    expect(() => nameGenerator.next(0)).toThrow(RangeError);
  });
});
