import type { BuildTarget } from "../compiler/index.js";
import { NotImplementedError } from "../errors.js";
import type { Datatype } from "../types.js";
import type { IONodeOptions } from "./nodes/common.js";
import { type UniformNodeOptions } from "./nodes/uniform.node.js";

export class Builder {
  /**
   * Creates a uniform object and adds it to the builder's uniforms set.
   * @param options - The options for creating the uniform object.
   * @returns The created uniform object.
   */
  public uniform<Type extends Datatype>(options: UniformNodeOptions<Type>) {
    throw new NotImplementedError();
  }

  /**
   * Creates an input object and adds it to the builder's inputs set.
   * @param options - The options for creating the input object.
   * @returns The created input object.
   */
  public input<Type extends Datatype>(options: IONodeOptions<Type>) {
    throw new NotImplementedError();
  }

  /**
   * Creates an output object and adds it to the builder's outputs set.
   * @param options - The options for creating the output object.
   * @returns The created output object.
   */
  public output<Type extends Datatype>(options: IONodeOptions<Type>) {
    throw new NotImplementedError();
  }

  /**
   * Creates main function and returns it
   * @returns The main function
   */
  public main() {
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
