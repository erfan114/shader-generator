import { isBuilderNode } from "@/builder/node.js";
import { do_, DO_KIND } from "@/builder/nodes/control-flow/do.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { lt } from "@/index.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("do", () => {
  it("should create a builder node with kind 'do'", () => {
    const myDo = do_({
      expression: value({ type: DATATYPE.BOOL, data: true }),
      body: function* () {},
    });

    expect(myDo.kind).toBe(DO_KIND);
  });

  it("should be recognized by isBuilderNode", () => {
    const myDo = do_({
      expression: value({ type: DATATYPE.BOOL, data: true }),
      body: function* () {},
    });

    expect(isBuilderNode(myDo)).toBe(true);
  });

  it("should support body function", () => {
    const myDo = do_({
      expression: value({ type: DATATYPE.BOOL, data: true }),
      body: function* () {
        // body can contain statements
      },
    });

    expect(myDo.data.body).toBeTypeOf("function");
  });

  it("should support comparison expression", () => {
    const myDo = do_({
      expression: lt(
        value({ type: DATATYPE.INT, data: 1 }),
        value({ type: DATATYPE.INT, data: 10 }),
      ),
      body: function* () {},
    });

    expect(myDo.data.expression).toBeDefined();
  });
});
