import type { Datatype } from "../../types.js";
import type { GlobalOwnedNode } from "./global.node.js";

export type IONodeOptions<Type extends Datatype> = {
  name: string;
  type: Type;
  flatten?: boolean;
};

export type IONode<
  Kind extends PropertyKey,
  Type extends Datatype,
> = GlobalOwnedNode<Kind, IONodeOptions<Type>>;
