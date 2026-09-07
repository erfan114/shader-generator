import type { ObjectValues } from "@/helpers/object.helper.js";
import {
  BOOL_VEC_DATATYPE,
  FLOAT_VEC_DATATYPE,
  INT_VEC_DATATYPE,
  SCALAR_DATATYPE,
  UINT_VEC_DATATYPE,
} from "@/types.js";
import { type BuilderNode, builderNode } from "../../node.js";
import type { ValueNode } from "../value.node.js";
import type { VariableNode } from "../variable.node.js";

const COMPARISON_KIND = "comparison";

export type ComparisonOperator = ">" | ">=" | "<" | "<=" | "==" | "!=";

/**
 * Datatypes that can be compared in GLSL.
 * Includes all scalar types (including BOOL for eq/neq) and all vector types,
 * but excludes matrices and samplers.
 */
export const COMPARISON_DATATYPE = {
  ...SCALAR_DATATYPE,
  ...FLOAT_VEC_DATATYPE,
  ...INT_VEC_DATATYPE,
  ...UINT_VEC_DATATYPE,
  ...BOOL_VEC_DATATYPE,
} as const;

export type ComparisonDatatype = ObjectValues<typeof COMPARISON_DATATYPE>;

/**
 * Operand type for comparison nodes - a value or variable of a comparable datatype.
 */
export type ComparisonSide<Type extends ComparisonDatatype> =
  ValueNode<Type> | VariableNode<Type>;

/**
 * Comparison node representing a boolean comparison expression.
 *
 * @template L - Left operand datatype (extends ComparisonDatatype)
 * @template R - Right operand datatype (extends ComparisonDatatype)
 */
export type ComparisonNode<
  L extends ComparisonDatatype = ComparisonDatatype,
  R extends ComparisonDatatype = ComparisonDatatype,
> = BuilderNode<
  typeof COMPARISON_KIND,
  {
    operator: ComparisonOperator;
    left: ComparisonSide<L>;
    right: ComparisonSide<R>;
  }
>;

/**
 * Comparison factories - produce boolean BuilderNode IR nodes.
 *
 * Each comparison produces a node with kind "comparison" and an operator field,
 * representing a GLSL comparison expression (e.g., `a > b`, `a == b`).
 * The result type is always DATATYPE.BOOL.
 */

/** Equal comparison (`a == b`) */
export function eq<L extends ComparisonDatatype, R extends ComparisonDatatype>(
  left: ComparisonSide<L>,
  right: ComparisonSide<R>,
): ComparisonNode<L, R> {
  return builderNode({
    kind: COMPARISON_KIND,
    data: { operator: "==", left, right },
  });
}

/** Not-equal comparison (`a != b`) */
export function neq<L extends ComparisonDatatype, R extends ComparisonDatatype>(
  left: ComparisonSide<L>,
  right: ComparisonSide<R>,
): ComparisonNode<L, R> {
  return builderNode({
    kind: COMPARISON_KIND,
    data: { operator: "!=", left, right },
  });
}

/** Less-than comparison (`a < b`) */
export function lt<L extends ComparisonDatatype, R extends ComparisonDatatype>(
  left: ComparisonSide<L>,
  right: ComparisonSide<R>,
): ComparisonNode<L, R> {
  return builderNode({
    kind: COMPARISON_KIND,
    data: { operator: "<", left, right },
  });
}

/** Less-than-or-equal comparison (`a <= b`) */
export function lte<L extends ComparisonDatatype, R extends ComparisonDatatype>(
  left: ComparisonSide<L>,
  right: ComparisonSide<R>,
): ComparisonNode<L, R> {
  return builderNode({
    kind: COMPARISON_KIND,
    data: { operator: "<=", left, right },
  });
}

/** Greater-than comparison (`a > b`) */
export function gt<L extends ComparisonDatatype, R extends ComparisonDatatype>(
  left: ComparisonSide<L>,
  right: ComparisonSide<R>,
): ComparisonNode<L, R> {
  return builderNode({
    kind: COMPARISON_KIND,
    data: { operator: ">", left, right },
  });
}

/** Greater-than-or-equal comparison (`a >= b`) */
export function gte<L extends ComparisonDatatype, R extends ComparisonDatatype>(
  left: ComparisonSide<L>,
  right: ComparisonSide<R>,
): ComparisonNode<L, R> {
  return builderNode({
    kind: COMPARISON_KIND,
    data: { operator: ">=", left, right },
  });
}
