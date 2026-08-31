import { type BuilderNode, NodeModel, type OwnableNode } from "../node.js";
import type { DefineNode } from "./define.node.js";

export type GlobalNode = BuilderNode<
  "global",
  {
    defines: DefineNode[];
  }
>;

export type GlobalOwnedNode<
  Kind extends PropertyKey = PropertyKey,
  Data = unknown,
> = OwnableNode<Kind, GlobalNode, Data>;

export class GlobalNodeModel extends NodeModel<GlobalNode> {}
