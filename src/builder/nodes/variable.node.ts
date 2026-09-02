import { type BuilderNode, builderNode } from "../node.js";
import type { DatatypeValueType, ValueDataType } from "./value.node.js";

const VARIABLE_KIND = "variable";

export type VariableNodeOptions<Type extends ValueDataType> = {
  type: Type;
};

export type VariableNodeStates<Type extends ValueDataType> = Partial<{
  name: string;
  value: DatatypeValueType<Type>;
}>;

export type VariableNodeData<Type extends ValueDataType> =
  VariableNodeOptions<Type> & VariableNodeStates<Type>;

export type VariableNodeMethods<Type extends ValueDataType> = {
  assign(value: DatatypeValueType<Type>): VariableNode<Type>;
  as(alias: string): VariableNode<Type>;
};

export type VariableNode<Type extends ValueDataType = ValueDataType> =
  BuilderNode<
    typeof VARIABLE_KIND,
    VariableNodeData<Type>,
    VariableNodeMethods<Type>
  >;

export function variable<Type extends ValueDataType>(
  options: VariableNodeOptions<Type>,
): VariableNode<Type> {
  const create = (data: VariableNodeData<Type>): VariableNode<Type> => {
    return builderNode<
      typeof VARIABLE_KIND,
      VariableNodeOptions<Type>,
      VariableNodeMethods<Type>
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
