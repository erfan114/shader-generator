import type { CompilerContext } from "./context.js";

const PARSER_FIELDS = [
  "input",
  "output",
  "uniform",
  "function",
  "variable",
  "do",
  "for",
  "if",
  "switch",
  "while",
  "break",
  "continue",
  "discard",
  "return",
  "scope",
] as const;

type ParserFields = (typeof PARSER_FIELDS)[number];

export type ParserFunction = (context: CompilerContext) => string;

export type Parser = Record<ParserFields, ParserFunction>;
