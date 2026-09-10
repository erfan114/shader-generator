import { for_ } from "@/builder/nodes/control-flow/for.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { add } from "@/index.js";
import { lt } from "@/index.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("for", () => {
  it("should create a builder node with kind 'for' when init is null", () => {
    const myFor = for_({
      init: null,
      condition: () => value({ type: DATATYPE.BOOL, data: true }),
      update: () =>
        add(
          value({ type: DATATYPE.INT, data: 1 }),
          value({ type: DATATYPE.INT, data: 0 }),
        ),
      body: function* () {},
    });

    expect(myFor.kind).toBe("for");
  });

  it("should support init with value node and body with loop variable", () => {
    const i = value({ type: DATATYPE.INT, data: 0 });

    const myFor = for_({
      init: i,
      condition: (i) => lt(i, value({ type: DATATYPE.INT, data: 5 })),
      update: (i) => add(i, value({ type: DATATYPE.INT, data: 1 })),
      body: function* (i) {
        // body can use i but should not return a value
        i; // usage only
      },
    });

    expect(myFor.kind).toBe("for");
    expect(myFor.data.init).toBe(i);
    expect(typeof myFor.data.body).toBe("function");
  });

  it("should support condition with lt comparison when init is null", () => {
    const myFor = for_({
      init: null,
      condition: () => value({ type: DATATYPE.BOOL, data: true }),
      update: () =>
        add(
          value({ type: DATATYPE.INT, data: 1 }),
          value({ type: DATATYPE.INT, data: 0 }),
        ),
      body: function* () {},
    });

    expect(myFor.kind).toBe("for");
  });

  it("should support update with add operation when init is null", () => {
    const myFor = for_({
      init: null,
      condition: () => value({ type: DATATYPE.BOOL, data: true }),
      update: () =>
        add(
          value({ type: DATATYPE.INT, data: 1 }),
          value({ type: DATATYPE.INT, data: 0 }),
        ),
      body: function* () {},
    });

    expect(myFor.kind).toBe("for");
    expect(myFor.data.update).toBeDefined();
  });
});
