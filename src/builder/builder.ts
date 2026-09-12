import { isBuilderNode } from "./node.js";
import { type MainNode, isMainNode } from "./nodes/main.node.js";
import type { FunctionNode } from "./nodes/function.node.js";
import type { InputNode } from "./nodes/input.node.js";
import type { OutputNode } from "./nodes/output.node.js";
import type { UniformNode } from "./nodes/uniform.node.js";
import { InvalidGeneratorMainError, InvalidNodeYieldError } from "./error.js";
import type { Compiler } from "@/compiler/compiler.js";

export type BuilderGeneratorYield =
  FunctionNode | InputNode | OutputNode | UniformNode;

export type BuilderGenerator = () => Generator<
  BuilderGeneratorYield,
  MainNode,
  BuilderGeneratorYield
>;

export type BuilderNodes = [...BuilderGeneratorYield[], MainNode];

export class Builder {
  public static from_generator(generator: BuilderGenerator): Builder {
    const nodes: BuilderGeneratorYield[] = [];
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

    const nodesWithMain: BuilderNodes = [...nodes, current.value];

    return new Builder(nodesWithMain);
  }

  private constructor(private readonly nodes: BuilderNodes) {}

  /**
   * Compiles the shader for the specified target.
   * @param compiler - The {@link Compiler} for compiling the shader.
   * @returns The built shader code.
   */
  public compile(compiler: Compiler): string {
    return compiler.compile(this.nodes);
  }
}
