import type {
  DATATYPE,
  DataType,
  Matrix2,
  Matrix2x3,
  Matrix2x4,
  Matrix3,
  Matrix3x2,
  Matrix3x4,
  Matrix4,
  Matrix4x2,
  Matrix4x3,
  Vec2,
  Vec3,
  Vec4,
} from "../../types.js";

type VariableValueType<T extends DataType> = {
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

export type VariableObjectProps<T extends DataType> = {
  name: string;
  type: T;
  value: VariableValueType<T> | null;
};

export class VariableObject<T extends DataType = DataType> {
  public constructor(public readonly options: VariableObjectProps<T>) {}
}
