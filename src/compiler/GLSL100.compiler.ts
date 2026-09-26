import { DATATYPE } from "@/types.js";
import { createCompiler } from "./compiler.js";
import { GLSL300_DATATYPE_MAP } from "./GLSL300.compiler.js";
import { emitLine } from "./emitter.js";
import { SHARED_PARSER_FIELDS, type DatatypeMap } from "./common.js";

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

export const GLSL100Compiler = createCompiler({
  handlers: {
    datatypeParser: (datatype) => GLSL100_DATATYPE_MAP[datatype],
  },
  context: {
    parser: {
      ...SHARED_PARSER_FIELDS,
      input: (context, node) => {
        return {
          request: emitLine({
            content: `attribute ${context.parseDatatype(node.data.type)} ${context.names.getName(node)};`,
          }),
        };
      },
      output: (context, node) => {
        return {
          request: emitLine({
            content: `varying ${context.parseDatatype(node.data.type)} ${context.names.getName(node)};`,
          }),
        };
      },
    },
  },
});
