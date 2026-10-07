export const KEYWORD = {
  INPUT: "input",
  OUTPUT: "output",
} as const;

export type CompilerKeywords = (typeof KEYWORD)[keyof typeof KEYWORD];
export type CompilerKeywordMap = Record<CompilerKeywords, string>;
