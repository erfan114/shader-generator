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

export type MultiplicativeCombinationResult<R extends PropertyKey, O> = {
  [key in R]: O;
};

// Scalar utility types
type CommonScalarMultiplicativeCombinationResult =
  MultiplicativeCombinationResult<
    typeof DATATYPE.MATRIX2,
    typeof DATATYPE.MATRIX2
  > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.MATRIX3,
      typeof DATATYPE.MATRIX3
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.MATRIX4,
      typeof DATATYPE.MATRIX4
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.MATRIX2x3,
      typeof DATATYPE.MATRIX2x3
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.MATRIX2x4,
      typeof DATATYPE.MATRIX2x4
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.MATRIX3x2,
      typeof DATATYPE.MATRIX3x2
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.MATRIX3x4,
      typeof DATATYPE.MATRIX3x4
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.MATRIX4x2,
      typeof DATATYPE.MATRIX4x2
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.MATRIX4x3,
      typeof DATATYPE.MATRIX4x3
    >;

// Float vector utility types
type VecMultiplicativeCombinationResult<O extends FloatVecDatatype> =
  MultiplicativeCombinationResult<typeof DATATYPE.FLOAT, O> &
    MultiplicativeCombinationResult<typeof DATATYPE.INT, O> &
    MultiplicativeCombinationResult<typeof DATATYPE.UINT, O> &
    MultiplicativeCombinationResult<O, O>;

// Int vector utility types
type IntVecMultiplicativeResult<U, F> = {
  uint: U;
  float: F;
};

type IntVecMultiplicativeResultTypes<T extends IntVecDatatype> = {
  [INT_VEC_DATATYPE.INT_VEC2]: IntVecMultiplicativeResult<
    typeof DATATYPE.UINT_VEC2,
    typeof DATATYPE.VEC2
  >;
  [INT_VEC_DATATYPE.INT_VEC3]: IntVecMultiplicativeResult<
    typeof DATATYPE.UINT_VEC3,
    typeof DATATYPE.VEC3
  >;
  [INT_VEC_DATATYPE.INT_VEC4]: IntVecMultiplicativeResult<
    typeof DATATYPE.UINT_VEC4,
    typeof DATATYPE.VEC4
  >;
}[T];

type IntVecMultiplicativeCombinationResult<O extends IntVecDatatype> =
  MultiplicativeCombinationResult<typeof DATATYPE.FLOAT, O> &
    MultiplicativeCombinationResult<
      typeof DATATYPE.INT,
      IntVecMultiplicativeResultTypes<O>["float"]
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT,
      IntVecMultiplicativeResultTypes<O>["uint"]
    > &
    MultiplicativeCombinationResult<O, O>;

// Unsigned vector utility types

type UintVecFloatType<T extends UintVecDatatype> = {
  [UINT_VEC_DATATYPE.UINT_VEC2]: typeof DATATYPE.VEC2;
  [UINT_VEC_DATATYPE.UINT_VEC3]: typeof DATATYPE.VEC3;
  [UINT_VEC_DATATYPE.UINT_VEC4]: typeof DATATYPE.VEC4;
}[T];

type UintVecMultiplicativeCombinationResult<O extends UintVecDatatype> =
  MultiplicativeCombinationResult<typeof DATATYPE.FLOAT, O> &
    MultiplicativeCombinationResult<typeof DATATYPE.INT, O> &
    MultiplicativeCombinationResult<typeof DATATYPE.UINT, UintVecFloatType<O>> &
    MultiplicativeCombinationResult<O, O>;

// Matrix utility types
type MatrixMultiplicativeCombinationResult<O extends MatrixDatatype> =
  MultiplicativeCombinationResult<typeof DATATYPE.FLOAT, O> &
    MultiplicativeCombinationResult<typeof DATATYPE.INT, O> &
    MultiplicativeCombinationResult<typeof DATATYPE.UINT, O> &
    MultiplicativeCombinationResult<O, O>;

export const MULTIPLICATIVE_DATATYPE = {
  ...omit(SCALAR_DATATYPE, ["BOOL"]),
  ...FLOAT_VEC_DATATYPE,
  ...INT_VEC_DATATYPE,
  ...UINT_VEC_DATATYPE,
  ...MATRIX_DATATYPE,
} as const;

export type MultiplicativeDatatype = ObjectValues<
  typeof MULTIPLICATIVE_DATATYPE
>;

export function isMultiplicativeDatatype(
  datatype: unknown,
): datatype is MultiplicativeDatatype {
  return valuesInclude(MULTIPLICATIVE_DATATYPE, datatype);
}

