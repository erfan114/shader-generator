import { type BuilderNode, builderNode } from "../node.js";
import type { ValueDatatype } from "./value.node.js";

// * SCOPE BODY
export type ScopeBody<Returns extends ValueDatatype | null> =
  // TODO: Generator shouldn't yield unknown, fix it
  () => Generator<unknown, Returns>;

// * SCOPE NODE
const SCOPE_KIND = "scope";

export type ScopeNodeOptions<Returns extends ValueDatatype | null = null> = {
  body: ScopeBody<Returns>;
};

export type ScopeNode<Returns extends ValueDatatype | null> = BuilderNode<
  typeof SCOPE_KIND,
  ScopeNodeOptions<Returns>
>;

export function scope<Returns extends ValueDatatype | null>(
  body: ScopeBody<Returns>,
): ScopeNode<Returns> {
  return builderNode({
    kind: SCOPE_KIND,
    data: {
      body,
    },
  });
}
