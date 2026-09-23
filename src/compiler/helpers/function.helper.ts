import type { BuilderNode } from "@/builder/node.js";
import type { ArgumentNode } from "@/builder/nodes/argument.node.js";
import type { FunctionNode } from "@/builder/nodes/function.node.js";
import type { ValueDatatype } from "@/builder/nodes/value.node.js";

export function createFunctionHeader(args: string[]) {
  return `(${args.join(", ")})`;
}

export function runFunctionNode(
  node: FunctionNode<ArgumentNode[], ValueDatatype | null>,
): BuilderNode[] {
  const nodes: BuilderNode[] = [];
  const instance = node.data.body(...node.data.args);

  let current = instance.next();

  while (!current.done) {
    nodes.push(current.value);

    current = instance.next(current.value);
  }

  return nodes;
}
