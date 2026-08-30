import { describe, expect, it } from "vitest";

import {
  type VariableDataType,
  type VariableValueType,
  variable,
} from "../src/builder/declarations/variable.declaration.js";
import { entries } from "../src/helpers/object.helper.js";
import { DATATYPE } from "../src/types.js";

const TEST_DATA: { [key in VariableDataType]: VariableValueType<key> } = {
  [DATATYPE.FLOAT]: 1,
  [DATATYPE.INT]: 2,
  [DATATYPE.UINT]: 3,
  [DATATYPE.BOOL]: true,

  [DATATYPE.VEC2]: [1, 2],
  [DATATYPE.VEC3]: [1, 2, 3],
  [DATATYPE.VEC4]: [1, 2, 3, 4],

  [DATATYPE.INT_VEC2]: [1, 2],
  [DATATYPE.INT_VEC3]: [1, 2, 3],
  [DATATYPE.INT_VEC4]: [1, 2, 3, 4],

  [DATATYPE.UINT_VEC2]: [1, 2],
  [DATATYPE.UINT_VEC3]: [1, 2, 3],
  [DATATYPE.UINT_VEC4]: [1, 2, 3, 4],

  [DATATYPE.BOOL_VEC2]: [true, false],
  [DATATYPE.BOOL_VEC3]: [true, false, false],
  [DATATYPE.BOOL_VEC4]: [true, true, false, false],

  [DATATYPE.MATRIX2]: [
    [1, 2],
    [3, 4],
  ],
  [DATATYPE.MATRIX3]: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  [DATATYPE.MATRIX4]: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ],

  [DATATYPE.MATRIX2x3]: [
    [1, 2, 3],
    [4, 5, 6],
  ],
  [DATATYPE.MATRIX2x4]: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ],

  [DATATYPE.MATRIX3x2]: [
    [1, 2],
    [3, 4],
    [5, 6],
  ],
  [DATATYPE.MATRIX3x4]: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ],

  [DATATYPE.MATRIX4x2]: [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
  ],
  [DATATYPE.MATRIX4x3]: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ],
};

describe("Variable", () => {
  it("creates without error", () => {
    const test_name = "myVar";

    for (const [type, value] of entries(TEST_DATA)) {
      const myVar = variable({
        name: test_name,
        type,
        value,
      });

      expect(myVar).toBeTruthy();
      expect(myVar.name).toBe(test_name);
      expect(myVar.value).toBe(value);
      expect(myVar.type).toBe(type);
    }
  });
});
