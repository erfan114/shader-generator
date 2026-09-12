import type { BuilderNode } from "../node.js";

export function hasName(
  node: BuilderNode,
): node is BuilderNode<string, { name: string }> {
  return (
    typeof node.data === "object" &&
    node.data !== null &&
    "name" in node.data &&
    typeof node.data.name === "string"
  );
}
