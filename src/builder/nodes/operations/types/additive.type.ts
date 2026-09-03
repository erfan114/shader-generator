import {
  type ObjectValues,
  omit,
  valuesInclude,
} from "@/helpers/object.helper.js";
import {
  type DATATYPE,
  FLOAT_VEC_DATATYPE,
  type FloatVecDatatype,
  INT_VEC_DATATYPE,
  type IntVecDatatype,
  MATRIX_DATATYPE,
  type MatrixDatatype,
  SCALAR_DATATYPE,
  UINT_VEC_DATATYPE,
  type UintVecDatatype,
} from "@/types.js";

export type AdditiveCombinationResult<R extends PropertyKey, O> = {
  [key in R]: O;
};

// Scalar utility types
type CommonScalarAdditiveCombinationResult = AdditiveCombinationResult<
  typeof DATATYPE.MATRIX2,
  typeof DATATYPE.MATRIX2
> &
  AdditiveCombinationResult<typeof DATATYPE.MATRIX3, typeof DATATYPE.MATRIX3> &
  AdditiveCombinationResult<typeof DATATYPE.MATRIX4, typeof DATATYPE.MATRIX4> &
  AdditiveCombinationResult<
    typeof DATATYPE.MATRIX2x3,
    typeof DATATYPE.MATRIX2x3
  > &
  AdditiveCombinationResult<
    typeof DATATYPE.MATRIX2x4,
    typeof DATATYPE.MATRIX2x4
  > &
  AdditiveCombinationResult<
    typeof DATATYPE.MATRIX3x2,
    typeof DATATYPE.MATRIX3x2
  > &
  AdditiveCombinationResult<
    typeof DATATYPE.MATRIX3x4,
    typeof DATATYPE.MATRIX3x4
  > &
  AdditiveCombinationResult<
    typeof DATATYPE.MATRIX4x2,
    typeof DATATYPE.MATRIX4x2
  > &
  AdditiveCombinationResult<
    typeof DATATYPE.MATRIX4x3,
    typeof DATATYPE.MATRIX4x3
  >;

// Float vector utility types
type VecAdditiveCombinationResult<O extends FloatVecDatatype> =
  AdditiveCombinationResult<typeof DATATYPE.FLOAT, O> &
    AdditiveCombinationResult<typeof DATATYPE.INT, O> &
    AdditiveCombinationResult<typeof DATATYPE.UINT, O> &
    AdditiveCombinationResult<O, O>;

// Int vector utility types
type IntVecAdditiveResult<U, F> = {
  uint: U;
  float: F;
};

type IntVecAdditiveResultTypes<T extends IntVecDatatype> = {
  [INT_VEC_DATATYPE.INT_VEC2]: IntVecAdditiveResult<
    typeof DATATYPE.UINT_VEC2,
    typeof DATATYPE.VEC2
  >;
  [INT_VEC_DATATYPE.INT_VEC3]: IntVecAdditiveResult<
    typeof DATATYPE.UINT_VEC3,
    typeof DATATYPE.VEC3
  >;
  [INT_VEC_DATATYPE.INT_VEC4]: IntVecAdditiveResult<
    typeof DATATYPE.UINT_VEC4,
    typeof DATATYPE.VEC4
  >;
}[T];

type IntVecAdditiveCombinationResult<O extends IntVecDatatype> =
  AdditiveCombinationResult<typeof DATATYPE.FLOAT, O> &
    AdditiveCombinationResult<
      typeof DATATYPE.INT,
      IntVecAdditiveResultTypes<O>["float"]
    > &
    AdditiveCombinationResult<
      typeof DATATYPE.UINT,
      IntVecAdditiveResultTypes<O>["uint"]
    > &
    AdditiveCombinationResult<O, O>;

// Unsigned vector utility types

type UintVecFloatType<T extends UintVecDatatype> = {
  [UINT_VEC_DATATYPE.UINT_VEC2]: typeof DATATYPE.VEC2;
  [UINT_VEC_DATATYPE.UINT_VEC3]: typeof DATATYPE.VEC3;
  [UINT_VEC_DATATYPE.UINT_VEC4]: typeof DATATYPE.VEC4;
}[T];

type UintVecAdditiveCombinationResult<O extends UintVecDatatype> =
  AdditiveCombinationResult<typeof DATATYPE.FLOAT, O> &
    AdditiveCombinationResult<typeof DATATYPE.INT, O> &
    AdditiveCombinationResult<typeof DATATYPE.UINT, UintVecFloatType<O>> &
    AdditiveCombinationResult<O, O>;

