import type { BuilderNode } from "@/builder/node.js";
import type { CompilerContext } from "./context.js";
import { SourceEmitter } from "./emitter.js";

type ProcessNodes = readonly BuilderNode[];

export type CompilerFactoryOptions = {
  context: CompilerContext;
  emit: (props: { nodes: ProcessNodes; emitter: SourceEmitter }) => string;
};

type CompileArgs = [nodes: ProcessNodes];

export type Compiler = {
  compile(...args: CompileArgs): string;
};

export function createCompiler(options: CompilerFactoryOptions): Compiler {
  return {
    compile: (nodes) => {
      return options.emit({
        emitter: new SourceEmitter(),
        nodes,
      });
    },
  };
}
