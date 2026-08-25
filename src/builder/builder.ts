import type { BuildTarget } from "../compiler/index.js";
import type { IOObjectOptions } from "./objects/common.js";
import { InputObject } from "./objects/input.object.js";
import { OutputObject } from "./objects/output.object.js";
import {
  UniformObject,
  type UniformObjectOptions,
} from "./objects/uniform.object.js";

export class Builder {
  private readonly uniforms = new Set<UniformObject>();
  private readonly inputs = new Set<InputObject>();
  private readonly outputs = new Set<OutputObject>();

  private returnAdd<T>(to: Set<T>, item: T) {
    to.add(item);

    return item;
  }

  public uniform(options: UniformObjectOptions) {
    return this.returnAdd(this.uniforms, new UniformObject(options));
  }

  public input(options: IOObjectOptions) {
    return this.returnAdd(this.inputs, new InputObject(options));
  }

  public output(options: IOObjectOptions) {
    return this.returnAdd(this.outputs, new OutputObject(options));
  }

  public build(target: BuildTarget): void {}
}
