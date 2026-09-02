import { describe, expect, it } from "vitest";

import type { ValueDataType } from "../../src/builder/nodes/value.node.js";
import {
  type VariableNode,
  type VariableNodeData,
  variable,
} from "../../src/builder/nodes/variable.node.js";
import { DATATYPE } from "../../src/types.js";

class VariableTestCase<Type extends ValueDataType> {
  public constructor(private readonly target: VariableNode<Type>) {}

  public checkType(type: VariableNodeData<Type>["type"]) {
    expect(this.target.data.type).toBe(type);

    return this;
  }

  public checkName(name: VariableNodeData<Type>["name"]) {
    expect(this.target.data.name).toBe(name);

    return this;
  }

  public checkValue(value: VariableNodeData<Type>["value"]) {
    expect(this.target.data.value).toBe(value);

    return this;
  }
}

describe("Variable", () => {
  // TODO: Test all of compatible values
  const TEST_NAME = "value1";
  const TEST_VALUE = 1;
  const TEST_TYPE = DATATYPE.FLOAT;

  it("should have no alias and value within current type", () => {
    const testCase = new VariableTestCase(variable({ type: DATATYPE.FLOAT }));

    testCase.checkType(TEST_TYPE).checkName(undefined).checkValue(undefined);
  });

  it("should have a value within current type", () => {
    const testCase = new VariableTestCase(
      variable({ type: TEST_TYPE }).assign(TEST_VALUE),
    );

    testCase.checkType(TEST_TYPE).checkName(undefined).checkValue(TEST_VALUE);
  });

  it("should have an alias within current type", () => {
    const testCase = new VariableTestCase(
      variable({ type: TEST_TYPE }).as(TEST_NAME),
    );

    testCase.checkType(TEST_TYPE).checkName(TEST_NAME).checkValue(undefined);
  });

  it("should have a name and an alias within current type", () => {
    const testCase = new VariableTestCase(
      variable({ type: TEST_TYPE }).assign(TEST_VALUE).as(TEST_NAME),
    );

    testCase.checkType(TEST_TYPE).checkName(TEST_NAME).checkValue(undefined);
  });
});
