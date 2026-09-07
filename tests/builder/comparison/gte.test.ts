import { gte } from "@/builder/nodes/comparison/gte.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("gte", () => {
  it("should create a comparison node with operator >=", () => {
    const result = gte(
      value({ type: DATATYPE.FLOAT, data: 1 }),
      value({ type: DATATYPE.FLOAT, data: 2 }),
    );

    expect(result.data.operator).toBe(">=");
    expect(result.kind).toBe("comparison");
  });
});
