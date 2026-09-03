import { describe, expect, it } from "vitest";

import { builderNode } from "@/builder/node.js";

describe("Builder node", () => {
  it("should have iterator", () => {
    const node = builderNode({ kind: "some-kind", data: {} });

    expect(Symbol.iterator in node).equal(true);
    expect(node[Symbol.iterator]).toBeTypeOf("function");
  });
});
