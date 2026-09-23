import { DATATYPE, type Datatype } from "@/types.js";
import { createCompiler } from "./compiler.js";
import { runFunctionNode } from "./helpers/function.helper.js";

const DATATYPE_MAP = {
  [DATATYPE.FLOAT]: "float",
  [DATATYPE.INT]: "int",
  [DATATYPE.UINT]: "U32",
  [DATATYPE.BOOL]: "bool",

  [DATATYPE.VEC2]: "vec2",
  [DATATYPE.VEC3]: "vec3",
  [DATATYPE.VEC4]: "vec4",

  [DATATYPE.INT_VEC2]: "ivec2",
  [DATATYPE.INT_VEC3]: "ivec3",
  [DATATYPE.INT_VEC4]: "ivec4",

  [DATATYPE.UINT_VEC2]: "UVec2",
  [DATATYPE.UINT_VEC3]: "UVec3",
  [DATATYPE.UINT_VEC4]: "UVec4",

  [DATATYPE.BOOL_VEC2]: "bvec2",
  [DATATYPE.BOOL_VEC3]: "bvec3",
  [DATATYPE.BOOL_VEC4]: "bvec4",

  [DATATYPE.MATRIX2]: "mat2",
  [DATATYPE.MATRIX3]: "mat3",
  [DATATYPE.MATRIX4]: "mat4",
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
    datatypeParser: (datatype) => DATATYPE_MAP[datatype],
  },

  emit: ({ nodes, emitter, names, context }) => {
    for (const node of nodes) {
      switch (node.kind) {
        case "input":
          emitter.line(
            `attribute ${context.datatypeParser(node.data.type)} ${names.getName(node)}`,
          );
          break;

        case "output":
          emitter.line(
            `varying ${context.datatypeParser(node.data.type)} ${names.getName(node)}`,
          );
          break;

        case "uniform":
          emitter.line(
            `uniform ${context.datatypeParser(node.data.type)} ${names.getName(node)}`,
          );
          break;

        case "function": {
          const args = node.data.args.map((arg) => {
            const name = names.getName(arg);
            const type = context.datatypeParser(arg.data.type);

            return `${type} ${name}`;
          });

          const functionHeader = `(${args.join(", ")})`;
          const bodyNodes = runFunctionNode(node);

          emitter.block(functionHeader, () => {
            // TODO: Handle each type
          });

          break;
        }

        default:
          throw new Error(`Unhandled node in GLSL100: ${node satisfies never}`);
      }
    }

    return emitter.toString();
  },
});
