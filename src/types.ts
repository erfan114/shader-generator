import type { ObjectValues } from "./helpers/object.helper.js";
import type { Vec2 } from "./structures/vec2.structure.js";
import type { Vec3 } from "./structures/vec3.structure.js";
import type { Vec4 } from "./structures/vec4.structure.js";

export type Matrix3x4<T> = Vec3<Vec4<T>>;

export type Matrix4x2<T> = Vec4<Vec2<T>>;
export type Matrix4x3<T> = Vec4<Vec3<T>>;

// * SCALAR TYPES
export const SCALAR_DATATYPE = {
  FLOAT: 0x00,
  INT: 0x01,
  UINT: 0x02,
  BOOL: 0x03,
} as const;

export type ScalarDataType = ObjectValues<typeof SCALAR_DATATYPE>;

// * FLOAT VECTOR TYPES
export const FLOAT_VEC_DATATYPE = {
  VEC2: 0x04,
  VEC3: 0x05,
  VEC4: 0x06,
} as const;

export type FloatVecDatatype = ObjectValues<typeof FLOAT_VEC_DATATYPE>;

// * SIGNED VECTOR TYPES
export const INT_VEC_DATATYPE = {
  INT_VEC2: 0x07,
  INT_VEC3: 0x08,
  INT_VEC4: 0x09,
} as const;

export type IntVecDatatype = ObjectValues<typeof INT_VEC_DATATYPE>;

// * UNSIGNED VECTOR TYPES
export const UINT_VEC_DATATYPE = {
  UINT_VEC2: 0x0a,
  UINT_VEC3: 0x0b,
  UINT_VEC4: 0x0c,
} as const;

export type UintVecDatatype = ObjectValues<typeof UINT_VEC_DATATYPE>;

// * BOOLEAN VECTOR TYPES
export const BOOL_VEC_DATATYPE = {
  BOOL_VEC2: 0x0d,
  BOOL_VEC3: 0x0e,
  BOOL_VEC4: 0x0f,
} as const;

export type BoolVecDatatype = ObjectValues<typeof BOOL_VEC_DATATYPE>;

// * MATRIX TYPES
export const MATRIX_DATATYPE = {
  MATRIX2: 0x10,
  MATRIX3: 0x11,
  MATRIX4: 0x12,

  MATRIX2x3: 0x13,
  MATRIX2x4: 0x14,

  MATRIX3x2: 0x15,
  MATRIX3x4: 0x16,

  MATRIX4x2: 0x17,
  MATRIX4x3: 0x18,
} as const;

export type MatrixDatatype = ObjectValues<typeof MATRIX_DATATYPE>;

// * SAMPLER TYPES
export const SAMPLER_DATATYPE = {
  // Sampler
  SAMPLER_2D: 0x19,
  INT_SAMPLER_2D: 0x1b,
  UINT_SAMPLER_2D: 0x1c,

  SAMPLER_3D: 0x1d,
  INT_SAMPLER_3D: 0x1f,
  UINT_SAMPLER_3D: 0x20,

  SAMPLER_CUBE: 0x21,
  INT_SAMPLER_CUBE: 0x23,
  UINT_SAMPLER_CUBE: 0x24,
} as const;

export type SamplerDatatype = ObjectValues<typeof SAMPLER_DATATYPE>;

// * ALL TYPES
export const DATATYPE = {
  ...SCALAR_DATATYPE,
  ...FLOAT_VEC_DATATYPE,
  ...INT_VEC_DATATYPE,
  ...UINT_VEC_DATATYPE,
  ...BOOL_VEC_DATATYPE,
  ...MATRIX_DATATYPE,
  ...SAMPLER_DATATYPE,
} as const;

export type Datatype = ObjectValues<typeof DATATYPE>;

// * OWNABLE
export type Ownable<T> = {
  owner: T;
};
