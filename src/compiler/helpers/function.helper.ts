import type { ArgumentNode } from "@/builder/nodes/argument.node.js";
import type {
  FunctionBodyYield,
  FunctionNode,
} from "@/builder/nodes/function.node.js";
import type { ValueDatatype } from "@/builder/nodes/value.node.js";

export function createFunctionHeader(args: string[]) {
  return `(${args.join(", ")})`;
}

export function runFunctionNode(
  node: FunctionNode<ArgumentNode[], ValueDatatype | null>,
): FunctionBodyYield[] {
  const nodes: FunctionBodyYield[] = [];
  const instance = node.data.body(...node.data.args);

  let current = instance.next();

  while (!current.done) {
    nodes.push(current.value);

    current = instance.next(current.value);
  }

  return nodes;
}
