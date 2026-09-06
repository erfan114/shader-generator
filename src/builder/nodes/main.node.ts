import {
  fn,
  type FunctionBody,
  type FunctionDefinitionGenerator,
  type FunctionNode,
  isFunctionNode,
} from "./function.node.js";
import type { ValueDatatype } from "./value.node.js";

export type MainNode<Returns extends ValueDatatype | null = null> =
  FunctionNode<[], Returns>;

export function main<Returns extends ValueDatatype | null>(
  definitionGenerator: FunctionDefinitionGenerator<[], Returns>,
  body: FunctionBody<[], NoInfer<Returns>>,
): MainNode<Returns> {
  return fn<[], Returns>(definitionGenerator, body);
}

export function isMainNode(node: unknown): node is MainNode {
  return isFunctionNode(node) && node.data.args.length === 0;
}
