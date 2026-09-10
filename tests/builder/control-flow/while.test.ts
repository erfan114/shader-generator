import { isBuilderNode } from "@/builder/node.js";
import { while_, WHILE_KIND } from "@/builder/nodes/control-flow/while.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { lt, gt } from "@/index.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("while", () => {
  it("should create a builder node with kind 'while'", () => {
    const myWhile = while_({
      expression: value({ type: DATATYPE.BOOL, data: true }),
      body: function* () {},
    });

    expect(myWhile.kind).toBe(WHILE_KIND);
  });

  it("should be recognized by isBuilderNode", () => {
    const myWhile = while_({
      expression: value({ type: DATATYPE.BOOL, data: true }),
      body: function* () {},
    });

    expect(isBuilderNode(myWhile)).toBe(true);
  });

  it("should support body function", () => {
    const myWhile = while_({
      expression: value({ type: DATATYPE.BOOL, data: true }),
      body: function* () {
        // body can contain statements
      },
    });

    expect(myWhile.data.body).toBeTypeOf("function");
  });

  it("should support lt comparison expression", () => {
    const myWhile = while_({
      expression: lt(
        value({ type: DATATYPE.INT, data: 1 }),
        value({ type: DATATYPE.INT, data: 10 }),
      ),
      body: function* () {},
    });

    expect(myWhile.data.expression).toBeDefined();
  });

  it("should support gt comparison expression", () => {
    const myWhile = while_({
      expression: gt(
        value({ type: DATATYPE.INT, data: 10 }),
        value({ type: DATATYPE.INT, data: 1 }),
      ),
      body: function* () {},
    });

    expect(myWhile.data.expression).toBeDefined();
  });
});
