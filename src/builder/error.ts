export class BuilderNodeYieldError extends Error {
  public constructor() {
    super("Yielded value must be a valid BuilderNode");
  }
}
