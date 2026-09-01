import type { BuildTarget } from "../compiler/index.js";
import { NotImplementedError } from "../errors.js";

/* 


*/

export class Builder {
  public static generate(generator: Generator): Builder {
    throw new NotImplementedError();
  }

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
