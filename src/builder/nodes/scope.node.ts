import { type BuilderNode, builderNode } from "../node.js";
import { type ArgumentNode } from "./argument.node.js";
import type { VariableNode } from "./variable.node.js";

export type ScopeNode = BuilderNode<
  "scope",
  {
    nodes: BuilderNode[];
    args: Set<ArgumentNode>;
    variables: Set<VariableNode>;
  }
>;

export function createScopeNode(): ScopeNode {
  return builderNode({
    kind: "scope",
    data: {
      nodes: [],
      args: new Set(),
      variables: new Set(),
    },
  });
}
