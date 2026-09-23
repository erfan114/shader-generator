import { type BuilderNode, builderNode } from "../node.js";
import type { ValueDatatype } from "./value.node.js";

// * COMMON
export type ScopeBodyReturnVariant = ValueDatatype | null;

// * SCOPE BODY
export type ScopeBody<Returns extends ScopeBodyReturnVariant> = () => Generator<
  BuilderNode,
  Returns extends null ? void : Returns
>;

// * SCOPE NODE
export const SCOPE_KIND = "scope";

export type ScopeNodeOptions<Returns extends ScopeBodyReturnVariant = null> = {
  body: ScopeBody<Returns>;
};

export type ScopeNode<
  Returns extends ScopeBodyReturnVariant = ScopeBodyReturnVariant,
> = BuilderNode<typeof SCOPE_KIND, ScopeNodeOptions<Returns>>;

export function scope<Returns extends ScopeBodyReturnVariant>(
  body: ScopeBody<Returns>,
): ScopeNode<Returns> {
  return builderNode({
    kind: SCOPE_KIND,
    data: {
      body,
    },
  });
}
