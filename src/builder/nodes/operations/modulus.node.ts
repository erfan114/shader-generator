import { builderNode } from "../../node.js";
import type { OperationNode } from "./common.js";

export const MODULUS_KIND = "modulus";

export type ModulusNode<L, R> = OperationNode<typeof MODULUS_KIND, L, R>;

export function modulo<L, R>(left: L, right: R): ModulusNode<L, R> {
  return builderNode({
    kind: MODULUS_KIND,
    data: {
      left,
      right,
    },
  });
}
