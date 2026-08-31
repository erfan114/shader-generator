import { NodeModel } from "../node.js";
import type { GlobalOwnedNode } from "./global.node.js";

export type DefineNodeOptions = {};
export type DefineNode = GlobalOwnedNode<"define", DefineNodeOptions>;

export class DefineNodeModel extends NodeModel<DefineNode> {}
