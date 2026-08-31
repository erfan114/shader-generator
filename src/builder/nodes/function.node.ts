import type { Datatype } from "../../types.js";
import { NodeModel } from "../node.js";
import type { ArgumentNodeOptions } from "./argument.node.js";
import type { GlobalOwnedNode } from "./global.node.js";
import {
  type ScopeNode,
  ScopeNodeModel,
  type ScopeNodeModel as ScopeNodeModelType,
} from "./scope.node.js";
import { createScopeNode } from "./scope.node.js";

export type FunctionNodeOptions<R extends Datatype | null> = {
  name: string | undefined;
  returnType: R;
  scope?: ScopeNode<FunctionNode<R>>;
};

export type FunctionNode<R extends Datatype | null = null> = GlobalOwnedNode<
  "function",
  FunctionNodeOptions<R>
>;

export function createFunctionNode<R extends Datatype | null>(
  options: FunctionNodeOptions<R> & Pick<FunctionNode, "owner">,
): FunctionNode<R> {
  return {
    kind: "function",
    ...options,
  };
}

export class FunctionNodeModel<R extends Datatype | null> extends NodeModel<
  FunctionNode<R>
> {
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

  /**
   * Adds an argument to this function's scope.
   * @param options - The name and type of the argument.
   * @returns The scope containing the new argument.
   */
  public addArgument<Type extends Datatype>(
    options: ArgumentNodeOptions<Type>,
  ) {
    this.scopeModel.createArgument(options);

    return this;
  }

  public get name(): string | undefined {
    return this.node.name;
  }

  public get returnType(): Datatype | null {
    return this.node.returnType;
  }
}
