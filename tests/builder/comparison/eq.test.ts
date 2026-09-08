import { COMPARISON_KIND } from "@/builder/nodes/comparison/common.js";
import { eq, EQUAL_OPERATOR } from "@/builder/nodes/comparison/eq.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { variable } from "@/builder/nodes/variable.node.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("eq", () => {
  it(`should create a comparison node with operator ${EQUAL_OPERATOR}`, () => {
    const result = eq(
      value({ type: DATATYPE.FLOAT, data: 1 }),
      value({ type: DATATYPE.FLOAT, data: 2 }),
    );

    expect(result.data.operator).toBe(EQUAL_OPERATOR);
    expect(result.kind).toBe(COMPARISON_KIND);
  });

  it("should accept two variables", () => {
    const v1 = variable({ type: DATATYPE.FLOAT }).assign(1);
    const v2 = variable({ type: DATATYPE.FLOAT }).assign(2);

    const result = eq(v1, v2);

    expect(result.data.left).toBe(v1);
    expect(result.data.right).toBe(v2);
    expect(result.data.operator).toBe(EQUAL_OPERATOR);
  });

  it("should work with BOOL type for eq", () => {
    const result = eq(
      value({ type: DATATYPE.BOOL, data: true }),
      value({ type: DATATYPE.BOOL, data: false }),
    );

    expect(result.data.operator).toBe(EQUAL_OPERATOR);
    expect(result.kind).toBe(COMPARISON_KIND);
  });
});
