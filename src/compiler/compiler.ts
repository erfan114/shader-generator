import type { CompilerContext, CompilerContextOptions } from "./context.js";
import { SourceEmitter } from "./emitter.js";
import type { BuilderNodes } from "@/builder/builder.js";
import { CompilerNames } from "./names.js";

export type CompilerFactoryOptions = {
  context: CompilerContextOptions;
};

type CompileArgs = [nodes: BuilderNodes];

export type Compiler = {
  compile(...args: CompileArgs): string;
};

export function createCompiler(options: CompilerFactoryOptions): Compiler {
  const context: CompilerContext = {
    ...options.context,
    names: new CompilerNames(),
  };

  const generateEmitterRequest = (node: BuilderNodes[number]) => {
    switch (node.kind) {
      case "input": {
        return context.parser.input(context, node);
      }

      case "output": {
        return context.parser.output(context, node);
      }

      case "uniform": {
        return context.parser.uniform(context, node);
      }

      case "function": {
        return context.parser.function(context, node);
      }

      default:
        throw new Error(`Unhandled node: ${node satisfies never}`);
    }
  };

  return {
    compile: (nodes) => {
      const emitter = new SourceEmitter();

      for (const node of nodes) {
        const request = generateEmitterRequest(node);

        emitter.process(request);
      }

      return emitter.toString();
    },
  };
}
