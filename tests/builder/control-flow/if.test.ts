import { isBuilderNode } from "@/builder/node.js";
import { if_, IF_KIND } from "@/builder/nodes/control-flow/if.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { lt, gt } from "@/index.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("if", () => {
  it("should create a builder node with kind 'if'", () => {
    const myIf = if_({
      expression: value({ type: DATATYPE.BOOL, data: true }),
      body: function* () {},
    });

    expect(myIf.kind).toBe(IF_KIND);
  });

  it("should be recognized by isBuilderNode", () => {
    const myIf = if_({
      expression: value({ type: DATATYPE.BOOL, data: true }),
      body: function* () {},
    });

    expect(isBuilderNode(myIf)).toBe(true);
  });

  it("should support body function", () => {
    const myIf = if_({
      expression: value({ type: DATATYPE.BOOL, data: true }),
      body: function* () {
        // body can contain statements
      },
    });

    expect(myIf.data.body).toBeTypeOf("function");
  });

  it("should support lt comparison expression", () => {
    const myIf = if_({
      expression: lt(
        value({ type: DATATYPE.INT, data: 1 }),
        value({ type: DATATYPE.INT, data: 10 }),
      ),
      body: function* () {},
    });

    expect(myIf.data.expression).toBeDefined();
  });

  it("should support gt comparison expression", () => {
    const myIf = if_({
      expression: gt(
        value({ type: DATATYPE.INT, data: 10 }),
        value({ type: DATATYPE.INT, data: 1 }),
      ),
      body: function* () {},
    });

    expect(myIf.data.expression).toBeDefined();
  });
});
