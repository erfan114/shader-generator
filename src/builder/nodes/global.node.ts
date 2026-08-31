import { NotImplementedError } from "../../errors.js";
import type { Datatype } from "../../types.js";
import { type BuilderNode, NodeModel, type OwnableNode } from "../node.js";
import type { IONodeOptions } from "./common.js";
import type {
  DefineNode,
  DefineNodeModel,
  DefineNodeOptions,
} from "./define.node.js";
import {
  type FunctionNode,
  type FunctionNodeModel,
  createFunctionNode,
} from "./function.node.js";
import type { InputNodeModel } from "./input.node.js";
import type { OutputNodeModel } from "./output.node.js";
import type { UniformNodeModel, UniformNodeOptions } from "./uniform.node.js";

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
   * Creates a new function and returns it for later uses
   * @returns The created function
   */
  public createFunction(): FunctionNodeModel {
    throw new NotImplementedError();
  }

  public provideMain(): FunctionNodeModel {
    this.node.main ??= createFunctionNode({ owner: this.node });

    throw new NotImplementedError();
  }
}

export function createGlobalNode(): GlobalNode {
  const node: GlobalNode = {
    kind: "global",
    defines: [],
  };

  return node;
}
