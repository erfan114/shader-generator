import { describe, expect, it } from "vitest";

import { scope, SCOPE_KIND } from "@/builder/nodes/scope.node.js";
import { isBuilderNode } from "@/builder/node.js";
import type { ValueDatatype } from "@/builder/nodes/value.node.js";
import { DATATYPE } from "@/types.js";

describe("Scope", () => {
  it("should create a builder node with kind 'scope'", () => {
    const myScope = scope(function* () {});

    expect(myScope.kind).toBe(SCOPE_KIND);
  });

  it("should be recognized by isBuilderNode", () => {
    const myScope = scope(function* () {});

    expect(isBuilderNode(myScope)).toBe(true);
  });

  it("should store the provided body function", () => {
    const body = function* () {};
    const myScope = scope(body);

    expect(myScope.data.body).toBe(body);
  });

  it("should have a body that returns a generator when called", () => {
    const myScope = scope(function* () {});
    const generator = myScope.data.body();

    expect(typeof generator[Symbol.iterator]).toBe("function");
  });

  it("should support a null return type", () => {
    const myScope = scope<null>(function* () {});

    expect(myScope.data.body).toBeTypeOf("function");
  });

  it("should support a value return type", () => {
    const myScope = scope<ValueDatatype>(function* () {
      return DATATYPE.FLOAT;
    });

    expect(myScope.data.body).toBeTypeOf("function");
  });
});
