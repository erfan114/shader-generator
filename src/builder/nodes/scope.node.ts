import { addToSet } from "../../helpers/set.helper.js";
import { type BuilderNode, NodeModel, type OwnableNode } from "../node.js";
import { type ArgumentNode } from "./argument.node.js";
import {
  type DatatypeValueType,
  type ValueDataType,
  type ValueNode,
} from "./value.node.js";
import { VariableNodeModel } from "./variable.node.js";

export type ScopeNode<Owner = unknown> = OwnableNode<
  "scope",
  Owner,
  {
    nodes: BuilderNode[];
    args: Set<ArgumentNode>;
    variables: Set<VariableNodeModel>;
  }
>;

export function createScopeNode<Owner>(owner: Owner): ScopeNode<Owner> {
  return {
    kind: "scope",
    owner,
    nodes: [],
    args: new Set(),
    variables: new Set(),
  };
}

export class ScopeNodeModel<Owner> extends NodeModel<ScopeNode<Owner>> {
  public createScope(): ScopeNodeModel<typeof this.node> {
    const scopeNode = createScopeNode(this.node);
    return new ScopeNodeModel(scopeNode);
  }

  public createVariable<Type extends ValueDataType>(options: {
    name: string;
    type: Type;
    value: DatatypeValueType<Type> | null;
  }): VariableNodeModel<Type, typeof this.node> {
    const valueNode: ValueNode<Type, unknown> = {
      kind: "value",
      type: options.type,
      data: options.value,
      owner: null,
    } as ValueNode<Type, unknown>;

    const variableNode = {
      kind: "variable",
      name: options.name,
      value: valueNode,
      owner: this.node,
    } as any;

    const variableModel = new VariableNodeModel<Type, typeof this.node>(
      variableNode,
    );

    addToSet(this.node.variables, variableModel);

    return variableModel;
  }
}
