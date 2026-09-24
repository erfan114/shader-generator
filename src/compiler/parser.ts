import type { InputNode } from "@/builder/nodes/input.node.js";
import type { CompilerContext } from "./context.js";
import type { OutputNode } from "@/builder/nodes/output.node.js";
import type { UniformNode } from "@/builder/nodes/uniform.node.js";
import type { FunctionNode } from "@/builder/nodes/function.node.js";
import type { VariableNode } from "@/builder/nodes/variable.node.js";
import type { DoNode } from "@/builder/nodes/control-flow/do.node.js";
import type { ForNode } from "@/builder/nodes/control-flow/for.node.js";
import type { IfNode } from "@/builder/nodes/control-flow/if.node.js";
import type { SwitchNode } from "@/builder/nodes/control-flow/switch.node.js";
import type { WhileNode } from "@/builder/nodes/control-flow/while.node.js";
import type { BreakNode } from "@/builder/nodes/jump/break.node.js";
import type { ContinueNode } from "@/builder/nodes/jump/continue.node.js";
import type { DiscardNode } from "@/builder/nodes/jump/discard.node.js";
import type { ReturnNode } from "@/builder/nodes/jump/return.node.js";
import type { ScopeNode } from "@/builder/nodes/scope.node.js";
import type { BuilderNode } from "@/builder/node.js";

type ParserFieldsMap = {
  input: InputNode;
  output: OutputNode;
  uniform: UniformNode;
  function: FunctionNode;
  variable: VariableNode;
  do: DoNode;
  for: ForNode;
  if: IfNode;
  switch: SwitchNode;
  while: WhileNode;
  break: BreakNode;
  continue: ContinueNode;
  discard: DiscardNode;
  return: ReturnNode;
  scope: ScopeNode;
};

export type ParserFunction<T extends BuilderNode> = (
  context: CompilerContext,
  node: T,
) => string;

export type Parser = {
  [key in keyof ParserFieldsMap]: ParserFunction<ParserFieldsMap[key]>;
};
