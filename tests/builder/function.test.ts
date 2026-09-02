import { describe, expect, it } from "vitest";

import type { ArgumentNodeOptions } from "../../src/builder/nodes/argument.node.js";
import { generateFunctionDefinition } from "../../src/builder/nodes/function.node.js";
import { VALUE_DATATYPE } from "../../src/builder/nodes/value.node.js";
import type { Datatype } from "../../src/types.js";

describe("Function", () => {
  const valueDatatypes = Object.values(VALUE_DATATYPE);

  const toArgumentNodeOptions = (datatype: Datatype) => {
    return { type: datatype } satisfies ArgumentNodeOptions;
  };

  it("definition should have nothing", () => {
    const definition = generateFunctionDefinition();

    expect(definition.args).toHaveLength(0);
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
});
