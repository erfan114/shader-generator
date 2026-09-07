import { eq } from "@/builder/nodes/comparison/eq.node.js";
import { or } from "@/builder/nodes/logical/or.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("or", () => {
  it("should create a logical node with operator ||", () => {
    const result = or(
      eq(
        value({ type: DATATYPE.FLOAT, data: 1 }),
        value({ type: DATATYPE.FLOAT, data: 1 }),
      ),
      eq(
        value({ type: DATATYPE.FLOAT, data: 2 }),
        value({ type: DATATYPE.FLOAT, data: 2 }),
      ),
    );

    expect(result.data.operator).toBe("||");
    expect(result.kind).toBe("logical");
  });
});
