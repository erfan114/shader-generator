import type { BuilderNode } from "../node.js";
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

export type VariableNode<Type extends ValueDataType = ValueDataType> =
  BuilderNode<
    "variable",
    {
      name: string;
      value: ValueNode<Type>;
    }
  >;
