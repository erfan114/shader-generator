import type {
  DATATYPE,
  Datatype,
  FloatVecDatatype,
  INT_VEC_DATATYPE,
  IntVecDatatype,
  MatrixDatatype,
  UINT_VEC_DATATYPE,
  UintVecDatatype,
} from "../../types.js";
import type { OperationOutput, OperationRHS } from "./common.js";

export type AddCombinationResult<R, O> = OperationRHS<R> & OperationOutput<O>;

// Scalar utility types
type CommonScalarAddCombinationResult =
  | AddCombinationResult<typeof DATATYPE.MATRIX2, typeof DATATYPE.MATRIX2>
  | AddCombinationResult<typeof DATATYPE.MATRIX3, typeof DATATYPE.MATRIX3>
  | AddCombinationResult<typeof DATATYPE.MATRIX4, typeof DATATYPE.MATRIX4>
  | AddCombinationResult<typeof DATATYPE.MATRIX2x3, typeof DATATYPE.MATRIX2x3>
  | AddCombinationResult<typeof DATATYPE.MATRIX2x4, typeof DATATYPE.MATRIX2x4>
  | AddCombinationResult<typeof DATATYPE.MATRIX3x2, typeof DATATYPE.MATRIX3x2>
  | AddCombinationResult<typeof DATATYPE.MATRIX3x4, typeof DATATYPE.MATRIX3x4>
  | AddCombinationResult<typeof DATATYPE.MATRIX4x2, typeof DATATYPE.MATRIX4x2>
  | AddCombinationResult<typeof DATATYPE.MATRIX4x3, typeof DATATYPE.MATRIX4x3>;

// Float vector utility types
type VecAddCombinationResult<O extends FloatVecDatatype> =
  | AddCombinationResult<typeof DATATYPE.FLOAT, O>
  | AddCombinationResult<typeof DATATYPE.INT, O>
  | AddCombinationResult<typeof DATATYPE.UINT, O>
  | AddCombinationResult<O, O>;

// Int vector utility types
type IntVecAddResult<U, F> = {
  uint: U;
  float: F;
};

type IntVecAddResultTypes<T extends IntVecDatatype> = {
  [INT_VEC_DATATYPE.INT_VEC2]: IntVecAddResult<
    typeof DATATYPE.UINT_VEC2,
    typeof DATATYPE.VEC2
  >;
  [INT_VEC_DATATYPE.INT_VEC3]: IntVecAddResult<
    typeof DATATYPE.UINT_VEC3,
    typeof DATATYPE.VEC3
  >;
  [INT_VEC_DATATYPE.INT_VEC4]: IntVecAddResult<
    typeof DATATYPE.UINT_VEC4,
    typeof DATATYPE.VEC4
  >;
}[T];

type IntVecAddCombinationResult<O extends IntVecDatatype> =
  | AddCombinationResult<typeof DATATYPE.FLOAT, O>
  | AddCombinationResult<typeof DATATYPE.INT, IntVecAddResultTypes<O>["float"]>
  | AddCombinationResult<typeof DATATYPE.UINT, IntVecAddResultTypes<O>["uint"]>
  | AddCombinationResult<O, O>;

// Unsigned vector utility types

type UintVecFloatType<T extends UintVecDatatype> = {
  [UINT_VEC_DATATYPE.UINT_VEC2]: typeof DATATYPE.VEC2;
  [UINT_VEC_DATATYPE.UINT_VEC3]: typeof DATATYPE.VEC3;
  [UINT_VEC_DATATYPE.UINT_VEC4]: typeof DATATYPE.VEC4;
}[T];

type UintVecAddCombinationResult<O extends UintVecDatatype> =
  | AddCombinationResult<typeof DATATYPE.FLOAT, O>
  | AddCombinationResult<typeof DATATYPE.INT, O>
  | AddCombinationResult<typeof DATATYPE.UINT, UintVecFloatType<O>>
  | AddCombinationResult<O, O>;

// Matrix utility types
type MatrixAddCombinationResult<O extends MatrixDatatype> =
  | AddCombinationResult<typeof DATATYPE.FLOAT, O>
  | AddCombinationResult<typeof DATATYPE.INT, O>
  | AddCombinationResult<typeof DATATYPE.UINT, O>
  | AddCombinationResult<O, O>;

