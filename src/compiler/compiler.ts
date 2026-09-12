import type { CompilerContext } from "./context.js";
import { SourceEmitter } from "./emitter.js";
import type { BuilderNodes } from "@/builder/builder.js";
import { CompilerNames } from "./names.js";

export type CompilerFactoryOptions = {
  context: CompilerContext;
  emit: (props: {
    nodes: BuilderNodes;
    emitter: SourceEmitter;
    names: CompilerNames;
  }) => string;
};

type CompileArgs = [nodes: BuilderNodes];

export type Compiler = {
  compile(...args: CompileArgs): string;
};

export function createCompiler(options: CompilerFactoryOptions): Compiler {
  return {
    compile: (nodes) => {
      return options.emit({
        emitter: new SourceEmitter(),
        names: new CompilerNames(),
        nodes,
      });
    },
  };
}
