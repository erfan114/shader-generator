import { describe, expect, it } from "vitest";

import { input } from "../../src/builder/nodes/input.node.js";
import { DATATYPE } from "../../src/types.js";

describe("Input", () => {
  it("Should alias its name", () => {
    const ALIAS_NAME = "input1";

    const targetInput = input({ type: DATATYPE.FLOAT });

    expect(targetInput.data.name).toBeUndefined();

    const aliasedInput = targetInput.as(ALIAS_NAME);

    expect(aliasedInput.data.name).toBe(ALIAS_NAME);
  });

  it("Should become flatten", () => {
    const targetInput = input({ type: DATATYPE.FLOAT });

    expect(targetInput.data.flatten).toBeUndefined();

    const flattenInput = targetInput.flat();

    expect(flattenInput.data.flatten).toBe(true);
  });
});
