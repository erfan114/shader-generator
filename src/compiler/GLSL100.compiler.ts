import { DATATYPE, type Datatype } from "@/types.js";
import { createCompiler } from "./compiler.js";
import {
  createFunctionHeader,
  runFunctionNode,
} from "./helpers/function.helper.js";
import { GLSL300_DATATYPE_MAP } from "./GLSL300.compiler.js";

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

          const functionHeader = createFunctionHeader(args);
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
