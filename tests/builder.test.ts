import { describe, expect, it } from "vitest";

import { InputDeclaration } from "../src/builder/nodes/input.node.js";
import { MainDeclaration } from "../src/builder/nodes/main.node.js";
import { OutputDeclaration } from "../src/builder/nodes/output.node.js";
import { UniformDeclaration } from "../src/builder/nodes/uniform.node.js";
import {
  AVAILABLE_COMPILERS,
  type BuildTarget,
} from "../src/compiler/index.js";
import { Builder } from "../src/index.js";
import { DATATYPE } from "../src/types.js";

const BUILD_TARGETS = Object.keys(AVAILABLE_COMPILERS) as BuildTarget[];

describe("Builder", () => {
  it("creates a uniform", () => {
    const builder = new Builder();

    const uniform = builder.uniform({
      name: "myUniform",
      type: DATATYPE.FLOAT,
    });

    expect(uniform).toBeInstanceOf(UniformDeclaration);
  });

  it("creates an input", () => {
    const builder = new Builder();

    const input = builder.input({
      name: "myInput",
      type: DATATYPE.FLOAT,
    });

    expect(input).toBeInstanceOf(InputDeclaration);
  });

  it("creates an output", () => {
    const builder = new Builder();

    const output = builder.output({
      name: "myOutput",
      type: DATATYPE.FLOAT,
    });

    expect(output).toBeInstanceOf(OutputDeclaration);
  });

  it("creates main", () => {
    const builder = new Builder();

    const main = builder.main();

    expect(main).toBeInstanceOf(MainDeclaration);
  });

  it("main is singleton", () => {
    const builder = new Builder();

    const main1 = builder.main();
    const main2 = builder.main();

    expect(main1).toStrictEqual(main2);
  });

  it("throws error when main is not defined", () => {
    const builder = new Builder();

    for (const target of BUILD_TARGETS) {
      expect(() => builder.build(target)).toThrow();
    }
  });
});
