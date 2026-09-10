import type { BooleanExpression } from "../logical/common.js";
import type { ControlFlowBody } from "./common.js";
import { builderNode, type BuilderNode } from "@/builder/node.js";

export const WHILE_KIND = "while";

export type WhileNodeOptions = {
  expression: BooleanExpression;
  body: ControlFlowBody;
};

export type WhileNode = BuilderNode<typeof WHILE_KIND, WhileNodeOptions>;

export function while_(options: WhileNodeOptions): WhileNode {
  return builderNode({
    kind: WHILE_KIND,
    data: options,
  });
}
