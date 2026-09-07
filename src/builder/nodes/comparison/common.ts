import {
  SCALAR_DATATYPE,
  FLOAT_VEC_DATATYPE,
  INT_VEC_DATATYPE,
  UINT_VEC_DATATYPE,
  BOOL_VEC_DATATYPE,
} from "@/types.js";

import type { ObjectValues } from "@/helpers/object.helper.js";
import type { ValueNode } from "../value.node.js";
import type { VariableNode } from "../variable.node.js";
import type { BuilderNode } from "@/builder/node.js";

// ComparisonDatatype includes all scalar and vector types that can be compared in GLSL.
// Excludes matrices, which cannot be compared with relational operators (<, >, <=, >=).
// Includes BOOL for eq/neq operators.
export const ComparisonDatatype = {
  ...SCALAR_DATATYPE,
  ...FLOAT_VEC_DATATYPE,
  ...INT_VEC_DATATYPE,
  ...UINT_VEC_DATATYPE,
  ...BOOL_VEC_DATATYPE,
} as const;

export type ComparisonDatatype = ObjectValues<typeof ComparisonDatatype>;

export type ComparisonSide<Type extends ComparisonDatatype> =
  ValueNode<Type> | VariableNode<Type>;

export const COMPARISON_KIND = "comparison";

export type ComparisonNode<
  Operator extends string = string,
  Type extends ComparisonDatatype = ComparisonDatatype,
> = BuilderNode<
  typeof COMPARISON_KIND,
  {
    operator: Operator;
    left: ComparisonSide<Type>;
    right: ComparisonSide<Type>;
  }
>;
