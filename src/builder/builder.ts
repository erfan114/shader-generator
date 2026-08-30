import type { BuildTarget } from "../compiler/index.js";
import { addToSet } from "../helpers/set.helper.js";
import type { IODeclarationOptions } from "./declarations/common.js";
import { InputDeclaration } from "./declarations/input.declaration.js";
import { MainDeclaration } from "./declarations/main.declaration.js";
import { OutputDeclaration } from "./declarations/output.declaration.js";
import {
  UniformDeclaration,
  type UniformDeclarationOptions,
} from "./declarations/uniform.declaration.js";

export class Builder {
  private readonly uniforms = new Set<UniformDeclaration>();
  private readonly inputs = new Set<InputDeclaration>();
  private readonly outputs = new Set<OutputDeclaration>();

  private mainObject?: MainDeclaration;

  /**
   * Creates a uniform object and adds it to the builder's uniforms set.
   * @param options - The options for creating the uniform object.
   * @returns The created uniform object.
   */
  public uniform(options: UniformDeclarationOptions) {
    return addToSet(this.uniforms, new UniformDeclaration(options));
  }

  /**
   * Creates an input object and adds it to the builder's inputs set.
   * @param options - The options for creating the input object.
   * @returns The created input object.
   */
  public input(options: IODeclarationOptions) {
    return addToSet(this.inputs, new InputDeclaration(options));
  }

  /**
   * Creates an output object and adds it to the builder's outputs set.
   * @param options - The options for creating the output object.
   * @returns The created output object.
   */
  public output(options: IODeclarationOptions) {
    return addToSet(this.outputs, new OutputDeclaration(options));
  }

  public main(): MainDeclaration {
    this.mainObject ??= new MainDeclaration();

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
