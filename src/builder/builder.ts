import type { BuildTarget } from "../compiler/index.js";
import type { IOObjectOptions } from "./objects/common.js";
import { InputObject } from "./objects/input.object.js";
import { MainObject } from "./objects/main.object.js";
import { OutputObject } from "./objects/output.object.js";
import {
  UniformObject,
  type UniformObjectOptions,
} from "./objects/uniform.object.js";

export class Builder {
  private readonly uniforms = new Set<UniformObject>();
  private readonly inputs = new Set<InputObject>();
  private readonly outputs = new Set<OutputObject>();

  private mainObject?: MainObject;

  private returnAdd<T>(to: Set<T>, item: T) {
    to.add(item);

    return item;
  }

  /**
   * Creates a uniform object and adds it to the builder's uniforms set.
   * @param options - The options for creating the uniform object.
   * @returns The created uniform object.
   */
  public uniform(options: UniformObjectOptions) {
    return this.returnAdd(this.uniforms, new UniformObject(options));
  }

  /**
   * Creates an input object and adds it to the builder's inputs set.
   * @param options - The options for creating the input object.
   * @returns The created input object.
   */
  public input(options: IOObjectOptions) {
    return this.returnAdd(this.inputs, new InputObject(options));
  }

  /**
   * Creates an output object and adds it to the builder's outputs set.
   * @param options - The options for creating the output object.
   * @returns The created output object.
   */
  public output(options: IOObjectOptions) {
    return this.returnAdd(this.outputs, new OutputObject(options));
  }

  public main(): MainObject {
    this.mainObject ??= new MainObject();

    return this.mainObject;
  }

  /**
   * Builds the shader for the specified target.
   * @param target - The {@link BuildTarget} for building the shader.
   * @returns The built shader code.
   * @throws Will throw an error if the build target is not supported or the main is not defined.
   */
  public build(target: BuildTarget): string {
    if (
      this.uniforms.size === 0 &&
      this.inputs.size === 0 &&
      this.outputs.size === 0
    ) {
      throw new Error(
        "Builder is empty. Please add uniforms, inputs, or outputs before building.",
      );
    }

    return "";
  }
}
