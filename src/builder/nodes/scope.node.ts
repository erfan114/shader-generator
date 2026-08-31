import { NotImplementedError } from "../../errors.js";
import { type BuilderNode, NodeModel, type OwnableNode } from "../node.js";

export type ScopeNode<Owner = unknown> = OwnableNode<
  "scope",
  Owner,
  {
    nodes: BuilderNode[];
  }
>;

export class ScopeNodeModel<Owner> extends NodeModel<ScopeNode<Owner>> {
  public createScope(): ScopeNodeModel<typeof this.node> {
    throw new NotImplementedError();
  }
}
