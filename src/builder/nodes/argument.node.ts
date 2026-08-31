import type { Datatype } from "../../types.js";
import type { OwnableNode } from "../node.js";
import type { ScopeNode } from "./scope.node.js";

export type ArgumentNodeOptions<Type extends Datatype> = {
  name: string;
  type: Type;
};

export type ArgumentNode<
  Type extends Datatype = Datatype,
  Owner extends ScopeNode = ScopeNode,
> = OwnableNode<
  "argument",
  Owner,
  {
    name: string;
    type: Type;
  }
>;
