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
