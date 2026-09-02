import type { Datatype } from "../../types.js";
import { type BuilderNode, builderNode } from "../node.js";

// * ARGUMENT NODE
export type ArgumentNodeOptions<
  Name extends string = string,
  Type extends Datatype = Datatype,
> = {
  name?: Name;
  type: Type;
};

export type ArgumentNode<
  Name extends string = string,
  Type extends Datatype = Datatype,
> = BuilderNode<"argument", ArgumentNodeOptions<Name, Type>>;

export function createArgumentNode<Name extends string, Type extends Datatype>(
  options: ArgumentNodeOptions<Name, Type>,
): ArgumentNode<Name, Type> {
  return builderNode({
    kind: "argument",
    data: options,
  });
}
