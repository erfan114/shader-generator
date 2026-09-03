import { type BuilderNode, builderNode } from "../node.js";
import type { DatatypeValueType, ValueDatatype } from "./value.node.js";

const VARIABLE_KIND = "variable";

export type VariableNodeOptions<Type extends ValueDatatype> = {
  type: Type;
};

type VariableValue<Type extends ValueDatatype> =
  DatatypeValueType<Type> | undefined;

export type VariableNodeStates<
  Type extends ValueDatatype,
  Value extends VariableValue<Type>,
> = Partial<{
  name: string;
  value: Value;
}>;

export type VariableNodeData<
  Type extends ValueDatatype,
  Value extends VariableValue<Type>,
> = VariableNodeOptions<Type> & VariableNodeStates<Type, Value>;

export type VariableNodeMethods<
  Type extends ValueDatatype,
  Value extends VariableValue<Type>,
> = {
  assign(
    value: DatatypeValueType<Type>,
  ): VariableNode<Type, DatatypeValueType<Type>>;
  as(alias: string): VariableNode<Type, Value>;
};

export type VariableNode<
  Type extends ValueDatatype = ValueDatatype,
  Value extends VariableValue<Type> = VariableValue<Type>,
> = BuilderNode<
  typeof VARIABLE_KIND,
  VariableNodeData<Type, Value>,
  VariableNodeMethods<Type, Value>
>;

export function variable<
  Type extends ValueDatatype,
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
