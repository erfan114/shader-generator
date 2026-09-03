import type { Datatype } from "@/types.js";

import { type BuilderNode, builderNode } from "../node.js";

const ARGUMENT_KIND = "argument";

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
> = BuilderNode<typeof ARGUMENT_KIND, ArgumentNodeOptions<Name, Type>>;

export function argument<Name extends string, Type extends Datatype>(
  options: ArgumentNodeOptions<Name, Type>,
): ArgumentNode<Name, Type> {
  return builderNode({
    kind: ARGUMENT_KIND,
    data: options,
  });
}
