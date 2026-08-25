import { describe, expect, it } from "vitest";

import { MainObject } from "../src/builder/objects/main.object.js";
import { VariableObject } from "../src/builder/objects/variable.object.js";
import { DATATYPE } from "../src/types.js";

describe("Main", () => {
  it("creates a variable", () => {
    const main = new MainObject();
    const variable = main.variable({
      name: "myVar",
      type: DATATYPE.BOOL,
      value: false,
    });

    expect(variable).toBeInstanceOf(VariableObject);
  });
});
