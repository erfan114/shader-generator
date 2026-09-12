import { createCompiler } from "./compiler.js";

export const GLSL100Compiler = createCompiler({
  context: {},
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
