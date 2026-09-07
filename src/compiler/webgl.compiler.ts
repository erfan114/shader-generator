import type { BuilderNode } from "@/builder/node.js";
import { Compiler } from "./compiler.js";
import type { CompilerContext } from "./context.js";
import { NotImplementedError } from "@/errors.js";

export class WebGLCompiler extends Compiler {
  protected createContext(): CompilerContext {
    throw new NotImplementedError();
  }
  protected emit(
    nodes: readonly BuilderNode[],
    context: CompilerContext,
  ): string {
    throw new NotImplementedError();
  }
}
