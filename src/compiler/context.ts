import type { Datatype } from "@/types.js";
import type { CompilerNames } from "./names.js";
import type { Parser } from "./parser.js";

export type CompilerContextOptions = {
  parser: Parser;
  datatypeParser: (datatype: Datatype) => string;
};

export type CompilerContext = CompilerContextOptions & {
  names: CompilerNames;
};
