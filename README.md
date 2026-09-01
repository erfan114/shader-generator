# GLSL Generator

A utility library for generating GLSL shader source code programmatically.

![Banner](https://github.com/erfan114/shader-generator/blob/assets/banner.png)

> [!WARNING]
> **This library is still in development and is not safe for production use.**
>
> The API and implementation are actively evolving and may contain breaking changes, bugs, or incomplete functionality. Use it for experimentation and development only.

## Overview

The main idea of this library is to let you build shaders using code while supporting both **GLSL ES 1.00** and **GLSL ES 3.00**.

Instead of writing separate shader source code for different WebGL versions, you can describe your shader using the library's **TypeScript generator API** and then choose the target compiler.

```text
Builder
   │
   ▼
Choose Compiler
   │
   ├── GLSL ES 1.00
   └── GLSL ES 3.00
   │
   ▼
Generated GLSL Source
```

This allows the same shader definition to be compiled into different GLSL versions while the compiler handles version-specific syntax and compatibility.

### Describing shaders with TypeScript generators

The shader is described as an ordinary TypeScript **generator function** (`function*`).
Each GLSL construct is a `BuilderNode` — a plain object with a `kind` tag, a `data`
payload, and a `[Symbol.iterator]()` implementation — and you produce those nodes by
`yield*`-ing them from the generator:

- every node is created through a small factory (`uniform()`, `add()`, …)
- the `yield*` delegation routes each node back into the `Builder`
- because each node implements `Generator<BuilderNode>`, the same mechanism is reusable
  for nested scopes (functions, local scopes, if/else blocks) later on

This brings three benefits:

1. **Familiar syntax** — shader authors write plain TS generators, no custom DSL.
2. **Composability** — nodes are values, so `add(uColor, light)` is just a normal
   expression that yields a node, exactly like `uniform({ type: DATATYPE.VEC3 })`.
3. **Type-safety** — the `DATATYPE` registry and the operation type-promotion maps
   (`AdditiveCombination<L, R>`, `MultiplicativeCombination<L, R>`) let the compiler infer
   result types at compile time.

> The idea is inspired by Effect's [generator
> runtime](https://www.effect.website/docs/v3/onboarding): a node implements
> `[Symbol.iterator]()` so it can be `yield*`-ed, and the builder iterates the result to
> collect the IR. See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full design and the
> current implementation status.

## Architecture

The library is built around three main stages:

### 1. Builder

The builder provides the API used to construct the shader. A shader is described as a
generator function that `yield*`-s `BuilderNode` values; the `Builder` wraps that
generator and (eventually) walks the yielded nodes to feed them to the compiler.

```ts
import { Builder } from "shader-generator";
import { uniform } from "shader-generator/builder/nodes/uniform.node.js";
import { DATATYPE } from "shader-generator/types.js";

const builder = Builder.from_generator(function* () {
  yield* uniform({ type: DATATYPE.FLOAT });
  // …more nodes: uniforms, inputs, outputs, operations, …
});

// Selects the target compiler — not yet implemented, throws NotImplementedError today:
builder.build("webgl"); // → GLSL ES 1.00
```

Operations follow the same pattern: each is a factory returning a node, so they compose
naturally inside the generator:

```ts
import { add } from "shader-generator/builder/nodes/operations/addition.node.js";

const builder = Builder.from_generator(function* () {
  const uColor = yield* uniform({ type: DATATYPE.VEC3 });
  const light = yield* uniform({ type: DATATYPE.FLOAT });

  // add() returns a node that is itself yield*-able
  const color = yield* add(uColor, light);
});
```

The builder stores the shader's structure and declarations without requiring the user to
manually write GLSL source.

### 2. Compiler

Once the shader has been constructed, a compiler is selected for the desired GLSL target.

```text
Builder
   │
   ├── GLSL 1 Compiler
   │
   └── GLSL 3 Compiler
```

The compiler is responsible for translating the shader representation into the appropriate GLSL syntax.

For example, the same logical shader input may require different GLSL declarations depending on the target version.

### 3. Generated Source

The compiler produces the final GLSL source code:

```ts
const source = builder.build(/* target */);
```

The resulting source can then be passed to WebGL for shader compilation.

## Goals

The library aims to:

- Generate GLSL programmatically.
- Support GLSL ES 1.00 / WebGL 1.
- Support GLSL ES 3.00 / WebGL 2.
- Provide a common shader-building API for both versions.
- Hide version-specific GLSL differences behind the compiler.
- Make shader generation composable and type-safe.
- Allow the same shader definition to target different GLSL versions.

## Why?

GLSL ES 1.00 and GLSL ES 3.00 have significant differences in their available types and syntax.

For example, GLSL ES 3.00 provides types that do not exist in GLSL ES 1.00:

```glsl
uint
uvec2
uvec3
uvec4

mat2x3
mat2x4
mat3x2
mat3x4
mat4x2
mat4x3

sampler3D
isampler2D
usampler2D
```

Rather than requiring application code to handle these differences directly, the library can represent shader concepts independently of the target GLSL version and let the compiler determine how they should be represented.

For example:

```text
                    ┌── GLSL ES 1.00
                    │
Shader Definition ──┤
                    │
                    └── GLSL ES 3.00
```

Some GLSL ES 3.00 features may need to be emulated or transformed when targeting GLSL ES 1.00.

## Intended API

The general usage is:

```ts
import { Builder } from "shader-generator";
import { uniform, add } from "shader-generator/builder/nodes/uniform.node.js";
import { DATATYPE } from "shader-generator/types.js";

// Describe the shader as a generator of BuilderNodes
const builder = Builder.from_generator(function* () {
  const uColor = yield* uniform({ type: DATATYPE.VEC3 });
  const light = yield* uniform({ type: DATATYPE.FLOAT });

  yield* add(uColor, light);
});

// Select target & generate source
builder.build("webgl"); // → GLSL ES 1.00  (not yet implemented)
```

The exact API is still evolving as the shader representation and compiler architecture are developed. See [ARCHITECTURE.md](./ARCHITECTURE.md) and [TODO.md](./TODO.md) for what is implemented and what is still in progress.

## Design Principle

The key design principle is:

> **Describe the shader once, compile it for the target GLSL version.**

The builder should describe **what the shader needs**, while the compiler decides **how that shader is expressed in the target GLSL version**.

This separation makes it possible to support additional GLSL versions or compilation strategies in the future without changing the shader-building API.

## Progress

See [TODO.md](./TODO.md) for the full list of implemented and remaining features.
