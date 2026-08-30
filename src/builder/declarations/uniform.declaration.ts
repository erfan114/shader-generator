import type { Datatype } from "../../types.js";

export type UniformDeclarationOptions = {
  name: string;
  type: Datatype;
};

export class UniformDeclaration {
  public constructor(public readonly options: UniformDeclarationOptions) {}
}
