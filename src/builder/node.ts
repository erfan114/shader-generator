import type { Ownable } from "../types.js";

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
> = BuilderNode<Kind, Data> & Ownable<Owner>;

export class NodeModel<T extends BuilderNode> {
  public constructor(protected readonly node: T) {}
}
