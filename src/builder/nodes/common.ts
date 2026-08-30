import type { Datatype } from "../../types.js";

export type Node<T extends PropertyKey, D> = { kind: T } & D;

export type IODeclarationOptions = {
  name: string;
  type: Datatype;
  flatten?: boolean;
};
