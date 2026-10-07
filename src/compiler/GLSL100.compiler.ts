import { DATATYPE } from "@/types.js";
import { createCompiler } from "./compiler.js";
import { GLSL300_DATATYPE_MAP } from "./GLSL300.compiler.js";
import { type DatatypeMap } from "./common.js";
import { KEYWORD, type CompilerKeywordMap } from "./keyword.js";

export const GLSL100_DATATYPE_MAP = {
  ...GLSL300_DATATYPE_MAP,

  [DATATYPE.UINT]: { value: "U32" },

  [DATATYPE.UINT_VEC2]: { value: "UVec2" },
  [DATATYPE.UINT_VEC3]: { value: "UVec3" },
  [DATATYPE.UINT_VEC4]: { value: "UVec4" },

  [DATATYPE.MATRIX2x3]: { value: "Mat2x3" },
  [DATATYPE.MATRIX2x4]: { value: "Mat2x4" },
  [DATATYPE.MATRIX3x2]: { value: "Mat3x2" },
  [DATATYPE.MATRIX3x4]: { value: "Mat3x4" },
  [DATATYPE.MATRIX4x2]: { value: "Mat4x2" },
  [DATATYPE.MATRIX4x3]: { value: "Mat4x3" },

  [DATATYPE.INT_SAMPLER_2D]: { value: "sampler2D" },
  [DATATYPE.UINT_SAMPLER_2D]: { value: "sampler2D" },

  [DATATYPE.SAMPLER_3D]: { value: "sampler2D" },
  [DATATYPE.INT_SAMPLER_3D]: { value: "sampler2D" },
  [DATATYPE.UINT_SAMPLER_3D]: { value: "sampler2D" },

  [DATATYPE.INT_SAMPLER_CUBE]: { value: "samplerCube" },
  [DATATYPE.UINT_SAMPLER_CUBE]: { value: "samplerCube" },
} as const satisfies DatatypeMap;

const GLSL100_KEYWORD_MAP = {
  [KEYWORD.INPUT]: "attribute",
  [KEYWORD.OUTPUT]: "varying",
} as const satisfies CompilerKeywordMap;

export const GLSL100Compiler = createCompiler({
  handlers: {
    keywordParser: (keyword) => GLSL100_KEYWORD_MAP[keyword],
    datatypeParser: (datatype) => GLSL100_DATATYPE_MAP[datatype],
  },
});
