export class InvalidYieldError extends Error {
  public constructor() {
    super("Yielded value must be a BuilderNode");
  }
}
