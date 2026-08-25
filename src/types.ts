// * UTILITY TYPES
export type Vector2<T> = [T, T];
export type Vector3<T> = [T, T, T];
export type Vector4<T> = [T, T, T, T];

// * DATA TYPES
export const DATATYPE = {
  // Scalar
  FLOAT: 0x00,
  INT: 0x01,
  UINT: 0x02,
  BOOL: 0x03,

  // Vector
  VEC2: 0x04,
  VEC3: 0x05,
  VEC4: 0x06,

  INT_VEC2: 0x07,
  INT_VEC3: 0x08,
  INT_VEC4: 0x09,

  UINT_VEC2: 0x0a,
  UINT_VEC3: 0x0b,
  UINT_VEC4: 0x0c,

  BOOL_VEC2: 0x0d,
  BOOL_VEC3: 0x0e,
  BOOL_VEC4: 0x0f,

  // Matrix
  MATRIX2: 0x10,
  MATRIX3: 0x11,
  MATRIX4: 0x12,

  MATRIX2x3: 0x13,
  MATRIX2x4: 0x14,

  MATRIX3x2: 0x15,
  MATRIX3x4: 0x16,

  MATRIX4x2: 0x17,
  MATRIX4x3: 0x18,

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

export type DataType = (typeof DATATYPE)[keyof typeof DATATYPE];
