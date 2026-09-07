import { eq } from "@/builder/nodes/comparison/eq.node.js";
import { gt } from "@/builder/nodes/comparison/gt.node.js";
import { lt } from "@/builder/nodes/comparison/lt.node.js";
import { and } from "@/builder/nodes/logical/and.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("and", () => {
  it("should create a logical node with operator &&", () => {
    const result = and(
      eq(
        value({ type: DATATYPE.FLOAT, data: 1 }),
        value({ type: DATATYPE.FLOAT, data: 1 }),
      ),
      gt(
        value({ type: DATATYPE.FLOAT, data: 2 }),
        value({ type: DATATYPE.FLOAT, data: 1 }),
      ),
    );

    expect(result.data.operator).toBe("&&");
    expect(result.kind).toBe("logical");
  });

  it("should accept comparison nodes", () => {
    const result = and(
      gt(
        value({ type: DATATYPE.FLOAT, data: 1 }),
        value({ type: DATATYPE.FLOAT, data: 0 }),
      ),
      lt(
        value({ type: DATATYPE.FLOAT, data: 2 }),
        value({ type: DATATYPE.FLOAT, data: 3 }),
      ),
    );

    expect(result.data.operator).toBe("&&");
    expect(result.kind).toBe("logical");
    expect(result.data.left).toBeDefined();
    expect(result.data.right).toBeDefined();
  });
});
