import type { BuildTarget } from "../compiler/index.js";
import { NotImplementedError } from "../errors.js";
import type { Datatype } from "../types.js";
import type { IONodeOptions } from "./nodes/common.js";
import type {
  DefineNodeModel,
  DefineNodeOptions,
} from "./nodes/define.node.js";
import type { FunctionNodeModel } from "./nodes/function.node.js";
import type { InputNodeModel } from "./nodes/input.node.js";
import type { OutputNodeModel } from "./nodes/output.node.js";
import {
  UniformNodeModel,
  type UniformNodeOptions,
} from "./nodes/uniform.node.js";

export class Builder {
  /**
   * Create a define node and returns it.
   * @param options - The options for creating the define object.
   * @returns The created define node.
   */
  public createDefine(options: DefineNodeOptions): DefineNodeModel {
    throw new NotImplementedError();
  }

  /**
   * Creates a uniform object and adds it to the builder's uniforms set.
   * @param options - The options for creating the uniform object.
   * @returns The created uniform object.
   */
  public createUniform<Type extends Datatype>(
    options: UniformNodeOptions<Type>,
  ): UniformNodeModel<Type> {
    throw new NotImplementedError();
  }

  /**
   * Creates an input object and adds it to the builder's inputs set.
   * @param options - The options for creating the input object.
   * @returns The created input object.
   */
  public createInput<Type extends Datatype>(
    options: IONodeOptions<Type>,
  ): InputNodeModel<Type> {
    throw new NotImplementedError();
  }

  /**
   * Creates an output object and adds it to the builder's outputs set.
   * @param options - The options for creating the output object.
   * @returns The created output object.
   */
  public createOutput<Type extends Datatype>(
    options: IONodeOptions<Type>,
  ): OutputNodeModel<Type> {
    throw new NotImplementedError();
  }

  /**
   * Creates a new function and returns it for later uses
   * @returns The created function
   */
  public createFunction(): FunctionNodeModel {
    throw new NotImplementedError();
  }

  /**
   * Creates main function and returns it
   * @returns The main function
   */
  public getMain(): FunctionNodeModel {
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
