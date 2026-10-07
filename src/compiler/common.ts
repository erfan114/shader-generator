import type { Dependent } from "./dependency.js";
import type { Datatype } from "@/types.js";

export type DatatypeMapValue = Dependent<{
  value: string;
}>;

export type DatatypeMap = Record<Datatype, DatatypeMapValue>;
