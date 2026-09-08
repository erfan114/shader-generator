import { COMPARISON_KIND } from "@/builder/nodes/comparison/common.js";
import {
  neq,
  NOT_EQUAL_OPERATOR,
} from "@/builder/nodes/comparison/neq.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("neq", () => {
  it(`should create a comparison node with operator ${NOT_EQUAL_OPERATOR}`, () => {
    const result = neq(
      value({ type: DATATYPE.FLOAT, data: 1 }),
      value({ type: DATATYPE.FLOAT, data: 2 }),
    );

    expect(result.data.operator).toBe(NOT_EQUAL_OPERATOR);
    expect(result.kind).toBe(COMPARISON_KIND);
  });
});
