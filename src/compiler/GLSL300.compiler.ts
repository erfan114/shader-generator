import { NotImplementedError } from "@/errors.js";
import { createCompiler } from "./compiler.js";

export const GLSL300Compiler = createCompiler({
  context: {
    datatypeParser: (datatype) => {
      throw new NotImplementedError();
    },
  },
  emit: ({ nodes, emitter }) => {
    // TODO: Process nodes

    return emitter.toString();
  },
});
