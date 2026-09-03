import { type BuilderNode, builderNode } from "../node.js";
import type { DatatypeValueType, ValueDataType } from "./value.node.js";

const VARIABLE_KIND = "variable";

export type VariableNodeOptions<Type extends ValueDataType> = {
  type: Type;
};

export type VariableNodeStates<
  Type extends ValueDataType,
  Value extends DatatypeValueType<Type>,
> = Partial<{
  name: string;
  value: Value;
}>;

export type VariableNodeData<
  Type extends ValueDataType,
  Value extends DatatypeValueType<Type>,
> = VariableNodeOptions<Type> & VariableNodeStates<Type, Value>;

export type VariableNodeMethods<
  Type extends ValueDataType,
  Value extends DatatypeValueType<Type>,
> = {
  assign(value: Value): VariableNode<Type, Value>;
  as(alias: string): VariableNode<Type, Value>;
};

export type VariableNode<
  Type extends ValueDataType = ValueDataType,
  Value extends DatatypeValueType<Type> = DatatypeValueType<Type>,
> = BuilderNode<
  typeof VARIABLE_KIND,
  VariableNodeData<Type, Value>,
  VariableNodeMethods<Type, Value>
>;

export function variable<
  Type extends ValueDataType,
  Value extends DatatypeValueType<Type>,
>(options: VariableNodeOptions<Type>): VariableNode<Type, Value> {
  const create = (
    data: VariableNodeData<Type, Value>,
  ): VariableNode<Type, Value> => {
    return builderNode<
      typeof VARIABLE_KIND,
      VariableNodeOptions<Type>,
      VariableNodeMethods<Type, Value>
    >({
      kind: VARIABLE_KIND,
      data,

      as(alias) {
        return create({
          ...data,
          name: alias,
        });
      },
      assign(value) {
        return create({
          ...data,
          value,
        });
      },
    });
  };

  return create(options);
}
