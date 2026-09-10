export class InvalidNodeYieldError extends Error {
  public constructor() {
    super("Yielded value must be a valid BuilderNode");
  }
}

export class InvalidGeneratorMainError extends Error {
  public constructor() {
    super("Builder generator's final return value must be a valid 'MainNode'");
  }
}
