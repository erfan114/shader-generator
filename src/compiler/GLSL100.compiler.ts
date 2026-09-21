import { DATATYPE } from "@/types.js";
import { createCompiler } from "./compiler.js";

export const GLSL100Compiler = createCompiler({
  context: {
    datatypeParser: (datatype) => {
      switch (datatype) {
        case DATATYPE.FLOAT:
          return "float";
        case DATATYPE.INT:
          return "int";
        case DATATYPE.UINT:
          return "U32";
        case DATATYPE.BOOL:
          return "bool";

        case DATATYPE.VEC2:
          return "vec2";
        case DATATYPE.VEC3:
          return "vec3";
        case DATATYPE.VEC4:
          return "vec4";

        case DATATYPE.INT_VEC2:
          return "ivec2";
        case DATATYPE.INT_VEC3:
          return "ivec3";
        case DATATYPE.INT_VEC4:
          return "ivec4";

        case DATATYPE.UINT_VEC2:
          return "UVec2";
        case DATATYPE.UINT_VEC3:
          return "UVec3";
        case DATATYPE.UINT_VEC4:
          return "UVec4";

        case DATATYPE.BOOL_VEC2:
          return "bvec2";
        case DATATYPE.BOOL_VEC3:
          return "bvec3";
        case DATATYPE.BOOL_VEC4:
          return "bvec4";

        // Square floating-point matrices
        case DATATYPE.MATRIX2:
          return "mat2";
        case DATATYPE.MATRIX3:
          return "mat3";
        case DATATYPE.MATRIX4:
          return "mat4";
        case DATATYPE.MATRIX2x3:
          return "Mat2x3";
        case DATATYPE.MATRIX2x4:
          return "Mat2x4";
        case DATATYPE.MATRIX3x2:
          return "Mat3x2";
        case DATATYPE.MATRIX3x4:
          return "Mat3x4";
        case DATATYPE.MATRIX4x2:
          return "Mat4x2";
        case DATATYPE.MATRIX4x3:
          return "Mat4x3";

        // Samplers
        case DATATYPE.SAMPLER_2D:
          return "sampler2D";

        case DATATYPE.INT_SAMPLER_2D:
        case DATATYPE.UINT_SAMPLER_2D:
          return "sampler2D";

        case DATATYPE.SAMPLER_3D:
        case DATATYPE.INT_SAMPLER_3D:
        case DATATYPE.UINT_SAMPLER_3D:
          return "sampler2D";

        case DATATYPE.SAMPLER_CUBE:
          return "samplerCube";

        case DATATYPE.INT_SAMPLER_CUBE:
        case DATATYPE.UINT_SAMPLER_CUBE:
          return "samplerCube";
      }
    },
  },
  emit: ({ nodes, emitter, names }) => {
    for (const node of nodes) {
      switch (node.kind) {
        case "input": {
          emitter.line(`attribute ? ${names.getName(node)}`);

          break;
        }
        case "output": {
          emitter.line(`varying ? ${names.getName(node)}`);

          break;
        }
        case "uniform": {
          emitter.line(`uniform ? ${names.getName(node)}`);

          break;
        }
      }
    }

    return emitter.toString();
  },
});
