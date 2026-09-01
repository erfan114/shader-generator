import { type Datatype } from "../../types.js";
import { NodeModel } from "../node.js";
import type {
  ArgumentNodeModel,
  ArgumentNodeOptions,
} from "./argument.node.js";
import type { GlobalOwnedNode } from "./global.node.js";
import {
  type ScopeNode,
  ScopeNodeModel,
  type ScopeNodeModel as ScopeNodeModelType,
} from "./scope.node.js";
import { createScopeNode } from "./scope.node.js";
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

export type FunctionBodyArgs<Args extends ArgumentNodeOptions[]> = {
  [K in keyof Args]: Args[K] extends ArgumentNodeOptions<infer Name, infer Type>
    ? ArgumentNodeModel<Name, Type>
    : never;
};
// * FUNCTION NODE
export type FunctionNodeOptions<R extends ValueDataType | null> = {
  name: string | undefined;
  returnType: R;
  scope?: ScopeNode<FunctionNode<R>>;
};

export type FunctionNode<R extends ValueDataType | null = null> =
  GlobalOwnedNode<"function", FunctionNodeOptions<R>>;

export function createFunctionNode<R extends ValueDataType | null>(
  options: FunctionNodeOptions<R> & Pick<FunctionNode, "owner">,
): FunctionNode<R> {
  return {
    kind: "function",
    ...options,
  };
}

export class FunctionNodeModel<
  R extends ValueDataType | null,
> extends NodeModel<FunctionNode<R>> {
  private get scope() {
    this.node.scope ??= createScopeNode(this.node);

    return this.node.scope;
  }

  private get scopeModel() {
    return new ScopeNodeModel(this.scope);
  }

  /**
   * Creates or retrieves the local scope for this function.
   * The scope holds all function arguments and local variables.
   * @returns The scope node model.
   */
  public createScope(): ScopeNodeModelType<typeof this.node> {
    const scopeNode = createScopeNode(this.node);
    const scopeModel = new ScopeNodeModel(scopeNode);

    return scopeModel;
  }

  public get name(): string | undefined {
    return this.node.name;
  }

  public get returnType(): Datatype | null {
    return this.node.returnType;
  }
}
