import type { Datatype } from "../../types.js";
import { builderNode } from "../node.js";
import type {
  IONode,
  IONodeData,
  IONodeMethods,
  IONodeOptions,
} from "./common.js";

const INPUT_KIND = "input";

export type InputNode<Type extends Datatype> = IONode<typeof INPUT_KIND, Type>;

export function input<Type extends Datatype>(
  options: IONodeOptions<Type>,
): InputNode<Type> {
  const create = (data: IONodeData<Type>): InputNode<Type> => {
    return builderNode<
      typeof INPUT_KIND,
      IONodeOptions<Type>,
      IONodeMethods<typeof INPUT_KIND, Type>
    >({
      kind: INPUT_KIND,
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
