import type { DataType } from "../../types.js";

export type UniformObjectOptions = {
  name: string;
  type: DataType;
};

export class UniformObject {
  public constructor(private options: UniformObjectOptions) {}
}
