import { describe, expect, it } from "vitest";

import { builderNode } from "@/builder/node.js";
import type { ArgumentNodeOptions } from "@/builder/nodes/argument.node.js";
import {
  fn,
  generateFunctionDefinition,
  isFunctionNode,
} from "@/builder/nodes/function.node.js";
import { VALUE_DATATYPE, value } from "@/builder/nodes/value.node.js";
import { DATATYPE, uniform, vec2 } from "@/index.js";
import type { Datatype } from "@/types.js";

describe("Function", () => {
  const valueDatatypes = Object.values(VALUE_DATATYPE);

  const toArgumentNodeOptions = (datatype: Datatype) => {
    return { type: datatype } satisfies ArgumentNodeOptions;
  };

  it("definition should have nothing", () => {
    const definition = generateFunctionDefinition();

    expect(definition.args).toStrictEqual([]);
    expect(definition.returns).toBeNull();
  });

  it("definition should have return type", () => {
    const datatypes = Object.values(VALUE_DATATYPE);

    for (const datatype of datatypes) {
      const definition = generateFunctionDefinition().withReturn(datatype);

      expect(definition.args).toHaveLength(0);
      expect(definition.returns).toBe(datatype);
    }
  });

  it("definition should have args", () => {
    let definition = generateFunctionDefinition<ArgumentNodeOptions[]>();

    for (const datatype of valueDatatypes) {
      definition = definition.withArg({ type: datatype });
    }

    expect(definition.args).toHaveLength(valueDatatypes.length);

    const mappedDatatypes = valueDatatypes.map(toArgumentNodeOptions);

    expect(definition.args).toStrictEqual(mappedDatatypes);
    expect(definition.returns).toBeNull();
  });

  it("definition should have return type and args", () => {
    let definition = generateFunctionDefinition<ArgumentNodeOptions[]>();

    for (const datatype of valueDatatypes) {
      definition = definition.withArg(toArgumentNodeOptions(datatype));
    }

    for (const datatype of valueDatatypes) {
      const definitionWithReturn = definition.withReturn(datatype);

      expect(definitionWithReturn.args).toStrictEqual(
        valueDatatypes.map(toArgumentNodeOptions),
      );
      expect(definitionWithReturn.args).toHaveLength(valueDatatypes.length);
      expect(definitionWithReturn.returns).toBe(datatype);
    }
  });

  it("'isFunctionNode' should detect functions", () => {
    const invalidEntries = [
      vec2(1),
      1,
      null,
      {},
      [],
      builderNode({ kind: "some-kind", data: {} }),
      uniform({ type: DATATYPE.BOOL }),
    ];

    const validEntries = [
      fn(
        (d) => d,
        function* () {},
      ),
      fn(
        (d) => d.withArg({ type: DATATYPE.BOOL }),
        function* () {},
      ),
      fn(
        (d) => d.withReturn(DATATYPE.BOOL),
        function* () {
          return value({ type: DATATYPE.BOOL, data: true });
        },
      ),
    ];

    for (const validEntry of validEntries) {
      expect(isFunctionNode(validEntry)).toBe(true);
    }

    for (const invalidEntry of invalidEntries) {
      expect(isFunctionNode(invalidEntry)).toBe(false);
    }
  });
});
