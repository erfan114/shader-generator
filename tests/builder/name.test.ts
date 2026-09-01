import { describe, expect, it } from "vitest";

import { createNameGenerator } from "../../src/builder/name.js";

describe("Name generator", () => {
  it("Generate unique names", () => {
    const nameGenerator = createNameGenerator();

    const lastTenNamesArray = nameGenerator.take(99999).toArray();
    const lastTenNamesSet = new Set(lastTenNamesArray);

    expect(lastTenNamesArray).toHaveLength(lastTenNamesSet.size);
  });
});
