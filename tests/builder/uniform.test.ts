import { describe, expect, it } from "vitest";

import { uniform } from "../../src/index.js";
import { DATATYPE } from "../../src/types.js";

describe("Uniform", () => {
  it("Should alias its name", () => {
    const ALIAS_NAME = "uniform1";

    const targetUniform = uniform({ type: DATATYPE.FLOAT });

    expect(targetUniform.data.name).toBeUndefined();

    const aliasedUniform = targetUniform.as(ALIAS_NAME);

    expect(aliasedUniform.data.name).toBe(ALIAS_NAME);
  });
});
