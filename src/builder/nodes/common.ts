import type { Datatype } from "../../types.js";

export type Node<T extends PropertyKey, D> = { kind: T } & D;

/* 

How we are gonna assign everything together with type safety





*/

export type IODeclarationOptions = {
  name: string;
  type: Datatype;
  flatten?: boolean;
};
