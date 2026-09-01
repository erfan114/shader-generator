export type BuilderNodeOptions<Kind extends string = string, Data = unknown> = {
  kind: Kind;
  data: Data;
};

export type BuilderNode<
  Kind extends string = string,
  Data = unknown,
> = BuilderNodeOptions<Kind, Data> & {
  [Symbol.iterator](): Generator<BuilderNode<Kind, Data>, Data, Data>;
};

export function builderNode<Kind extends string, Data, Methods>(
  options: BuilderNodeOptions<Kind, Data>,
): BuilderNode<Kind, Data> {
  return {
    ...options,
    *[Symbol.iterator]() {
      return yield this;
    },
  };
}
