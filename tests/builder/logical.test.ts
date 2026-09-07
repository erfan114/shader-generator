import { and, or, not } from "@/index.js";
import { eq, gt, lt } from "@/index.js";
import { value } from "@/builder/nodes/value.node.js";
import { variable } from "@/builder/nodes/variable.node.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("Logical", () => {
  it("and should create a logical node with operator &&", () => {
    const result = and(
      eq(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 1 })),
      gt(value({ type: DATATYPE.FLOAT, data: 2 }), value({ type: DATATYPE.FLOAT, data: 1 }))
    );

    expect(result.data.operator).toBe("&&");
    expect(result.kind).toBe("logical");
  });

  it("or should create a logical node with operator ||", () => {
    const result = or(
      eq(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 1 })),
      not(eq(value({ type: DATATYPE.FLOAT, data: 2 }), value({ type: DATATYPE.FLOAT, data: 2 })))
    );

    expect(result.data.operator).toBe("||");
    expect(result.kind).toBe("logical");
  });

  it("not should create a not node", () => {
    const result = not(
      eq(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 1 }))
    );

    expect(result.data.value).toBeDefined();
    expect(result.kind).toBe("not");
  });

  it("not should accept a comparison node", () => {
    const comparison = gt(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 0 }));

    const result = not(comparison);

    expect(result.data.value).toBe(comparison);
    expect(result.kind).toBe("not");
  });

  it("and should accept comparison nodes", () => {
    const result = and(
      gt(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 0 })),
      lt(value({ type: DATATYPE.FLOAT, data: 2 }), value({ type: DATATYPE.FLOAT, data: 3 }))
    );

    expect(result.data.operator).toBe("&&");
    expect(result.kind).toBe("logical");
    expect(result.data.left).toBeDefined();
    expect(result.data.right).toBeDefined();
  });

  it("or should nest not and eq", () => {
    const result = or(
      eq(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 1 })),
      not(eq(value({ type: DATATYPE.FLOAT, data: 2 }), value({ type: DATATYPE.FLOAT, data: 2 })))
    );

    expect(result.data.operator).toBe("||");
    expect(result.kind).toBe("logical");
  });

  it("boolean expressions should be yield*able", () => {
    const generator = function* () {
      const result = yield* and(
        gt(value({ type: DATATYPE.FLOAT, data: 1 }), value({ type: DATATYPE.FLOAT, data: 0 })),
        lt(value({ type: DATATYPE.FLOAT, data: 2 }), value({ type: DATATYPE.FLOAT, data: 3 }))
      );
      return result;
    };

    const gen = generator();
    const first = gen.next();

    expect(first.value).toBeDefined();
  });
});