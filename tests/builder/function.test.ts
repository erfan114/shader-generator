import { describe, expect, it } from "vitest";

import type { ArgumentNodeOptions } from "../../src/builder/nodes/argument.node.js";
import { generateFunctionDefinition } from "../../src/builder/nodes/function.node.js";
import { VALUE_DATATYPE } from "../../src/builder/nodes/value.node.js";
import type { Datatype } from "../../src/types.js";

describe("Function", () => {
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
    const datatypes = Object.values(VALUE_DATATYPE);

    let definition = generateFunctionDefinition<ArgumentNodeOptions[]>();

    for (const datatype of datatypes) {
      definition = definition.withArg({ type: datatype });
    }

    expect(definition.args).toHaveLength(datatypes.length);

    const mapDatatype = (datatype: Datatype) => {
      return { type: datatype } satisfies ArgumentNodeOptions;
    };

    const mappedDatatypes = datatypes.map(mapDatatype);

    expect(definition.args).toStrictEqual(mappedDatatypes);
    expect(definition.returns).toBeNull();
  });
});
