import type { BuilderNode } from "@/builder/node.js";
import { createNameGenerator } from "./name.js";
import { UNIFORM_KIND } from "@/builder/nodes/uniform.node.js";
import { INPUT_KIND } from "@/builder/nodes/input.node.js";
import { OUTPUT_KIND } from "@/builder/nodes/output.node.js";
import { FUNCTION_KIND } from "@/builder/nodes/function.node.js";
import { hasName } from "@/builder/helpers/node.helper.js";

const KIND_PREFIX = {
  [UNIFORM_KIND]: "u",
  [INPUT_KIND]: "i",
  [OUTPUT_KIND]: "o",
  [FUNCTION_KIND]: "f",
} as const;

function getKindPrefix(kind: string) {
  if (kind in KIND_PREFIX) {
    return KIND_PREFIX[kind as keyof typeof KIND_PREFIX];
  }
}

export class CompilerNames {
  private readonly names = new Map<BuilderNode, string>();
  private readonly generator = createNameGenerator();

  public getName(node: BuilderNode): string {
    const existing = this.names.get(node);

    if (existing) {
      return existing;
    }

    if (hasName(node)) {
      return node.data.name;
    }

    const name = this.generator.generate(getKindPrefix(node.kind));

    this.names.set(node, name);

    return name;
  }
}
