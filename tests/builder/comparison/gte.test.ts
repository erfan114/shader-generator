import { COMPARISON_KIND } from "@/builder/nodes/comparison/common.js";
import {
  GREATER_THAN_EQUAL_OPERATOR,
  gte,
} from "@/builder/nodes/comparison/gte.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("gte", () => {
  it(`should create a comparison node with operator ${GREATER_THAN_EQUAL_OPERATOR}`, () => {
    const result = gte(
      value({ type: DATATYPE.FLOAT, data: 1 }),
      value({ type: DATATYPE.FLOAT, data: 2 }),
    );

    expect(result.data.operator).toBe(GREATER_THAN_EQUAL_OPERATOR);
    expect(result.kind).toBe(COMPARISON_KIND);
  });
});
