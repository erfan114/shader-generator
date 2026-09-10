import { jump, type JumpNode } from "./common.js";

export const DISCARD_KIND = "discard";

export type DiscardNode = JumpNode<typeof DISCARD_KIND>;

export const discard_ = jump(DISCARD_KIND);
