import type { BuilderNode } from "@/builder/node.js";
import type { BuildTarget } from "./index.js";

export interface CompilerContext {
  target: BuildTarget;

  indentLevel: number;

  names: Map<BuilderNode, string>;
}
