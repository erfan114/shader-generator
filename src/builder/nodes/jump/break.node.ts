import { jump, type JumpNode } from "./common.js";

export const BREAK_KIND = "break";

export type BreakNode = JumpNode<typeof BREAK_KIND>;

export const break_ = jump(BREAK_KIND);
