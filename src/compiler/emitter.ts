export class SourceEmitter {
  private readonly lines: string[] = [];
  private indentation = 0;

  private static readonly INDENT = "    ";

  public line(value = ""): void {
    if (value.length === 0) {
      this.lines.push("");

      return;
    }

    this.lines.push(`${SourceEmitter.INDENT.repeat(this.indentation)}${value}`);
  }

  public block(header: string, callback: () => void): void {
    this.line(`${header} {`);
    this.indent();

    try {
      callback();
    } finally {
      this.dedent();
    }

    this.line("}");
  }

  public indent(): void {
    this.indentation++;
  }

  public dedent(): void {
    if (this.indentation === 0) {
      throw new Error("Cannot dedent below zero.");
    }

    this.indentation--;
  }

  public toString(): string {
    return this.lines.join("\n");
  }
}
