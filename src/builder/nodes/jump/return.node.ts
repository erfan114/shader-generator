import { jump, type JumpNode } from "./common.js";

export const RETURN_KIND = "return";

export type ReturnNode = JumpNode<typeof RETURN_KIND>;

export const return_ = jump(RETURN_KIND);
