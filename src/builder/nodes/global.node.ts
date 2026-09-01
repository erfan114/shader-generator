import { NotImplementedError } from "../../errors.js";
import type { Datatype } from "../../types.js";
import { type BuilderNode, NodeModel, type OwnableNode } from "../node.js";
import {
  ArgumentNodeModel,
  type ArgumentNodeOptions,
} from "./argument.node.js";
import type { IONodeOptions } from "./common.js";
import type {
  DefineNode,
  DefineNodeModel,
  DefineNodeOptions,
} from "./define.node.js";
import {
  type FunctionBodyArgs,
  type FunctionDefinition,
  type FunctionDefinitionHandler,
  type FunctionNode,
  FunctionNodeModel,
  createFunctionDefinition,
  createFunctionNode,
} from "./function.node.js";
import type { InputNodeModel } from "./input.node.js";
import type { OutputNodeModel } from "./output.node.js";
import type { UniformNodeModel, UniformNodeOptions } from "./uniform.node.js";
import type { ValueDataType, ValueNode } from "./value.node.js";

export type GlobalNode = BuilderNode<
  "global",
  {
    main?: FunctionNode;
    defines: DefineNode[];
  }
>;

export type GlobalOwnedNode<
  Kind extends PropertyKey = PropertyKey,
  Data = unknown,
> = OwnableNode<Kind, GlobalNode, Data>;

export class GlobalNodeModel extends NodeModel<GlobalNode> {
  /**
   * Create a define node and returns it.
   * @param options - The options for creating the define object.
   * @returns The created define node.
   */
  public createDefine(options: DefineNodeOptions): DefineNodeModel {
    throw new NotImplementedError();
  }

  /**
   * Creates a uniform object and adds it to the builder's uniforms set.
   * @param options - The options for creating the uniform object.
   * @returns The created uniform object.
   */
  public createUniform<Type extends Datatype>(
    options: UniformNodeOptions<Type>,
  ): UniformNodeModel<Type> {
    throw new NotImplementedError();
  }

  /**
   * Creates an input object and adds it to the builder's inputs set.
   * @param options - The options for creating the input object.
   * @returns The created input object.
   */
  public createInput<Type extends Datatype>(
    options: IONodeOptions<Type>,
  ): InputNodeModel<Type> {
    throw new NotImplementedError();
  }

  /**
   * Creates an output object and adds it to the builder's outputs set.
   * @param options - The options for creating the output object.
   * @returns The created output object.
   */
  public createOutput<Type extends Datatype>(
    options: IONodeOptions<Type>,
  ): OutputNodeModel<Type> {
    throw new NotImplementedError();
  }

  /**
   * Creates a new function from a typed function definition and body.
   *
   * The function definition is built using {@link FunctionDefinition}, allowing
   * arguments and the return type to be declared fluently. The body receives
   * the corresponding argument models with their names and data types preserved.
   *
   * @param definition A callback used to define the function's arguments and
   *   return type.
   * @param body The function body. Its arguments are inferred from the
   *   {@link FunctionDefinition} and are provided as {@link ArgumentNodeModel}
   *   instances. If the function has a return type, the body must return a
   *   corresponding {@link ValueNode}; otherwise, the body must return `void`.
   *
   * @returns The created function node model.
   */
  public createFunction<
    Args extends ArgumentNodeOptions[],
    Return extends ValueDataType | null,
  >(
    definition: FunctionDefinitionHandler<Args, Return>,
    body: (
      ...args: FunctionBodyArgs<Args>
    ) => Return extends ValueDataType ? ValueNode<Return> : void,
  ) {
    const fnDefinition = definition(createFunctionDefinition());
    const mappedArgs = fnDefinition.args.map(
      (arg) =>
        new ArgumentNodeModel({
          kind: "argument",
          ...arg,
        }),
    ) as unknown as FunctionBodyArgs<Args>;

    return () => body(...mappedArgs);
  }

  public provideMain(): FunctionNodeModel<null> {
    if (!this.node.main) {
      const mainNode = createFunctionNode({
        owner: this.node,
        name: "main",
        returnType: null,
      });
      this.node.main = mainNode;
    }

    return new FunctionNodeModel(this.node.main);
  }
}

export function createGlobalNode(): GlobalNode {
  const node: GlobalNode = {
    kind: "global",
    defines: [],
  };

  return node;
}
