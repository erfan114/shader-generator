import { type BuilderNode, builderNode } from "../node.js";

export type GlobalNode<
  Defines = [],
  Uniforms = [],
  Inputs = [],
  Outputs = [],
  Functions = [],
> = BuilderNode<
  "global",
  {
    defines: Defines;
    uniforms: Uniforms;
  }
>;

export function createGlobalNode(): GlobalNode {
  return builderNode({
    kind: "global",
    data: {
      defines: [],
      uniforms: [],
    },
  });
}
