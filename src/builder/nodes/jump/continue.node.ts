import { jump, type JumpNode } from "./common.js";

export const CONTINUE_KIND = "continue";

export type ContinueNode = JumpNode<typeof CONTINUE_KIND>;

export const continue_ = jump(CONTINUE_KIND);