export type AddCombination<T extends Datatype> = {
  // Scalar
  [DATATYPE.FLOAT]:
    | AddCombinationResult<typeof DATATYPE.FLOAT, typeof DATATYPE.FLOAT>
    | AddCombinationResult<typeof DATATYPE.INT, typeof DATATYPE.FLOAT>
    | AddCombinationResult<typeof DATATYPE.UINT, typeof DATATYPE.FLOAT>
    | AddCombinationResult<typeof DATATYPE.VEC2, typeof DATATYPE.VEC2>
    | AddCombinationResult<typeof DATATYPE.VEC3, typeof DATATYPE.VEC3>
    | AddCombinationResult<typeof DATATYPE.VEC4, typeof DATATYPE.VEC4>
    | AddCombinationResult<typeof DATATYPE.INT_VEC2, typeof DATATYPE.VEC2>
    | AddCombinationResult<typeof DATATYPE.INT_VEC3, typeof DATATYPE.VEC3>
    | AddCombinationResult<typeof DATATYPE.INT_VEC4, typeof DATATYPE.VEC4>
    | AddCombinationResult<typeof DATATYPE.UINT_VEC2, typeof DATATYPE.VEC2>
    | AddCombinationResult<typeof DATATYPE.UINT_VEC3, typeof DATATYPE.VEC3>
    | AddCombinationResult<typeof DATATYPE.UINT_VEC4, typeof DATATYPE.VEC4>
    | CommonScalarAddCombinationResult;

  [DATATYPE.INT]:
    | AddCombinationResult<typeof DATATYPE.FLOAT, typeof DATATYPE.FLOAT>
    | AddCombinationResult<typeof DATATYPE.INT, typeof DATATYPE.INT>
    | AddCombinationResult<typeof DATATYPE.UINT, typeof DATATYPE.UINT>
    | AddCombinationResult<typeof DATATYPE.VEC2, typeof DATATYPE.VEC2>
    | AddCombinationResult<typeof DATATYPE.VEC3, typeof DATATYPE.VEC3>
    | AddCombinationResult<typeof DATATYPE.VEC4, typeof DATATYPE.VEC4>
    | AddCombinationResult<typeof DATATYPE.INT_VEC2, typeof DATATYPE.INT_VEC2>
    | AddCombinationResult<typeof DATATYPE.INT_VEC3, typeof DATATYPE.INT_VEC3>
    | AddCombinationResult<typeof DATATYPE.INT_VEC4, typeof DATATYPE.INT_VEC4>
    | AddCombinationResult<typeof DATATYPE.UINT_VEC2, typeof DATATYPE.UINT_VEC2>
    | AddCombinationResult<typeof DATATYPE.UINT_VEC3, typeof DATATYPE.UINT_VEC3>
    | AddCombinationResult<typeof DATATYPE.UINT_VEC4, typeof DATATYPE.UINT_VEC4>
    | CommonScalarAddCombinationResult;

  [DATATYPE.UINT]:
    | AddCombinationResult<typeof DATATYPE.FLOAT, typeof DATATYPE.FLOAT>
    | AddCombinationResult<typeof DATATYPE.INT, typeof DATATYPE.UINT>
    | AddCombinationResult<typeof DATATYPE.UINT, typeof DATATYPE.UINT>
    | AddCombinationResult<typeof DATATYPE.VEC2, typeof DATATYPE.VEC2>
    | AddCombinationResult<typeof DATATYPE.VEC3, typeof DATATYPE.VEC3>
    | AddCombinationResult<typeof DATATYPE.VEC4, typeof DATATYPE.VEC4>
    | AddCombinationResult<typeof DATATYPE.INT_VEC2, typeof DATATYPE.UINT_VEC2>
    | AddCombinationResult<typeof DATATYPE.INT_VEC3, typeof DATATYPE.UINT_VEC3>
    | AddCombinationResult<typeof DATATYPE.INT_VEC4, typeof DATATYPE.UINT_VEC4>
    | AddCombinationResult<typeof DATATYPE.UINT_VEC2, typeof DATATYPE.UINT_VEC2>
    | AddCombinationResult<typeof DATATYPE.UINT_VEC3, typeof DATATYPE.UINT_VEC3>
    | AddCombinationResult<typeof DATATYPE.UINT_VEC4, typeof DATATYPE.UINT_VEC4>
    | CommonScalarAddCombinationResult;

  // Float vectors
  [DATATYPE.VEC2]: VecAddCombinationResult<typeof DATATYPE.VEC2>;
  [DATATYPE.VEC3]: VecAddCombinationResult<typeof DATATYPE.VEC3>;
  [DATATYPE.VEC4]: VecAddCombinationResult<typeof DATATYPE.VEC4>;

  // Signed vectors
  [DATATYPE.INT_VEC2]: IntVecAddCombinationResult<typeof DATATYPE.INT_VEC2>;
  [DATATYPE.INT_VEC3]: IntVecAddCombinationResult<typeof DATATYPE.INT_VEC3>;
  [DATATYPE.INT_VEC4]: IntVecAddCombinationResult<typeof DATATYPE.INT_VEC4>;

  // Unsigned vectors
  [DATATYPE.UINT_VEC2]: UintVecAddCombinationResult<typeof DATATYPE.UINT_VEC2>;
  [DATATYPE.UINT_VEC3]: UintVecAddCombinationResult<typeof DATATYPE.UINT_VEC3>;
  [DATATYPE.UINT_VEC4]: UintVecAddCombinationResult<typeof DATATYPE.UINT_VEC4>;

  // Matrices
  [DATATYPE.MATRIX2]: MatrixAddCombinationResult<typeof DATATYPE.MATRIX2>;
  [DATATYPE.MATRIX3]: MatrixAddCombinationResult<typeof DATATYPE.MATRIX3>;
  [DATATYPE.MATRIX4]: MatrixAddCombinationResult<typeof DATATYPE.MATRIX4>;

  [DATATYPE.MATRIX2x3]: MatrixAddCombinationResult<typeof DATATYPE.MATRIX2x3>;
  [DATATYPE.MATRIX2x4]: MatrixAddCombinationResult<typeof DATATYPE.MATRIX2x4>;
  [DATATYPE.MATRIX3x2]: MatrixAddCombinationResult<typeof DATATYPE.MATRIX3x2>;
  [DATATYPE.MATRIX3x4]: MatrixAddCombinationResult<typeof DATATYPE.MATRIX3x4>;
  [DATATYPE.MATRIX4x2]: MatrixAddCombinationResult<typeof DATATYPE.MATRIX4x2>;
  [DATATYPE.MATRIX4x3]: MatrixAddCombinationResult<typeof DATATYPE.MATRIX4x3>;
};
