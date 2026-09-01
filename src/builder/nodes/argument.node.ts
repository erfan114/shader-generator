import type { Datatype, Ownable } from "../../types.js";
import type { BuilderNode } from "../node.js";
import type { ScopeNode } from "./scope.node.js";

// * ARGUMENT NODE
export type ArgumentNodeOptions<
  Name extends string = string,
  Type extends Datatype = Datatype,
> = {
  name: Name;
  type: Type;
};

export type ArgumentNode<
  Name extends string = string,
  Type extends Datatype = Datatype,
> = BuilderNode<
  "argument",
  {
    name: Name;
    type: Type;
  }
>;

export function createArgumentNode<Name extends string, Type extends Datatype>(
  options: ArgumentNodeOptions<Name, Type> & Ownable<ScopeNode>,
): ArgumentNode<Name, Type> {
  return {
    kind: "argument",
    ...options,
  };
}

export class ArgumentNodeModel<Name extends string, Type extends Datatype> {
  constructor(public node: ArgumentNode<Name, Type>) {}

  public get name() {
    return this.node.name;
  }

  public get type() {
    return this.node.type;
  }
}
