import { NotImplementedError } from "@/errors.js";
import type { BooleanExpression } from "../logical/common.js";
import type { ControlFlowBody } from "./common.js";

export const WHILE_KIND = "while";

export function while_(expression: BooleanExpression, body: ControlFlowBody) {
  throw new NotImplementedError();
}
