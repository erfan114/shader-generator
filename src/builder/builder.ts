import type { BuildTarget } from "@/compiler/index.js";
import { NotImplementedError } from "@/errors.js";

import type { BuilderNode } from "./node.js";
import { type MainNode, isMainNode } from "./nodes/main.node.js";

export type BuilderGenerator = () => Generator<
  BuilderNode,
  MainNode,
  BuilderNode
>;

type BuilderNodes = BuilderNode[];

export class Builder {
  public static from_generator(generator: BuilderGenerator): Builder {
    const nodes: BuilderNodes = [];
    const instance = generator();

    let current = instance.next();

    while (!current.done) {
      nodes.push(current.value);
      current = instance.next(current.value);
    }

    if (!isMainNode(current.value)) {
      throw new Error(
        "Invalid builder generator: its final return value must be a 'MainNode'",
      );
    }

    nodes.push(current.value);

    return new Builder(nodes);
  }

  private constructor(protected readonly nodes: BuilderNodes) {}

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
