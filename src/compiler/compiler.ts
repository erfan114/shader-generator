import type { CompilerContext, CompilerContextHandlers } from "./context.js";
import { emitBlock, emitLine, SourceEmitter } from "./emitter.js";
import type { BuilderNodes } from "@/builder/builder.js";
import { CompilerNames } from "./names.js";
import { KEYWORD } from "./keyword.js";
import type { Parser } from "./parser.js";
import { createFunctionHeader } from "./helpers/function.helper.js";
import { scope } from "@/builder/nodes/scope.node.js";
import type { FunctionNodeReturnVariant } from "@/builder/nodes/function.node.js";
import { NotImplementedError } from "@/errors.js";

export type CompilerFactoryOptions = {
  handlers: CompilerContextHandlers;
};

type CompileArgs = [nodes: BuilderNodes];

export type Compiler = {
  compile(...args: CompileArgs): string;
};

const PARSER: Parser = {
  input: (context, node) => {
    const keyword = context.parseKeyword(KEYWORD.INPUT);
    const type = context.parseDatatype(node.data.type);
    const name = context.names.getName(node);

    return {
      request: [
        emitLine({
          content: `${keyword} ${type} ${name};`,
        }),
      ],
    };
  },
  output: (context, node) => {
    const keyword = context.parseKeyword(KEYWORD.OUTPUT);
    const type = context.parseDatatype(node.data.type);
    const name = context.names.getName(node);

    return {
      request: [
        emitLine({
          content: `${keyword} ${type} ${name};`,
        }),
      ],
    };
  },
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

    const header = createFunctionHeader(args);

    const body = context.parser.scope(
      context,
      scope<FunctionNodeReturnVariant>(function* () {
        return yield* node.data.body(...node.data.args);
      }),
    );

    return {
      request: [
        emitBlock({
          header: emitLine({ content: header }),
          body: body.request,
        }),
      ],
      depends: body.depends ?? [],
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
    return {
      request: [emitLine({ content: "break;" })],
    };
  },
  continue: () => {
    return {
      request: [emitLine({ content: "continue;" })],
    };
  },
  discard: () => {
    return {
      request: [emitLine({ content: "discard;" })],
    };
  },
  return: () => {
    throw new NotImplementedError();
  },
  scope: () => {
    throw new NotImplementedError();
  },
};

export function createCompiler(options: CompilerFactoryOptions): Compiler {
  const context: CompilerContext = {
    parser: PARSER,
    parseKeyword: options.handlers.keywordParser,
    parseDatatype: (datatype) => {
      // TODO: Handle dependencies
      const { value } = options.handlers.datatypeParser(datatype);

      return value;
    },
    names: new CompilerNames(),
  };

  const generateEmitterRequest = (node: BuilderNodes[number]) => {
    switch (node.kind) {
      case "input": {
        return context.parser.input(context, node);
      }

      case "output": {
        return context.parser.output(context, node);
      }

      case "uniform": {
        return context.parser.uniform(context, node);
      }

      case "function": {
        return context.parser.function(context, node);
      }

      default:
        throw new Error(`Unhandled node: ${node satisfies never}`);
    }
  };

  return {
    compile: (nodes) => {
      const emitter = new SourceEmitter();

      for (const node of nodes) {
        // TODO: Handle dependencies
        const { request } = generateEmitterRequest(node);

        emitter.process(request);
      }

      return emitter.toString();
    },
  };
}
