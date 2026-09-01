import type { BuilderNode } from "../../node.js";

export type OperationNode<
  Kind extends string = string,
  L = unknown,
  R = unknown,
> = BuilderNode<
  Kind,
  {
    left: L;
    right: R;
  }
>;
