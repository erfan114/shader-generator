import { eq } from "@/builder/nodes/comparison/eq.node.js";
import { gt } from "@/builder/nodes/comparison/gt.node.js";
import { not } from "@/builder/nodes/logical/not.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("not", () => {
  it("should create a not node", () => {
    const result = not(
      eq(
        value({ type: DATATYPE.FLOAT, data: 1 }),
        value({ type: DATATYPE.FLOAT, data: 1 }),
      ),
    );

    expect(result.data.value).toBeDefined();
    expect(result.kind).toBe("not");
  });

  it("should accept a comparison node", () => {
    const comparison = gt(
      value({ type: DATATYPE.FLOAT, data: 1 }),
      value({ type: DATATYPE.FLOAT, data: 0 }),
    );

    const result = not(comparison);

    expect(result.data.value).toBe(comparison);
    expect(result.kind).toBe("not");
  });
});
