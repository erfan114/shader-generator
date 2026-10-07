import { NotImplementedError } from "@/errors.js";
import { emitBlock, emitLine } from "./emitter.js";
import { createFunctionHeader } from "./helpers/function.helper.js";
import type { Parser } from "./parser.js";
import type { Dependent } from "./dependency.js";
import type { Datatype } from "@/types.js";
import { scope } from "@/builder/nodes/scope.node.js";
import type { FunctionNodeReturnVariant } from "@/builder/nodes/function.node.js";

export type DatatypeMapValue = Dependent<{
  value: string;
}>;

export type DatatypeMap = Record<Datatype, DatatypeMapValue>;

export const SHARED_PARSER_FIELDS = {
  uniform: (context, node) => {
    return {
      request: [
        emitLine({
          content: `uniform ${context.parseDatatype(node.data.type)} ${context.names.getName(node)};`,
        }),
      ],
    };
  },
  function: (context, node) => {
    const args = node.data.args.map((arg) => {
      const name = context.names.getName(arg);
      const type = context.parseDatatype(arg.data.type);

      return `${type} ${name}`;
    });

    const functionHeader = createFunctionHeader(args);
    const functionBody = context.parser.scope(
      context,
      scope<FunctionNodeReturnVariant>(function* () {
        return yield* node.data.body(...node.data.args);
      }),
    );

    return {
      request: [
        emitBlock({
          header: emitLine({ content: functionHeader }),
          body: functionBody.request,
        }),
      ],
      depends: functionBody.depends ?? [],
    };
  },
  variable: (context, node) => {
    const name = context.names.getName(node);
    const type = context.parseDatatype(node.data.type);
    const declaration = `${type} ${name}`;

    if (node.data.value) {
      // TODO: Handle assigned values

      throw new NotImplementedError();
    }

    return {
      request: [
        emitLine({
          content: `${declaration};`,
        }),
      ],
    };
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
