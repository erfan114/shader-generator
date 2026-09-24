import { NotImplementedError } from "@/errors.js";
import { emitBlock, emitLine } from "./emitter.js";
import { createFunctionHeader } from "./helpers/function.helper.js";
import type { Parser } from "./parser.js";

export const SHARED_PARSER_FIELDS = {
  uniform: (context, node) => {
    return emitLine({
      content: `uniform ${context.datatypeParser(node.data.type)} ${context.names.getName(node)};`,
    });
  },
  function: (context, node) => {
    const args = node.data.args.map((arg) => {
      const name = context.names.getName(arg);
      const type = context.datatypeParser(arg.data.type);

      return `${type} ${name}`;
    });

    const functionHeader = createFunctionHeader(args);

    return emitBlock({
      header: emitLine({ content: functionHeader }),
      // TODO: Handle function body
      body: [],
    });
  },
  variable: (context, node) => {
    const variableDeclaration = `${context.datatypeParser(node.data.type)} ${context.names.getName(node)}`;

    if (node.data.value) {
      // TODO: Handle assigned values

      throw new NotImplementedError();
    }

    return emitLine({
      content: `${variableDeclaration};`,
    });
  },
  do: () => {
    throw new NotImplementedError();
  },
  for: () => {
    throw new NotImplementedError();
  },
  if: () => {
    throw new NotImplementedError();
  },
  switch: () => {
    throw new NotImplementedError();
  },
  while: () => {
    throw new NotImplementedError();
  },
  break: () => {
    throw new NotImplementedError();
  },
  continue: () => {
    throw new NotImplementedError();
  },
  discard: () => {
    throw new NotImplementedError();
  },
  return: () => {
    throw new NotImplementedError();
  },
  scope: () => {
    throw new NotImplementedError();
  },
} as const satisfies Partial<Parser>;
