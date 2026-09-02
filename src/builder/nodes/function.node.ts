import { NotImplementedError } from "../../errors.js";
import { type Datatype } from "../../types.js";
import { type BuilderNode } from "../node.js";
import type { ArgumentNodeOptions } from "./argument.node.js";
import type { ValueDataType } from "./value.node.js";

const FUNCTION_KIND = "function";

// * FUNCTION DEFINITION
export type FunctionDefinition<
  Args extends ArgumentNodeOptions[] = [],
  Returns extends ValueDataType | null = null,
> = {
  withArg<Name extends string, Type extends Datatype>(
    options: ArgumentNodeOptions<Name, Type>,
  ): FunctionDefinition<[...Args, ArgumentNodeOptions<Name, Type>], Returns>;

  withReturn<NewReturn extends ValueDataType>(
    returnType: NewReturn,
  ): FunctionDefinition<Args, NewReturn>;
} & FunctionNodeOptions<Args, Returns>;

export function createFunctionDefinition<
  Args extends ArgumentNodeOptions[] = [],
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
export type FunctionNodeOptions<
  Args extends ArgumentNodeOptions[],
  Returns extends ValueDataType | null = null,
> = {
  args: Args;
  returns: Returns;
};

export type FunctionNodeStates = Partial<{
  name: string;
}>;

export type FunctionNode<
  Args extends ArgumentNodeOptions[],
  Returns extends ValueDataType | null = null,
> = BuilderNode<typeof FUNCTION_KIND, FunctionNodeOptions<Args, Returns>>;

export function fn<
  Args extends ArgumentNodeOptions[],
  Returns extends ValueDataType | null,
>(
  definition: FunctionDefinitionHandler<Args, Returns>,
  body: () => Generator,
): FunctionNode<Args, Returns> {
  throw new NotImplementedError();
}
