import {
  type BoolVecDatatype,
  DATATYPE,
  type FloatVecDatatype,
  type IntVecDatatype,
  type Matrix2,
  type Matrix2x3,
  type Matrix2x4,
  type Matrix3,
  type Matrix3x2,
  type Matrix3x4,
  type Matrix4,
  type Matrix4x2,
  type Matrix4x3,
  type MatrixDatatype,
  type ScalarDataType,
  type UintVecDatatype,
  type Vec2,
  type Vec3,
  type Vec4,
} from "../../types.js";
import {
  type AdditiveCombination,
  type AdditiveDatatype,
  isAdditiveDatatype,
} from "../operations/types/additive.type.js";

export type VariableDataType =
  | ScalarDataType
  | FloatVecDatatype
  | IntVecDatatype
  | UintVecDatatype
  | BoolVecDatatype
  | MatrixDatatype;

type VariableValueType<T extends VariableDataType> = {
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

export type VariableObjectProps<T extends VariableDataType> = {
  name: string;
  type: T;
  value: VariableValueType<T> | null;
};

type VariableAdditiveHandler<T extends AdditiveDatatype> = <
  R extends AdditiveDatatype,
>(
  rhs: Variable<R>,
) => AdditiveCombination<T, R> extends VariableDataType
  ? Variable<AdditiveCombination<T, R>>
  : never;

type VariableAdditiveProperties<T extends AdditiveDatatype> = {
  add: VariableAdditiveHandler<T>;
  subtract: VariableAdditiveHandler<T>;
};

export type Variable<T extends VariableDataType = VariableDataType> =
  VariableObjectProps<T> &
  (T extends AdditiveDatatype ? VariableAdditiveProperties<T> : {});

export function variable<T extends VariableDataType>(
  options: VariableObjectProps<T>,
): Variable<T> {
  const result = { ...options } as Variable<T>;

  if (isAdditiveDatatype(options.type)) {
    Object.assign(result, {
      add: <R extends AdditiveDatatype>(rhs: Variable<R>) => {
        // implementation
        throw new Error("Not implemented");
      },
      subtract: <R extends AdditiveDatatype>(rhs: Variable<R>) => {
        // implementation
        throw new Error("Not implemented");
      },
    } satisfies VariableAdditiveProperties<typeof options.type>);
  }

  return result;
}
