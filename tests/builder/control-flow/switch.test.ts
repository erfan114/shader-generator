import { isBuilderNode } from "@/builder/node.js";
import {
  switch_,
  SWITCH_KIND,
} from "@/builder/nodes/control-flow/switch.node.js";
import { value } from "@/builder/nodes/value.node.js";
import { variable } from "@/builder/nodes/variable.node.js";
import { DATATYPE } from "@/types.js";
import { describe, expect, it } from "vitest";

describe("switch", () => {
  it("should create a builder node with kind 'switch'", () => {
    const mySwitch = switch_({
      expression: value({ type: DATATYPE.INT, data: 0 }),
      cases: [
        {
          value: value({ type: DATATYPE.INT, data: 0 }),
          body: function* () {},
        },
      ],
    });

    expect(mySwitch.kind).toBe(SWITCH_KIND);
  });

  it("should be recognized by isBuilderNode", () => {
    const mySwitch = switch_({
      expression: value({ type: DATATYPE.INT, data: 0 }),
      cases: [
        {
          value: value({ type: DATATYPE.INT, data: 0 }),
          body: function* () {},
        },
      ],
    });

    expect(isBuilderNode(mySwitch)).toBe(true);
  });

  it("should support cases array", () => {
    const mySwitch = switch_({
      expression: value({ type: DATATYPE.INT, data: 0 }),
      cases: [
        {
          value: value({ type: DATATYPE.INT, data: 0 }),
          body: function* () {},
        },
        {
          value: value({ type: DATATYPE.INT, data: 1 }),
          body: function* () {},
        },
      ],
    });

    expect(mySwitch.data.cases).toHaveLength(2);
  });

  it("should support defaultCase", () => {
    const mySwitch = switch_({
      expression: value({ type: DATATYPE.INT, data: 0 }),
      cases: [
        {
          value: value({ type: DATATYPE.INT, data: 0 }),
          body: function* () {},
        },
      ],
      defaultCase: function* () {},
    });

    expect(mySwitch.data.defaultCase).toBeDefined();
  });

  it("should support variable as expression", () => {
    const mode = variable({ type: DATATYPE.INT }).assign(0);

    const mySwitch = switch_({
      expression: mode,
      cases: [
        {
          value: value({ type: DATATYPE.INT, data: 0 }),
          body: function* () {},
        },
      ],
    });

    expect(mySwitch.data.expression).toBe(mode);
  });
});
