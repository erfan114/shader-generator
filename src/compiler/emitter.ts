type SourceEmitterRequestTag<T extends string> = { kind: T };

type SourceEmitterLineRequest = SourceEmitterRequestTag<"line"> & {
  content: string;
};

type SourceEmitterAppendRequest = SourceEmitterRequestTag<"append"> & {
  content: string;
};

type SourceEmitterBlockRequest = SourceEmitterRequestTag<"block"> & {
  header?: SourceEmitterLineRequest;
  body: SourceEmitterRequest[];
};

export type SourceEmitterRequest =
  | SourceEmitterLineRequest
  | SourceEmitterAppendRequest
  | SourceEmitterBlockRequest;

type SourceEmitterRequestData<T> = Omit<
  T,
  keyof SourceEmitterRequestTag<string>
>;

export class SourceEmitter {
  private readonly lines: string[] = [];
  private indentation = 0;

  private static readonly INDENT = "    ";

  private append(
    data: SourceEmitterRequestData<SourceEmitterAppendRequest>,
  ): void {
    const lastLine = this.lines.at(-1);

    if (!lastLine && data.content.length > 0) {
      this.lines.push(
        SourceEmitter.INDENT.repeat(this.indentation) + data.content,
      );

      return;
    }

    const modifiedContent = lastLine + data.content;

    this.lines[this.lines.length - 1] = modifiedContent;
  }

  private line(data: SourceEmitterRequestData<SourceEmitterLineRequest>): void {
    if (data.content.length === 0) {
      this.lines.push("");

      return;
    }

    this.lines.push(
      `${SourceEmitter.INDENT.repeat(this.indentation)}${data.content}`,
    );
  }

  private block(
    data: SourceEmitterRequestData<SourceEmitterBlockRequest>,
  ): void {
    if (data.header) {
      this.line(data.header);
      this.append({ content: " {" });
    } else {
      this.line({ content: "{" });
    }

    this.indent();

    for (const request of data.body) {
      this.process(request);
    }

    this.dedent();

    this.line({ content: "}" });
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

  public process(request: SourceEmitterRequest): void {
    switch (request.kind) {
      case "append": {
        this.append(request);

        break;
      }
      case "line": {
        this.line(request);

        break;
      }
      case "block": {
        this.block(request);

        break;
      }
    }
  }

  public toString(): string {
    return this.lines.join("\n");
  }
}

function sourceEmitterRequestFactory<T extends SourceEmitterRequestTag<string>>(
  kind: T["kind"],
) {
  return (data: SourceEmitterRequestData<T>) => {
    return {
      kind,
      ...data,
    };
  };
}

export const emitAppend =
  sourceEmitterRequestFactory<SourceEmitterAppendRequest>("append");

export const emitLine =
  sourceEmitterRequestFactory<SourceEmitterLineRequest>("line");

export const emitBlock =
  sourceEmitterRequestFactory<SourceEmitterBlockRequest>("block");
