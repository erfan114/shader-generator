import type { BuilderNode } from "@/builder/node.js";

export interface CompilerContext {
  indentLevel: number;

  names: Map<BuilderNode, string>;
}
