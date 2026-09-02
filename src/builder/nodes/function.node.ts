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
} & Pick<FunctionNodeOptions<Args, Returns>, "args" | "returns">;

export function generateFunctionDefinition<
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
      return generateFunctionDefinition(
        [...args, arg] as [...Args, typeof arg],
        returns,
      );
    },

    withReturn(returnType) {
      return generateFunctionDefinition(args, returnType);
    },
  };
}

export type FunctionDefinitionGenerator<
  Args extends ArgumentNodeOptions[],
  Return extends ValueDataType | null,
> = (fn: FunctionDefinition) => FunctionDefinition<Args, Return>;

// * FUNCTION BODY
export type FunctionBody<
  Args extends ArgumentNodeOptions[],
  Returns extends ValueDataType | null,
  // TODO: Generator shouldn't yield unknown, fix it
> = (...args: Args) => Generator<unknown, Returns>;

// * FUNCTION NODE
export type FunctionNodeOptions<
  Args extends ArgumentNodeOptions[],
  Returns extends ValueDataType | null = null,
> = {
  args: Args;
  returns: Returns;
  body: FunctionBody<Args, Returns>;
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
  definitionGenerator: FunctionDefinitionGenerator<Args, Returns>,
  body: FunctionBody<Args, Returns>,
): FunctionNode<Args, Returns> {
  throw new NotImplementedError();
}
