export type BuilderNode<
  Kind extends PropertyKey = PropertyKey,
  Data = unknown,
> = {
  kind: Kind;
} & Data;

export type OwnableNode<
  Kind extends PropertyKey = PropertyKey,
  Owner = unknown,
  Data = unknown,
> = BuilderNode<Kind, Data> & {
  owner: Owner;
};
