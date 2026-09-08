import { COMPARISON_KIND } from "@/builder/nodes/comparison/common.js";
import {
  LESS_THAN_EQUAL_OPERATOR,
  lte,
} from "@/builder/nodes/comparison/lte.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("lte", () => {
  it(`should create a comparison node with operator ${LESS_THAN_EQUAL_OPERATOR}`, () => {
    const result = lte(
      value({ type: DATATYPE.FLOAT, data: 1 }),
      value({ type: DATATYPE.FLOAT, data: 2 }),
    );

    expect(result.data.operator).toBe(LESS_THAN_EQUAL_OPERATOR);
    expect(result.kind).toBe(COMPARISON_KIND);
  });
});
