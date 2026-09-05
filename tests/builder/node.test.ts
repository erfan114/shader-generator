import { describe, expect, it } from "vitest";

import { builderNode, isBuilderNode } from "@/builder/node.js";

describe("Builder node", () => {
  it("should have iterator", () => {
    const node = builderNode({ kind: "some-kind", data: {} });

    expect(Symbol.iterator in node).equal(true);
    expect(node[Symbol.iterator]).toBeTypeOf("function");
  });

  it("should pass 'isBuilderNode'", () => {
    const myNode = builderNode({
      kind: "some-kind",
      data: undefined,
    });

    expect(isBuilderNode(myNode)).toBe(true);
  });
});