type MultiplicativeCombinationMap = {
  // Scalar
  [DATATYPE.FLOAT]: MultiplicativeCombinationResult<
    typeof DATATYPE.FLOAT,
    typeof DATATYPE.FLOAT
  > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.INT,
      typeof DATATYPE.FLOAT
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT,
      typeof DATATYPE.FLOAT
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.VEC2,
      typeof DATATYPE.VEC2
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.VEC3,
      typeof DATATYPE.VEC3
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.VEC4,
      typeof DATATYPE.VEC4
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.INT_VEC2,
      typeof DATATYPE.VEC2
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.INT_VEC3,
      typeof DATATYPE.VEC3
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.INT_VEC4,
      typeof DATATYPE.VEC4
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT_VEC2,
      typeof DATATYPE.VEC2
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT_VEC3,
      typeof DATATYPE.VEC3
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT_VEC4,
      typeof DATATYPE.VEC4
    > &
    CommonScalarMultiplicativeCombinationResult;

  [DATATYPE.INT]: MultiplicativeCombinationResult<
    typeof DATATYPE.FLOAT,
    typeof DATATYPE.FLOAT
  > &
    MultiplicativeCombinationResult<typeof DATATYPE.INT, typeof DATATYPE.INT> &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT,
      typeof DATATYPE.UINT
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.VEC2,
      typeof DATATYPE.VEC2
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.VEC3,
      typeof DATATYPE.VEC3
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.VEC4,
      typeof DATATYPE.VEC4
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.INT_VEC2,
      typeof DATATYPE.INT_VEC2
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.INT_VEC3,
      typeof DATATYPE.INT_VEC3
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.INT_VEC4,
      typeof DATATYPE.INT_VEC4
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT_VEC2,
      typeof DATATYPE.UINT_VEC2
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT_VEC3,
      typeof DATATYPE.UINT_VEC3
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT_VEC4,
      typeof DATATYPE.UINT_VEC4
    > &
    CommonScalarMultiplicativeCombinationResult;

  [DATATYPE.UINT]: MultiplicativeCombinationResult<
    typeof DATATYPE.FLOAT,
    typeof DATATYPE.FLOAT
  > &
    MultiplicativeCombinationResult<typeof DATATYPE.INT, typeof DATATYPE.UINT> &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT,
      typeof DATATYPE.UINT
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.VEC2,
      typeof DATATYPE.VEC2
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.VEC3,
      typeof DATATYPE.VEC3
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.VEC4,
      typeof DATATYPE.VEC4
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.INT_VEC2,
      typeof DATATYPE.UINT_VEC2
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.INT_VEC3,
      typeof DATATYPE.UINT_VEC3
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.INT_VEC4,
      typeof DATATYPE.UINT_VEC4
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT_VEC2,
      typeof DATATYPE.UINT_VEC2
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT_VEC3,
      typeof DATATYPE.UINT_VEC3
    > &
    MultiplicativeCombinationResult<
      typeof DATATYPE.UINT_VEC4,
      typeof DATATYPE.UINT_VEC4
    > &
    CommonScalarMultiplicativeCombinationResult;

  // Float vectors
  [DATATYPE.VEC2]: VecMultiplicativeCombinationResult<typeof DATATYPE.VEC2>;
  [DATATYPE.VEC3]: VecMultiplicativeCombinationResult<typeof DATATYPE.VEC3>;
  [DATATYPE.VEC4]: VecMultiplicativeCombinationResult<typeof DATATYPE.VEC4>;

  // Signed vectors
  [DATATYPE.INT_VEC2]: IntVecMultiplicativeCombinationResult<
    typeof DATATYPE.INT_VEC2
  >;
  [DATATYPE.INT_VEC3]: IntVecMultiplicativeCombinationResult<
    typeof DATATYPE.INT_VEC3
  >;
  [DATATYPE.INT_VEC4]: IntVecMultiplicativeCombinationResult<
    typeof DATATYPE.INT_VEC4
  >;

  // Unsigned vectors
  [DATATYPE.UINT_VEC2]: UintVecMultiplicativeCombinationResult<
    typeof DATATYPE.UINT_VEC2
  >;
  [DATATYPE.UINT_VEC3]: UintVecMultiplicativeCombinationResult<
    typeof DATATYPE.UINT_VEC3
  >;
  [DATATYPE.UINT_VEC4]: UintVecMultiplicativeCombinationResult<
    typeof DATATYPE.UINT_VEC4
  >;

  // Matrices
  [DATATYPE.MATRIX2]: MatrixMultiplicativeCombinationResult<
    typeof DATATYPE.MATRIX2
  >;
  [DATATYPE.MATRIX3]: MatrixMultiplicativeCombinationResult<
    typeof DATATYPE.MATRIX3
  >;
  [DATATYPE.MATRIX4]: MatrixMultiplicativeCombinationResult<
    typeof DATATYPE.MATRIX4
  >;

  [DATATYPE.MATRIX2x3]: MatrixMultiplicativeCombinationResult<
    typeof DATATYPE.MATRIX2x3
  >;
  [DATATYPE.MATRIX2x4]: MatrixMultiplicativeCombinationResult<
    typeof DATATYPE.MATRIX2x4
  >;
  [DATATYPE.MATRIX3x2]: MatrixMultiplicativeCombinationResult<
    typeof DATATYPE.MATRIX3x2
  >;
  [DATATYPE.MATRIX3x4]: MatrixMultiplicativeCombinationResult<
    typeof DATATYPE.MATRIX3x4
  >;
  [DATATYPE.MATRIX4x2]: MatrixMultiplicativeCombinationResult<
    typeof DATATYPE.MATRIX4x2
  >;
  [DATATYPE.MATRIX4x3]: MatrixMultiplicativeCombinationResult<
    typeof DATATYPE.MATRIX4x3
  >;
};

export type MultiplicativeCombination<
  L extends MultiplicativeDatatype,
  R extends MultiplicativeDatatype,
> = MultiplicativeCombinationMap[L] extends infer Left
  ? Left extends Record<R, infer Result>
    ? Result
    : never
  : never;
