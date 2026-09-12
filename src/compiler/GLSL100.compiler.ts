import { createCompiler } from "./compiler.js";

export const GLSL100Compiler = createCompiler({
  context: {},
  emit: ({ nodes, emitter }) => {
    // TODO: Process nodes

    return emitter.toString();
  },
});
