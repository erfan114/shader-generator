import { type BuilderNode, builderNode } from "../node.js";
import type { ArgumentNameVariant, ArgumentNode } from "./argument.node.js";
import type { DoNode } from "./control-flow/do.node.js";
import type { ForNode } from "./control-flow/for.node.js";
import type { IfNode } from "./control-flow/if.node.js";
import type { SwitchNode } from "./control-flow/switch.node.js";
import type { WhileNode } from "./control-flow/while.node.js";
import type { FunctionNodeReturnVariant } from "./function.node.js";
import type { BreakNode } from "./jump/break.node.js";
import type { ContinueNode } from "./jump/continue.node.js";
import type { DiscardNode } from "./jump/discard.node.js";
import type { ReturnNode } from "./jump/return.node.js";
import type { ValueDatatype, ValueNode } from "./value.node.js";
import type { VariableNode } from "./variable.node.js";

// * SCOPE BODY
export type ScopeBodyYield =
  | VariableNode
  | DoNode
  | ForNode
  | IfNode
  | SwitchNode
  | WhileNode
  | BreakNode
  | ContinueNode
  | DiscardNode
  | ReturnNode
  | ScopeNode;

export type ScopeGenerator<Returns extends FunctionNodeReturnVariant> =
  Generator<
    ScopeBodyYield,
    Returns extends null
      ? void
      : Returns extends ValueDatatype
        ? | ValueNode<Returns>
          | VariableNode<Returns>
          | ArgumentNode<ArgumentNameVariant, Returns>
        : never
  >;

export type ScopeBody<Returns extends FunctionNodeReturnVariant> =
  () => ScopeGenerator<Returns>;

// * SCOPE NODE
export const SCOPE_KIND = "scope";

export type ScopeNodeOptions<Returns extends FunctionNodeReturnVariant = null> =
  {
    body: ScopeBody<Returns>;
  };

export type ScopeNode<
  Returns extends FunctionNodeReturnVariant = FunctionNodeReturnVariant,
> = BuilderNode<typeof SCOPE_KIND, ScopeNodeOptions<Returns>>;

export function scope<Returns extends FunctionNodeReturnVariant>(
  body: ScopeBody<Returns>,
): ScopeNode<Returns> {
  return builderNode({
    kind: SCOPE_KIND,
    data: {
      body,
    },
  });
}
