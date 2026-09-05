import { describe, expect, it } from "vitest";

import { fn } from "@/builder/nodes/function.node.js";
import { isMainNode } from "@/builder/nodes/main.node.js";
import { DATATYPE } from "@/types.js";

describe("Main", () => {
  it("'isMainNode' should detect main function", () => {
    const myMain = fn(
      (d) => d,
      function* () {},
    );

    const otherFn = fn(
      (d) => d.withArg({ type: DATATYPE.FLOAT }),
      function* () {},
    );

    expect(isMainNode(myMain)).toBe(true);
    expect(isMainNode(otherFn)).toBe(false);
  });
});
