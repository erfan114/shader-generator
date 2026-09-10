import type { BooleanExpression } from "../logical/common.js";
import type { ControlFlowBody } from "./common.js";
import { builderNode, type BuilderNode } from "@/builder/node.js";

export const DO_KIND = "do";

export type DoNodeOptions = {
  expression: BooleanExpression;
  body: ControlFlowBody;
};

export type DoNode = BuilderNode<typeof DO_KIND, DoNodeOptions>;

export function do_(options: DoNodeOptions): DoNode {
  return builderNode({
    kind: DO_KIND,
    data: options,
  });
}
