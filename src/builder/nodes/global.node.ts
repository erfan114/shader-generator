import { NotImplementedError } from "../../errors.js";
import type { Datatype } from "../../types.js";
import { type BuilderNode, NodeModel, type OwnableNode } from "../node.js";
import type { IONodeOptions } from "./common.js";
import type { DefineNode, DefineNodeModel } from "./define.node.js";
import type { FunctionNodeModel } from "./function.node.js";
import type { InputNodeModel } from "./input.node.js";
import type { OutputNodeModel } from "./output.node.js";
import type { UniformNodeModel, UniformNodeOptions } from "./uniform.node.js";

export type GlobalNode = BuilderNode<
  "global",
  {
    defines: DefineNode[];
  }
>;

export type GlobalOwnedNode<
  Kind extends PropertyKey = PropertyKey,
  Data = unknown,
> = OwnableNode<Kind, GlobalNode, Data>;

export class GlobalNodeModel extends NodeModel<GlobalNode> {
  public createDefine(): DefineNodeModel {
    throw new NotImplementedError();
  }

  public createUniform<Type extends Datatype>(
    options: UniformNodeOptions<Type>,
  ): UniformNodeModel<Type> {
    throw new NotImplementedError();
  }

  public createInput<Type extends Datatype>(
    options: IONodeOptions<Type>,
  ): InputNodeModel<Type> {
    throw new NotImplementedError();
  }

  public createOutput<Type extends Datatype>(
    options: IONodeOptions<Type>,
  ): OutputNodeModel<Type> {
    throw new NotImplementedError();
  }

  public createFunction(): FunctionNodeModel {
    throw new NotImplementedError();
  }
}
