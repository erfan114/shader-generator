import { NotImplementedError } from "@/errors.js";

export class SourceEmitter {
  private readonly lines: string[] = [];

  public line(value = ""): void {
    this.lines.push(value);
  }

  public block(header: string, callback: () => void): void {
    throw new NotImplementedError();
  }

  public indent(): void {
    throw new NotImplementedError();
  }

  public dedent(): void {
    throw new NotImplementedError();
  }

  public toString(): string {
    throw new NotImplementedError();
  }
}
