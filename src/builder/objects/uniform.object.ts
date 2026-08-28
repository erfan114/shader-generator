import type { Datatype } from "../../types.js";

export type UniformObjectOptions = {
  name: string;
  type: Datatype;
};

export class UniformObject {
  public constructor(public readonly options: UniformObjectOptions) {}
}
