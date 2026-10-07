import { DATATYPE } from "@/types.js";
import { createCompiler } from "./compiler.js";
import { type DatatypeMap } from "./common.js";
import { KEYWORD, type CompilerKeywordMap } from "./keyword.js";

export const GLSL300_DATATYPE_MAP = {
  [DATATYPE.FLOAT]: { value: "float" },
  [DATATYPE.INT]: { value: "int" },
  [DATATYPE.UINT]: { value: "uint" },
  [DATATYPE.BOOL]: { value: "bool" },

  [DATATYPE.VEC2]: { value: "vec2" },
  [DATATYPE.VEC3]: { value: "vec3" },
  [DATATYPE.VEC4]: { value: "vec4" },

  [DATATYPE.INT_VEC2]: { value: "ivec2" },
  [DATATYPE.INT_VEC3]: { value: "ivec3" },
  [DATATYPE.INT_VEC4]: { value: "ivec4" },

  [DATATYPE.UINT_VEC2]: { value: "uvec2" },
  [DATATYPE.UINT_VEC3]: { value: "uvec3" },
  [DATATYPE.UINT_VEC4]: { value: "uvec4" },

  [DATATYPE.BOOL_VEC2]: { value: "bvec2" },
  [DATATYPE.BOOL_VEC3]: { value: "bvec3" },
  [DATATYPE.BOOL_VEC4]: { value: "bvec4" },

  [DATATYPE.MATRIX2]: { value: "mat2" },
  [DATATYPE.MATRIX3]: { value: "mat3" },
  [DATATYPE.MATRIX4]: { value: "mat4" },

  [DATATYPE.MATRIX2x3]: { value: "mat2x3" },
  [DATATYPE.MATRIX2x4]: { value: "mat2x4" },
  [DATATYPE.MATRIX3x2]: { value: "mat3x2" },
  [DATATYPE.MATRIX3x4]: { value: "mat3x4" },
  [DATATYPE.MATRIX4x2]: { value: "mat4x2" },
  [DATATYPE.MATRIX4x3]: { value: "mat4x3" },

  [DATATYPE.SAMPLER_2D]: { value: "sampler2D" },
  [DATATYPE.INT_SAMPLER_2D]: { value: "isampler2D" },
  [DATATYPE.UINT_SAMPLER_2D]: { value: "usampler2D" },

  [DATATYPE.SAMPLER_3D]: { value: "sampler3D" },
  [DATATYPE.INT_SAMPLER_3D]: { value: "isampler3D" },
  [DATATYPE.UINT_SAMPLER_3D]: { value: "usampler3D" },

  [DATATYPE.SAMPLER_CUBE]: { value: "samplerCube" },
  [DATATYPE.INT_SAMPLER_CUBE]: { value: "isamplerCube" },
  [DATATYPE.UINT_SAMPLER_CUBE]: { value: "usamplerCube" },
} as const satisfies DatatypeMap;

const GLSL300_KEYWORD_MAP = {
  [KEYWORD.INPUT]: "in",
  [KEYWORD.OUTPUT]: "out",
} as const satisfies CompilerKeywordMap;

export const GLSL300Compiler = createCompiler({
  handlers: {
    keywordParser: (keyword) => GLSL300_KEYWORD_MAP[keyword],
    datatypeParser: (datatype) => GLSL300_DATATYPE_MAP[datatype],
  },
});
