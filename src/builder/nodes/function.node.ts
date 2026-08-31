import { NodeModel } from "../node.js";
import type { GlobalOwnedNode } from "./global.node.js";

export type FunctionNode = GlobalOwnedNode<"function">;

export class FunctionNodeModel extends NodeModel<FunctionNode> {}
