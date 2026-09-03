import type { ObjectValues } from "../../helpers/object.helper.js";
import {
  BOOL_VEC_DATATYPE,
  type DATATYPE,
  FLOAT_VEC_DATATYPE,
  INT_VEC_DATATYPE,
  MATRIX_DATATYPE,
  type Matrix2,
  type Matrix2x3,
  type Matrix2x4,
  type Matrix3,
  type Matrix3x2,
  type Matrix3x4,
  type Matrix4,
  type Matrix4x2,
  type Matrix4x3,
  SCALAR_DATATYPE,
  UINT_VEC_DATATYPE,
  type Vec2,
  type Vec3,
  type Vec4,
} from "../../types.js";
import { type BuilderNode, builderNode } from "../node.js";

// * VALUE DATATYPE
export const VALUE_DATATYPE = {
  ...SCALAR_DATATYPE,
  ...FLOAT_VEC_DATATYPE,
  ...INT_VEC_DATATYPE,
  ...UINT_VEC_DATATYPE,
  ...BOOL_VEC_DATATYPE,
  ...MATRIX_DATATYPE,
} as const;

export type ValueDatatype = ObjectValues<typeof VALUE_DATATYPE>;

export type DatatypeValueType<T extends ValueDatatype> = {
  [DATATYPE.FLOAT]: number;
  [DATATYPE.INT]: number;
  [DATATYPE.UINT]: number;
  [DATATYPE.BOOL]: boolean;

  [DATATYPE.VEC2]: Vec2<number>;
  [DATATYPE.VEC3]: Vec3<number>;
  [DATATYPE.VEC4]: Vec4<number>;

  [DATATYPE.INT_VEC2]: Vec2<number>;
  [DATATYPE.INT_VEC3]: Vec3<number>;
  [DATATYPE.INT_VEC4]: Vec4<number>;

  [DATATYPE.UINT_VEC2]: Vec2<number>;
  [DATATYPE.UINT_VEC3]: Vec3<number>;
  [DATATYPE.UINT_VEC4]: Vec4<number>;

  [DATATYPE.BOOL_VEC2]: Vec2<boolean>;
  [DATATYPE.BOOL_VEC3]: Vec3<boolean>;
  [DATATYPE.BOOL_VEC4]: Vec4<boolean>;

  [DATATYPE.MATRIX2]: Matrix2<number>;
  [DATATYPE.MATRIX3]: Matrix3<number>;
  [DATATYPE.MATRIX4]: Matrix4<number>;

  [DATATYPE.MATRIX2x3]: Matrix2x3<number>;
  [DATATYPE.MATRIX2x4]: Matrix2x4<number>;

  [DATATYPE.MATRIX3x2]: Matrix3x2<number>;
  [DATATYPE.MATRIX3x4]: Matrix3x4<number>;

  [DATATYPE.MATRIX4x2]: Matrix4x2<number>;
  [DATATYPE.MATRIX4x3]: Matrix4x3<number>;
}[T];

// * VALUE NODE
const VALUE_KIND = "value";

export type ValueNodeOptions<Type extends ValueDatatype = ValueDatatype> = {
  type: Type;
  data: DatatypeValueType<Type>;
};

export type ValueNode<Type extends ValueDatatype = ValueDatatype> = BuilderNode<
  typeof VALUE_KIND,
  ValueNodeOptions<Type>
>;

export function value<Type extends ValueDatatype = ValueDatatype>(
  options: ValueNodeOptions<Type>,
): ValueNode<Type> {
  return builderNode({
    kind: VALUE_KIND,
    data: options,
  });
}
