import type { BooleanExpression } from "../logical/common.js";
import type { ControlFlowBody } from "./common.js";
import { builderNode, type BuilderNode } from "@/builder/node.js";

export const IF_KIND = "if";

export type IfNodeOptions = {
  expression: BooleanExpression;
  body: ControlFlowBody;
};

export type IfNode = BuilderNode<typeof IF_KIND, IfNodeOptions>;

export function if_(options: IfNodeOptions): IfNode {
  return builderNode({
    kind: IF_KIND,
    data: options,
  });
}
