import { describe, expect, it } from "vitest";

import { variable } from "../src/builder/objects/variable.object.js";
import { DATATYPE } from "../src/types.js";

describe("Variable", () => {
  it("creates without error", () => {
    const myVar = variable({
      name: "myVar",
      type: DATATYPE.BOOL,
      value: false,
    });

    expect(myVar).toBeTruthy();
  });
});
