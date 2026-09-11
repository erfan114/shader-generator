import { NotImplementedError } from "@/errors.js";
import { Compiler } from "./compiler.js";
import type { CompilerContext } from "./context.js";
import type { BuilderNode } from "@/builder/node.js";

export class GLSL300Compiler extends Compiler {
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
