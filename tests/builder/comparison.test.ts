import { eq, neq, lt, lte, gt, gte } from "@/index.js";
import { value } from "@/builder/nodes/value.node.js";
import { variable } from "@/builder/nodes/variable.node.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("Comparison", () => {
  it("eq should create a comparison node with operator ==", () => {
    const result = eq(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 2 }));

    expect(result.data.operator).toBe("==");
    expect(result.kind).toBe("comparison");
  });

  it("eq should accept two variables", () => {
    const v1 = variable({ type: DATATYPE.FLOAT }).assign(1);
    const v2 = variable({ type: DATATYPE.FLOAT }).assign(2);

    const result = eq(v1, v2);

    expect(result.data.left).toBe(v1);
    expect(result.data.right).toBe(v2);
    expect(result.data.operator).toBe("==");
  });

  it("eq should work with BOOL type for eq/neq", () => {
    const boolResult = eq(value({ type: DATATYPE.BOOL, data: true }), value({ type: DATATYPE.BOOL, data: false }));

    expect(boolResult.data.operator).toBe("==");
    expect(boolResult.kind).toBe("comparison");
  });

  it("neq should create a comparison node with operator !=", () => {
    const result = neq(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 2 }));

    expect(result.data.operator).toBe("!=");
    expect(result.kind).toBe("comparison");
  });

  it("lt should create a comparison node with operator <", () => {
    const result = lt(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 2 }));

    expect(result.data.operator).toBe("<");
    expect(result.kind).toBe("comparison");
  });

  it("lte should create a comparison node with operator <=", () => {
    const result = lte(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 2 }));

    expect(result.data.operator).toBe("<=");
    expect(result.kind).toBe("comparison");
  });

  it("gt should create a comparison node with operator >", () => {
    const result = gt(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 2 }));

    expect(result.data.operator).toBe(">");
    expect(result.kind).toBe("comparison");
  });

  it("gte should create a comparison node with operator >=", () => {
    const result = gte(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 2 }));

    expect(result.data.operator).toBe(">=");
    expect(result.kind).toBe("comparison");
  });

  it("comparison nodes should be yield*able", () => {
    const generator = function* () {
      const result = yield* gt(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 2 }));
      return result;
    };

    const gen = generator();
    const first = gen.next();

    // The node should be yielded and accessible
    expect(first.value).toBeDefined();
  });
});