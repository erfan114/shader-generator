import { describe, expect, it } from "vitest";

import { MainDeclaration } from "../src/builder/nodes/main.node.js";
import { DATATYPE } from "../src/types.js";

describe("Main", () => {
  it("creates a variable", () => {
    const main = new MainDeclaration();
    const variable = main.variable({
      name: "myVar",
      type: DATATYPE.BOOL,
      value: false,
    });

    expect(variable).toBeTruthy();
  });
});
