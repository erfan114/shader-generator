import { builderNode, type BuilderNode } from "@/builder/node.js";

export type JumpNode<Kind extends string = string> = BuilderNode<Kind, null>;

export function jump<Kind extends string>(kind: Kind) {
  return (): JumpNode<Kind> => {
    return builderNode({
      kind,
      data: null,
    });
  };
}
