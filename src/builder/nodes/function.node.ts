import { type Datatype } from "@/types.js";

import { type BuilderNode, builderNode, isBuilderNode } from "../node.js";
import {
  argument,
  type ArgumentNameVariant,
  type ArgumentNode,
  type ArgumentNodeOptions,
} from "./argument.node.js";
import type { ValueDatatype, ValueNode } from "./value.node.js";
import type { VariableNode } from "./variable.node.js";

// * FUNCTION DEFINITION
export type FunctionDefinition<
  Args extends ArgumentNode[] = [],
  Returns extends ValueDatatype | null = null,
> = {
  withArg<Name extends ArgumentNameVariant, Type extends Datatype>(
    options: ArgumentNodeOptions<Name, Type>,
  ): FunctionDefinition<[...Args, ArgumentNode<Name, Type>], Returns>;

  withReturn<NewReturn extends ValueDatatype>(
    returnType: NewReturn,
  ): FunctionDefinition<Args, NewReturn>;
} & Pick<FunctionNodeOptions<Args, Returns>, "args" | "returns">;

export function generateFunctionDefinition<
  Args extends ArgumentNode[] = [],
  R extends ValueDatatype | null = null,
>(
  args: Args = [] as unknown as Args,
  returns: R = null as R,
): FunctionDefinition<Args, R> {
  return {
    args,
    returns,

    withArg(arg) {
      const argNode = argument(arg);

      return generateFunctionDefinition(
        [...args, argNode] as [...Args, typeof argNode],
        returns,
      );
    },

    withReturn(returnType) {
      return generateFunctionDefinition(args, returnType);
    },
  };
}

export type FunctionDefinitionGenerator<
  Args extends ArgumentNode[],
  Return extends ValueDatatype | null,
> = (fn: FunctionDefinition) => FunctionDefinition<Args, Return>;

// * FUNCTION BODY
export type FunctionBodyYield = BuilderNode;

export type FunctionBody<
  Args extends ArgumentNode[],
  Returns extends ValueDatatype | null,
> = (
  ...args: Args
) => Generator<
  FunctionBodyYield,
  Returns extends null
    ? void
    : Returns extends ValueDatatype
      ? | ValueNode<Returns>
        | VariableNode<Returns>
        | ArgumentNode<ArgumentNameVariant, Returns>
      : never
>;

// * FUNCTION NODE
export const FUNCTION_KIND = "function";

export type FunctionNodeOptions<
  Args extends ArgumentNode[],
  Returns extends ValueDatatype | null,
> = {
  args: Args;
  returns: Returns;
  body: FunctionBody<Args, Returns>;
};

export type FunctionNodeStates = Partial<{
  name: string;
}>;

export type FunctionNode<
  Args extends ArgumentNode[],
  Returns extends ValueDatatype | null,
> = BuilderNode<typeof FUNCTION_KIND, FunctionNodeOptions<Args, Returns>>;

export function fn<
  Args extends ArgumentNode[],
  Returns extends ValueDatatype | null,
>(
  definitionGenerator: FunctionDefinitionGenerator<Args, Returns>,
  body: FunctionBody<NoInfer<Args>, NoInfer<Returns>>,
): FunctionNode<Args, Returns> {
  const definition = definitionGenerator(generateFunctionDefinition());

  return builderNode({
    kind: FUNCTION_KIND,
    data: {
      args: definition.args,
      returns: definition.returns,
      body,
    },
  });
}

export function isFunctionNode(
  value: unknown,
): value is FunctionNode<ArgumentNode[], ValueDatatype | null> {
  return (
    isBuilderNode(value) &&
    value.kind === FUNCTION_KIND &&
    typeof value.data === "object" &&
    value.data !== null &&
    "args" in value.data &&
    "returns" in value.data
  );
}
