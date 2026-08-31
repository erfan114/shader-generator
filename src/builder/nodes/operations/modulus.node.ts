import type { OperationNode } from "./common.js";

export type ModulusNode<L, R> = OperationNode<"modulus", L, R>;

export function modulo<L, R>(left: L, right: R): ModulusNode<L, R> {
  return {
    kind: "modulus",
    left,
    right,
  };
}