// Matrix utility types
type MatrixAdditiveCombinationResult<O extends MatrixDatatype> =
  AdditiveCombinationResult<typeof DATATYPE.FLOAT, O> &
    AdditiveCombinationResult<typeof DATATYPE.INT, O> &
    AdditiveCombinationResult<typeof DATATYPE.UINT, O> &
    AdditiveCombinationResult<O, O>;

export const ADDITIVE_DATATYPE = {
  ...omit(SCALAR_DATATYPE, ["BOOL"]),
  ...FLOAT_VEC_DATATYPE,
  ...INT_VEC_DATATYPE,
  ...UINT_VEC_DATATYPE,
  ...MATRIX_DATATYPE,
} as const;

export type AdditiveDatatype = ObjectValues<typeof ADDITIVE_DATATYPE>;

export function isAdditiveDatatype(
  datatype: unknown,
): datatype is AdditiveDatatype {
  return valuesInclude(ADDITIVE_DATATYPE, datatype);
}

type AdditiveCombinationMap = {
  // Scalar
  [DATATYPE.FLOAT]: AdditiveCombinationResult<
    typeof DATATYPE.FLOAT,
    typeof DATATYPE.FLOAT
  > &
    AdditiveCombinationResult<typeof DATATYPE.INT, typeof DATATYPE.FLOAT> &
    AdditiveCombinationResult<typeof DATATYPE.UINT, typeof DATATYPE.FLOAT> &
    AdditiveCombinationResult<typeof DATATYPE.VEC2, typeof DATATYPE.VEC2> &
    AdditiveCombinationResult<typeof DATATYPE.VEC3, typeof DATATYPE.VEC3> &
    AdditiveCombinationResult<typeof DATATYPE.VEC4, typeof DATATYPE.VEC4> &
    AdditiveCombinationResult<typeof DATATYPE.INT_VEC2, typeof DATATYPE.VEC2> &
    AdditiveCombinationResult<typeof DATATYPE.INT_VEC3, typeof DATATYPE.VEC3> &
    AdditiveCombinationResult<typeof DATATYPE.INT_VEC4, typeof DATATYPE.VEC4> &
    AdditiveCombinationResult<typeof DATATYPE.UINT_VEC2, typeof DATATYPE.VEC2> &
    AdditiveCombinationResult<typeof DATATYPE.UINT_VEC3, typeof DATATYPE.VEC3> &
    AdditiveCombinationResult<typeof DATATYPE.UINT_VEC4, typeof DATATYPE.VEC4> &
    CommonScalarAdditiveCombinationResult;

  [DATATYPE.INT]: AdditiveCombinationResult<
    typeof DATATYPE.FLOAT,
    typeof DATATYPE.FLOAT
  > &
    AdditiveCombinationResult<typeof DATATYPE.INT, typeof DATATYPE.INT> &
    AdditiveCombinationResult<typeof DATATYPE.UINT, typeof DATATYPE.UINT> &
    AdditiveCombinationResult<typeof DATATYPE.VEC2, typeof DATATYPE.VEC2> &
    AdditiveCombinationResult<typeof DATATYPE.VEC3, typeof DATATYPE.VEC3> &
    AdditiveCombinationResult<typeof DATATYPE.VEC4, typeof DATATYPE.VEC4> &
    AdditiveCombinationResult<
      typeof DATATYPE.INT_VEC2,
      typeof DATATYPE.INT_VEC2
    > &
    AdditiveCombinationResult<
      typeof DATATYPE.INT_VEC3,
      typeof DATATYPE.INT_VEC3
    > &
    AdditiveCombinationResult<
      typeof DATATYPE.INT_VEC4,
      typeof DATATYPE.INT_VEC4
    > &
    AdditiveCombinationResult<
      typeof DATATYPE.UINT_VEC2,
      typeof DATATYPE.UINT_VEC2
    > &
    AdditiveCombinationResult<
      typeof DATATYPE.UINT_VEC3,
      typeof DATATYPE.UINT_VEC3
    > &
    AdditiveCombinationResult<
      typeof DATATYPE.UINT_VEC4,
      typeof DATATYPE.UINT_VEC4
    > &
    CommonScalarAdditiveCombinationResult;

  [DATATYPE.UINT]: AdditiveCombinationResult<
    typeof DATATYPE.FLOAT,
    typeof DATATYPE.FLOAT
  > &
    AdditiveCombinationResult<typeof DATATYPE.INT, typeof DATATYPE.UINT> &
    AdditiveCombinationResult<typeof DATATYPE.UINT, typeof DATATYPE.UINT> &
    AdditiveCombinationResult<typeof DATATYPE.VEC2, typeof DATATYPE.VEC2> &
    AdditiveCombinationResult<typeof DATATYPE.VEC3, typeof DATATYPE.VEC3> &
    AdditiveCombinationResult<typeof DATATYPE.VEC4, typeof DATATYPE.VEC4> &
    AdditiveCombinationResult<
      typeof DATATYPE.INT_VEC2,
      typeof DATATYPE.UINT_VEC2
    > &
    AdditiveCombinationResult<
      typeof DATATYPE.INT_VEC3,
      typeof DATATYPE.UINT_VEC3
    > &
    AdditiveCombinationResult<
      typeof DATATYPE.INT_VEC4,
      typeof DATATYPE.UINT_VEC4
    > &
    AdditiveCombinationResult<
      typeof DATATYPE.UINT_VEC2,
      typeof DATATYPE.UINT_VEC2
    > &
    AdditiveCombinationResult<
      typeof DATATYPE.UINT_VEC3,
      typeof DATATYPE.UINT_VEC3
    > &
    AdditiveCombinationResult<
      typeof DATATYPE.UINT_VEC4,
      typeof DATATYPE.UINT_VEC4
    > &
    CommonScalarAdditiveCombinationResult;

  // Float vectors
  [DATATYPE.VEC2]: VecAdditiveCombinationResult<typeof DATATYPE.VEC2>;
  [DATATYPE.VEC3]: VecAdditiveCombinationResult<typeof DATATYPE.VEC3>;
  [DATATYPE.VEC4]: VecAdditiveCombinationResult<typeof DATATYPE.VEC4>;

  // Signed vectors
  [DATATYPE.INT_VEC2]: IntVecAdditiveCombinationResult<
    typeof DATATYPE.INT_VEC2
  >;
  [DATATYPE.INT_VEC3]: IntVecAdditiveCombinationResult<
    typeof DATATYPE.INT_VEC3
  >;
  [DATATYPE.INT_VEC4]: IntVecAdditiveCombinationResult<
    typeof DATATYPE.INT_VEC4
  >;

  // Unsigned vectors
  [DATATYPE.UINT_VEC2]: UintVecAdditiveCombinationResult<
    typeof DATATYPE.UINT_VEC2
  >;
  [DATATYPE.UINT_VEC3]: UintVecAdditiveCombinationResult<
    typeof DATATYPE.UINT_VEC3
  >;
  [DATATYPE.UINT_VEC4]: UintVecAdditiveCombinationResult<
    typeof DATATYPE.UINT_VEC4
  >;

  // Matrices
  [DATATYPE.MATRIX2]: MatrixAdditiveCombinationResult<typeof DATATYPE.MATRIX2>;
  [DATATYPE.MATRIX3]: MatrixAdditiveCombinationResult<typeof DATATYPE.MATRIX3>;
  [DATATYPE.MATRIX4]: MatrixAdditiveCombinationResult<typeof DATATYPE.MATRIX4>;

  [DATATYPE.MATRIX2x3]: MatrixAdditiveCombinationResult<
    typeof DATATYPE.MATRIX2x3
  >;
  [DATATYPE.MATRIX2x4]: MatrixAdditiveCombinationResult<
    typeof DATATYPE.MATRIX2x4
  >;
  [DATATYPE.MATRIX3x2]: MatrixAdditiveCombinationResult<
    typeof DATATYPE.MATRIX3x2
  >;
  [DATATYPE.MATRIX3x4]: MatrixAdditiveCombinationResult<
    typeof DATATYPE.MATRIX3x4
  >;
  [DATATYPE.MATRIX4x2]: MatrixAdditiveCombinationResult<
    typeof DATATYPE.MATRIX4x2
  >;
  [DATATYPE.MATRIX4x3]: MatrixAdditiveCombinationResult<
    typeof DATATYPE.MATRIX4x3
  >;
};

export type AdditiveCombination<
  L extends AdditiveDatatype,
  R extends AdditiveDatatype,
> = AdditiveCombinationMap[L] extends infer Left
  ? Left extends Record<R, infer Result>
    ? Result
    : never
  : never;
