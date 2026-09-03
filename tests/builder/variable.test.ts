import { describe, expect, it } from "vitest";

import { variable } from "@/builder/nodes/variable.node.js";
import { DATATYPE } from "@/types.js";

describe("Variable", () => {
  // TODO: Test all of compatible values
  const TEST_NAME = "value1";
  const TEST_VALUE = 1;
  const TEST_TYPE = DATATYPE.FLOAT;

  it("should have no alias and value within current type", () => {
    const target = variable({ type: DATATYPE.FLOAT });

    expect(target.data.type).toBe(TEST_TYPE);
    expect(target.data.name).toBeUndefined();
    expect(target.data.value).toBeUndefined();
  });

  it("should have a value within current type", () => {
    const target = variable({ type: TEST_TYPE }).assign(TEST_VALUE);

    expect(target.data.type).toBe(TEST_TYPE);
    expect(target.data.name).toBeUndefined();
    expect(target.data.value).toBe(TEST_VALUE);
  });

  it("should have an alias within current type", () => {
    const target = variable({ type: TEST_TYPE }).as(TEST_NAME);

    expect(target.data.type).toBe(TEST_TYPE);
    expect(target.data.name).toBe(TEST_NAME);
    expect(target.data.value).toBeUndefined();
  });

  it("should have a name and an alias within current type", () => {
    const target = variable({ type: TEST_TYPE })
      .assign(TEST_VALUE)
      .as(TEST_NAME);

    expect(target.data.type).toBe(TEST_TYPE);
    expect(target.data.name).toBe(TEST_NAME);
    expect(target.data.value).toBe(TEST_VALUE);
  });
});
