import { NotImplementedError } from "../../errors.js";
import { NodeModel } from "../node.js";
import type { GlobalOwnedNode } from "./global.node.js";
import type { ScopeNodeModel } from "./scope.node.js";

export type FunctionNodeOptions = {};

export type FunctionNode = GlobalOwnedNode<"function", FunctionNodeOptions>;

export class FunctionNodeModel extends NodeModel<FunctionNode> {
  public createScope(): ScopeNodeModel<typeof this.node> {
    throw new NotImplementedError();
  }
}

export function createFunctionNode(
  options: FunctionNodeOptions & Pick<FunctionNode, "owner">,
): FunctionNode {
  return {
    kind: "function",
    ...options,
  };
}
