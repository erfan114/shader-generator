import { describe, expect, it } from "vitest";

import { output } from "../../src/builder/nodes/output.node.js";
import { DATATYPE } from "../../src/types.js";

describe("Output", () => {
  it("Should alias its name", () => {
    const ALIAS_NAME = "output1";

    const targetOutput = output({ type: DATATYPE.FLOAT });

    expect(targetOutput.data.name).toBeUndefined();

    const aliasedOutput = targetOutput.as(ALIAS_NAME);

    expect(aliasedOutput.data.name).toBe(ALIAS_NAME);
  });
});
