import { type BuilderNode, builderNode } from "../node.js";
import type { DatatypeValueType, ValueDataType } from "./value.node.js";

const VARIABLE_KIND = "variable";

export type VariableNodeOptions<Type extends ValueDataType> = {
  type: Type;
};

type VariableValue<Type extends ValueDataType> =
  DatatypeValueType<Type> | undefined;

export type VariableNodeStates<
  Type extends ValueDataType,
  Value extends VariableValue<Type>,
> = Partial<{
  name: string;
  value: Value;
}>;

export type VariableNodeData<
  Type extends ValueDataType,
  Value extends VariableValue<Type>,
> = VariableNodeOptions<Type> & VariableNodeStates<Type, Value>;

export type VariableNodeMethods<
  Type extends ValueDataType,
  Value extends VariableValue<Type>,
> = {
  assign(
    value: DatatypeValueType<Type>,
  ): VariableNode<Type, DatatypeValueType<Type>>;
  as(alias: string): VariableNode<Type, Value>;
};

export type VariableNode<
  Type extends ValueDataType = ValueDataType,
  Value extends VariableValue<Type> = VariableValue<Type>,
> = BuilderNode<
  typeof VARIABLE_KIND,
  VariableNodeData<Type, Value>,
  VariableNodeMethods<Type, Value>
>;

export function variable<
  Type extends ValueDataType,
  Value extends DatatypeValueType<Type> | undefined = undefined,
>(options: VariableNodeOptions<Type>): VariableNode<Type, Value> {
  const create = <CurrentValue extends VariableValue<Type>>(
    data: VariableNodeData<Type, CurrentValue>,
  ): VariableNode<Type, CurrentValue> => {
    return builderNode<
      typeof VARIABLE_KIND,
      VariableNodeOptions<Type>,
      VariableNodeMethods<Type, CurrentValue>
    >({
      kind: VARIABLE_KIND,
      data,

      as(alias) {
        return create<CurrentValue>({
          ...data,
          name: alias,
        });
      },
      assign(value) {
        return create<DatatypeValueType<Type>>({
          ...data,
          value,
        });
      },
    });
  };

  return create(options);
}
