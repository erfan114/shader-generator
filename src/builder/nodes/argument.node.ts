import type { Datatype } from "@/types.js";

import { type BuilderNode, builderNode } from "../node.js";

export const ARGUMENT_KIND = "argument";

// * ARGUMENT NODE
export type ArgumentNameVariant = string | undefined;

export type ArgumentNodeOptions<
  Name extends ArgumentNameVariant = ArgumentNameVariant,
  Type extends Datatype = Datatype,
> = {
  name?: Name;
  type: Type;
};

export type ArgumentNode<
  Name extends ArgumentNameVariant = ArgumentNameVariant,
  Type extends Datatype = Datatype,
> = BuilderNode<typeof ARGUMENT_KIND, ArgumentNodeOptions<Name, Type>>;

export function argument<
  Name extends ArgumentNameVariant,
  Type extends Datatype,
>(options: ArgumentNodeOptions<Name, Type>): ArgumentNode<Name, Type> {
  return builderNode({
    kind: ARGUMENT_KIND,
    data: options,
  });
}
