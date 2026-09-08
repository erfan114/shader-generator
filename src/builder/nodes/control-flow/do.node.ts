import { NotImplementedError } from "@/errors.js";

export const DO_KIND = "do";

export function do_() {
  throw new NotImplementedError();
}
