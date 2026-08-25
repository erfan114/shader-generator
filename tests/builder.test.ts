import { describe, expect, it } from "vitest";

import { InputObject } from "../src/builder/objects/input.object.js";
import { OutputObject } from "../src/builder/objects/output.object.js";
import { UniformObject } from "../src/builder/objects/uniform.object.js";
import { Builder } from "../src/index.js";
import { DATATYPE } from "../src/types.js";

describe("Builder", () => {
  it("creates a uniform", () => {
    const builder = new Builder();

    const uniform = builder.uniform({
      name: "myUniform",
      type: DATATYPE.FLOAT,
    });

    expect(uniform).toBeInstanceOf(UniformObject);
  });

  it("creates an input", () => {
    const builder = new Builder();

    const input = builder.input({
      name: "myInput",
      type: DATATYPE.FLOAT,
    });

    expect(input).toBeInstanceOf(InputObject);
  });

  it("creates an output", () => {
    const builder = new Builder();

    const output = builder.output({
      name: "myOutput",
      type: DATATYPE.FLOAT,
    });

    expect(output).toBeInstanceOf(OutputObject);
  });
});
