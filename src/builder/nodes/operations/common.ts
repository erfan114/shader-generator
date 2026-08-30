import type { BuilderNode } from "../../node.js";

export type OperationNode<
  Kind extends PropertyKey = PropertyKey,
  L = unknown,
  R = unknown,
> = BuilderNode<
  Kind,
  {
    left: L;
    right: R;
  }
>;
