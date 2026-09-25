import { DATATYPE, type Datatype } from "@/types.js";
import { createCompiler } from "./compiler.js";
import { emitLine } from "./emitter.js";
import { SHARED_PARSER_FIELDS } from "./common.js";

export const GLSL300_DATATYPE_MAP = {
  [DATATYPE.FLOAT]: "float",
  [DATATYPE.INT]: "int",
  [DATATYPE.UINT]: "uint",
  [DATATYPE.BOOL]: "bool",

  [DATATYPE.VEC2]: "vec2",
  [DATATYPE.VEC3]: "vec3",
  [DATATYPE.VEC4]: "vec4",

  [DATATYPE.INT_VEC2]: "ivec2",
  [DATATYPE.INT_VEC3]: "ivec3",
  [DATATYPE.INT_VEC4]: "ivec4",

  [DATATYPE.UINT_VEC2]: "uvec2",
  [DATATYPE.UINT_VEC3]: "uvec3",
  [DATATYPE.UINT_VEC4]: "uvec4",

  [DATATYPE.BOOL_VEC2]: "bvec2",
  [DATATYPE.BOOL_VEC3]: "bvec3",
  [DATATYPE.BOOL_VEC4]: "bvec4",

  [DATATYPE.MATRIX2]: "mat2",
  [DATATYPE.MATRIX3]: "mat3",
  [DATATYPE.MATRIX4]: "mat4",

  [DATATYPE.MATRIX2x3]: "mat2x3",
  [DATATYPE.MATRIX2x4]: "mat2x4",
  [DATATYPE.MATRIX3x2]: "mat3x2",
  [DATATYPE.MATRIX3x4]: "mat3x4",
  [DATATYPE.MATRIX4x2]: "mat4x2",
  [DATATYPE.MATRIX4x3]: "mat4x3",

  [DATATYPE.SAMPLER_2D]: "sampler2D",
  [DATATYPE.INT_SAMPLER_2D]: "isampler2D",
  [DATATYPE.UINT_SAMPLER_2D]: "usampler2D",

  [DATATYPE.SAMPLER_3D]: "sampler3D",
  [DATATYPE.INT_SAMPLER_3D]: "isampler3D",
  [DATATYPE.UINT_SAMPLER_3D]: "usampler3D",

  [DATATYPE.SAMPLER_CUBE]: "samplerCube",
  [DATATYPE.INT_SAMPLER_CUBE]: "isamplerCube",
  [DATATYPE.UINT_SAMPLER_CUBE]: "usamplerCube",
} as const satisfies Record<Datatype, string>;

export const GLSL300Compiler = createCompiler({
  context: {
    datatypeParser: (datatype) => GLSL300_DATATYPE_MAP[datatype],
    parser: {
      ...SHARED_PARSER_FIELDS,
      input: (context, node) => {
        return {
          request: emitLine({
            content: `in ${context.datatypeParser(node.data.type)} ${context.names.getName(node)};`,
          }),
        };
      },
      output: (context, node) => {
        return {
          request: emitLine({
            content: `out ${context.datatypeParser(node.data.type)} ${context.names.getName(node)};`,
          }),
        };
      },
    },
  },
});
