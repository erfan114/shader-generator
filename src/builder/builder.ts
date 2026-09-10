import type { BuildTarget } from "@/compiler/index.js";
import { NotImplementedError } from "@/errors.js";

import { isBuilderNode, type BuilderNode } from "./node.js";
import { type MainNode, isMainNode } from "./nodes/main.node.js";
import type { FunctionNode } from "./nodes/function.node.js";
import type { InputNode } from "./nodes/input.node.js";
import type { OutputNode } from "./nodes/output.node.js";
import type { UniformNode } from "./nodes/uniform.node.js";
import { InvalidGeneratorMainError, InvalidNodeYieldError } from "./error.js";

export type BuilderGeneratorYield =
  FunctionNode | InputNode | OutputNode | UniformNode;

export type BuilderGenerator = () => Generator<
  BuilderGeneratorYield,
  MainNode,
  BuilderGeneratorYield
>;

type BuilderNodes = BuilderNode[];

export class Builder {
  public static from_generator(generator: BuilderGenerator): Builder {
    const nodes: BuilderNodes = [];
    const instance = generator();

    let current = instance.next();

    while (!current.done) {
      if (!isBuilderNode(current.value)) {
        throw new InvalidNodeYieldError();
      }

      nodes.push(current.value);
      current = instance.next(current.value);
    }

    if (!isMainNode(current.value)) {
      throw new InvalidGeneratorMainError();
    }

    nodes.push(current.value);

    return new Builder(nodes);
  }

  private constructor(private readonly nodes: BuilderNodes) {}

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
