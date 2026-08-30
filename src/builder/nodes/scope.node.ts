import type { BuilderNode, OwnableNode } from "../node.js";

export type ScopeNode<Owner = unknown> = OwnableNode<
  "scope",
  Owner,
  {
    nodes: BuilderNode[];
  }
>;
