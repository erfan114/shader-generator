import type { Datatype } from "../../types.js";

export type IODeclarationOptions = {
  name: string;
  type: Datatype;
  flatten?: boolean;
};
