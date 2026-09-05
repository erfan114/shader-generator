export type BuilderNodeOptions<
  Kind extends string = string,
  Data = unknown,
  Methods = unknown,
> = {
  kind: Kind;
  data: Data;
} & Methods;

export type BuilderNode<
  Kind extends string = string,
  Data = unknown,
  Methods = unknown,
> = BuilderNodeOptions<Kind, Data, Methods> & {
  [Symbol.iterator](): Generator<BuilderNode<Kind, Data>, Data, Data>;
};

export function builderNode<Kind extends string, Data, Methods>(
  options: BuilderNodeOptions<Kind, Data, Methods>,
): BuilderNode<Kind, Data, Methods> {
  return {
    ...options,
    *[Symbol.iterator]() {
      return yield this;
    },
  };
}

export function isBuilderNode(value: unknown): value is BuilderNode {
  return (
    typeof value === "object" &&
    value !== null &&
    "kind" in value &&
    typeof value.kind === "string" &&
    "data" in value &&
    Symbol.iterator in value
  );
}
