import { NotImplementedError } from "@/errors.js";
import type { BooleanExpression } from "../logical/common.js";
import type { ControlFlowBody } from "./common.js";

export const IF_KIND = "if";

export function if_(expression: BooleanExpression, body: ControlFlowBody) {
  throw new NotImplementedError();
}
