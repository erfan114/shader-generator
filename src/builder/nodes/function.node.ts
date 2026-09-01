import { type Datatype } from "../../types.js";
import { type BuilderNode, builderNode } from "../node.js";
import type { ArgumentNodeOptions } from "./argument.node.js";
import type { ValueDataType } from "./value.node.js";

// * FUNCTION DEFINITION
export type FunctionDefinition<
  Args extends unknown[] = [],
  R extends ValueDataType | null = null,
> = {
  args: Args;
  returns: R;

  withArg<Name extends string, Type extends Datatype>(
    options: ArgumentNodeOptions<Name, Type>,
  ): FunctionDefinition<[...Args, ArgumentNodeOptions<Name, Type>], R>;

  withReturn<NewReturn extends ValueDataType>(
    returnType: NewReturn,
  ): FunctionDefinition<Args, NewReturn>;
};

export function createFunctionDefinition<
  Args extends unknown[] = [],
  R extends ValueDataType | null = null,
>(
  args: Args = [] as unknown as Args,
  returns: R = null as R,
): FunctionDefinition<Args, R> {
  return {
    args,
    returns,

    withArg(arg) {
      return createFunctionDefinition(
        [...args, arg] as [...Args, typeof arg],
        returns,
      );
    },

    withReturn(returnType) {
      return createFunctionDefinition(args, returnType);
    },
  };
}

export type FunctionDefinitionHandler<
  Args extends ArgumentNodeOptions[],
  Return extends ValueDataType | null,
> = (fn: FunctionDefinition) => FunctionDefinition<Args, Return>;

// * FUNCTION NODE
export type FunctionNodeOptions<R extends ValueDataType | null> = {
  name: string | undefined;
  returnType: R;
};

export type FunctionNode<R extends ValueDataType | null = null> = BuilderNode<
  "function",
  FunctionNodeOptions<R>
>;

export function createFunctionNode<R extends ValueDataType | null>(
  options: FunctionNodeOptions<R>,
): FunctionNode<R> {
  return builderNode({
    kind: "function",
    data: options,
  });
}
