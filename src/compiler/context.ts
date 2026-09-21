import type { Datatype } from "@/types.js";

export type CompilerContext = {
  datatypeParser: (datatype: Datatype) => string;
};
