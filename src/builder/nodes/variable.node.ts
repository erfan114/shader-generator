import { NodeModel, type OwnableNode } from "../node.js";
import type { ScopeNode } from "./scope.node.js";
import type {
  DatatypeValueType,
  ValueDataType,
  ValueNode,
} from "./value.node.js";

export type VariableObjectProps<T extends ValueDataType> = {
  name: string;
  type: T;
  value: DatatypeValueType<T> | null;
};

export type VariableNode<
  Type extends ValueDataType = ValueDataType,
  Owner extends ScopeNode = ScopeNode,
> = OwnableNode<
  "variable",
  Owner,
  {
    name: string;
    value: ValueNode<Type, VariableNode>;
  }
>;

export class VariableNodeModel<
  Type extends ValueDataType = ValueDataType,
  Owner extends ScopeNode = ScopeNode,
> extends NodeModel<VariableNode<Type, Owner>> {}
