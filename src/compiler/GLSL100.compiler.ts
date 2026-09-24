import { DATATYPE, type Datatype } from "@/types.js";
import { createCompiler } from "./compiler.js";
import { GLSL300_DATATYPE_MAP } from "./GLSL300.compiler.js";
import { emitLine } from "./emitter.js";
import { SHARED_PARSER_FIELDS } from "./common.js";

export const GLSL100_DATATYPE_MAP = {
  ...GLSL300_DATATYPE_MAP,

  [DATATYPE.UINT]: "U32",

  [DATATYPE.UINT_VEC2]: "UVec2",
  [DATATYPE.UINT_VEC3]: "UVec3",
  [DATATYPE.UINT_VEC4]: "UVec4",

  [DATATYPE.MATRIX2x3]: "Mat2x3",
  [DATATYPE.MATRIX2x4]: "Mat2x4",
  [DATATYPE.MATRIX3x2]: "Mat3x2",
  [DATATYPE.MATRIX3x4]: "Mat3x4",
  [DATATYPE.MATRIX4x2]: "Mat4x2",
  [DATATYPE.MATRIX4x3]: "Mat4x3",

  [DATATYPE.SAMPLER_2D]: "sampler2D",

  [DATATYPE.INT_SAMPLER_2D]: "sampler2D",
  [DATATYPE.UINT_SAMPLER_2D]: "sampler2D",

  [DATATYPE.SAMPLER_3D]: "sampler2D",
  [DATATYPE.INT_SAMPLER_3D]: "sampler2D",
  [DATATYPE.UINT_SAMPLER_3D]: "sampler2D",

  [DATATYPE.SAMPLER_CUBE]: "samplerCube",
  [DATATYPE.INT_SAMPLER_CUBE]: "samplerCube",
  [DATATYPE.UINT_SAMPLER_CUBE]: "samplerCube",
} as const satisfies Record<Datatype, string>;

export const GLSL100Compiler = createCompiler({
  context: {
    datatypeParser: (datatype) => GLSL100_DATATYPE_MAP[datatype],
    parser: {
      ...SHARED_PARSER_FIELDS,
      input: (context, node) => {
        return emitLine({
          content: `attribute ${context.datatypeParser(node.data.type)} ${context.names.getName(node)};`,
        });
      },
      output: (context, node) => {
        return emitLine({
          content: `varying ${context.datatypeParser(node.data.type)} ${context.names.getName(node)};`,
        });
      },
    },
  },
});
