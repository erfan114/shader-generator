import { value } from "@/builder/nodes/value.node.js";
import { variable } from "@/builder/nodes/variable.node.js";
import { add } from "@/index.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("Addition", () => {
  it("should accept two variables", () => {
    const variable1 = variable({ type: DATATYPE.FLOAT }).assign(1);
    const variable2 = variable({ type: DATATYPE.FLOAT }).assign(2);

    const sum = add(variable1, variable2);

    expect(sum.data.left).toBe(variable1);
    expect(sum.data.right).toBe(variable2);
  });

  it("should accept two values", () => {
    const value1 = value({ type: DATATYPE.FLOAT, data: 2 });
    const value2 = value({ type: DATATYPE.FLOAT, data: 2 });

    const sum = add(value1, value2);

    expect(sum.data.left).toBe(value1);
    expect(sum.data.right).toBe(value2);
  });
});
