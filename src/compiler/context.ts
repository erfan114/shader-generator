import type { Datatype } from "@/types.js";
import type { CompilerNames } from "./names.js";
import type { Parser } from "./parser.js";
import type { DatatypeMapValue } from "./common.js";

export type CompilerContextHandlers = {
  datatypeParser: (datatype: Datatype) => DatatypeMapValue;
};

export type CompilerContextOptions = {
  parser: Parser;
};

export type CompilerContext = CompilerContextOptions & {
  names: CompilerNames;
  parseDatatype: (datatype: Datatype) => string;
};
