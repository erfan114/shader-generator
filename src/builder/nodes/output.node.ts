import type { Datatype } from "../../types.js";
import { builderNode } from "../node.js";
import type {
  IONode,
  IONodeData,
  IONodeMethods,
  IONodeOptions,
} from "./common.js";

const OUTPUT_KIND = "output";

export type OutputNode<Type extends Datatype> = IONode<
  typeof OUTPUT_KIND,
  Type
>;

export function output<Type extends Datatype>(
  options: IONodeOptions<Type>,
): OutputNode<Type> {
  const create = (data: IONodeData<Type>): OutputNode<Type> => {
    return builderNode<
      typeof OUTPUT_KIND,
      IONodeOptions<Type>,
      IONodeMethods<typeof OUTPUT_KIND, Type>
    >({
      kind: OUTPUT_KIND,
      data,

      as(alias) {
        return create({
          ...data,
          name: alias,
        });
      },
    });
  };

  return create(options);
}
