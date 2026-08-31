import { describe, expect, it } from "vitest";

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

    const uniform = builder.global.createUniform({
      name: "myUniform",
      type: DATATYPE.FLOAT,
    });

    // TODO: Improve the tests to its instance
    expect(uniform).toBeInstanceOf(Object);
  });

  it("creates an input", () => {
    const builder = new Builder();

    const input = builder.global.createInput({
      name: "myInput",
      type: DATATYPE.FLOAT,
    });

    // TODO: Improve the tests to its instance
    expect(input).toBeInstanceOf(Object);
  });

  it("creates an output", () => {
    const builder = new Builder();

    const output = builder.global.createOutput({
      name: "myOutput",
      type: DATATYPE.FLOAT,
    });

    // TODO: Improve the tests to its instance
    expect(output).toBeInstanceOf(Object);
  });

  it("creates main", () => {
    const builder = new Builder();

    const main = builder.global.provideMain();

    // TODO: Improve the tests to its instance
    expect(main).toBeInstanceOf(Object);
  });

  it("main is singleton", () => {
    const builder = new Builder();

    const main1 = builder.global.provideMain();
    const main2 = builder.global.provideMain();

    expect(main1).toStrictEqual(main2);
  });

  it("throws error when main is not defined", () => {
    const builder = new Builder();

    for (const target of BUILD_TARGETS) {
      expect(() => builder.build(target)).toThrow();
    }
  });
});
