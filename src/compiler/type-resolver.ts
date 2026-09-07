import type { Datatype } from "@/types.js";

export interface TypeResolver {
  resolve(type: Datatype): string;
}
