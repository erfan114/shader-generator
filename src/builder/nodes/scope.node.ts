import { type BuilderNode, builderNode } from "../node.js";
import type { ValueDataType } from "./value.node.js";

// * SCOPE BODY
export type ScopeBody<Returns extends ValueDataType | null> =
  // TODO: Generator shouldn't yield unknown, fix it
  () => Generator<unknown, Returns>;

// * SCOPE NODE
const SCOPE_KIND = "scope";

export type ScopeNodeOptions<Returns extends ValueDataType | null = null> = {
  body: ScopeBody<Returns>;
};

export type ScopeNode<Returns extends ValueDataType | null> = BuilderNode<
  typeof SCOPE_KIND,
  ScopeNodeOptions<Returns>
>;

export function scope<Returns extends ValueDataType | null>(
  body: ScopeBody<Returns>,
): ScopeNode<Returns> {
  return builderNode({
    kind: SCOPE_KIND,
    data: {
      body,
    },
  });
}
