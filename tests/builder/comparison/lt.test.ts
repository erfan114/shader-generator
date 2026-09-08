import { COMPARISON_KIND } from "@/builder/nodes/comparison/common.js";
import { LESS_THAN_OPERATOR, lt } from "@/builder/nodes/comparison/lt.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("lt", () => {
  it(`should create a comparison node with operator ${LESS_THAN_OPERATOR}`, () => {
    const result = lt(
      value({ type: DATATYPE.FLOAT, data: 1 }),
      value({ type: DATATYPE.FLOAT, data: 2 }),
    );

    expect(result.data.operator).toBe(LESS_THAN_OPERATOR);
    expect(result.kind).toBe(COMPARISON_KIND);
  });
});
