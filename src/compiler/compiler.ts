import type { BuilderNode } from "@/builder/node.js";
import type { CompilerContext } from "./context.js";

export abstract class Compiler {
  public compile(nodes: readonly BuilderNode[]): string {
    const context = this.createContext();
    const normalized = this.normalize(nodes, context);

    this.validate(normalized, context);

    return this.emit(normalized, context);
  }

  protected abstract createContext(): CompilerContext;

  protected normalize(
    nodes: readonly BuilderNode[],
    context: CompilerContext,
  ): readonly BuilderNode[] {
    return nodes;
  }

  protected validate(
    nodes: readonly BuilderNode[],
    context: CompilerContext,
  ): void {
    // TODO: Implement it
  }

  protected abstract emit(
    nodes: readonly BuilderNode[],
    context: CompilerContext,
  ): string;
}
