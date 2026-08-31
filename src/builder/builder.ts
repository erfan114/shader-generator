import type { BuildTarget } from "../compiler/index.js";
import { NotImplementedError } from "../errors.js";
import { GlobalNodeModel, createGlobalNode } from "./nodes/global.node.js";

export class Builder {
  public readonly global = new GlobalNodeModel(createGlobalNode());

  /**
   * Builds the shader for the specified target.
   * @param target - The {@link BuildTarget} for building the shader.
   * @returns The built shader code.
   * @throws Will throw an error if the build target is not supported or the main is not defined.
   */
  public build(target: BuildTarget): string {
    throw new NotImplementedError();
  }
}
