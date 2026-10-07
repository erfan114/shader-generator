import type { Datatype } from "@/types.js";
import type { CompilerNames } from "./names.js";
import type { Parser } from "./parser.js";
import type { DatatypeMapValue } from "./common.js";
import type { CompilerKeywords } from "./keyword.js";

export type CompilerContextHandlers = {
  datatypeParser: (datatype: Datatype) => DatatypeMapValue;
  keywordParser: (keyword: CompilerKeywords) => string;
};

export type CompilerContextOptions = {
  parser: Parser;
};

export type CompilerContext = CompilerContextOptions & {
  names: CompilerNames;
  parseDatatype: (datatype: Datatype) => DatatypeMapValue["value"];
  parseKeyword: (keyword: CompilerKeywords) => string;
};
