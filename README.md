# GLSL Generator

A utility library for generating GLSL shader source code programmatically.

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/erfan114/shader-generator) [![License: MIT](https://img.shields.io/github/license/erfan114/shader-generator)](https://github.com/erfan114/shader-generator/blob/main/LICENSE) ![Tests](https://github.com/erfan114/shader-generator/actions/workflows/tests.yml/badge.svg)

![Banner](https://github.com/erfan114/shader-generator/blob/assets/banner.png)

> [!CAUTION]
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
import { Builder, uniform, DATATYPE } from "shader-generator";

const builder = Builder.from_generator(function* () {
  yield* uniform({ type: DATATYPE.FLOAT });
  // …more nodes: uniforms, inputs, outputs, operations, …
});

// Selects the target compiler — not yet implemented, throws NotImplementedError today:
builder.compile(compiler); // → GLSL ES 1.00
```

Operations follow the same pattern: each is a factory returning a node, so they compose
naturally inside the generator:

```ts
import { Builder, uniform, add, DATATYPE } from "shader-generator";

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
const source = builder.compile(compiler);
```

The resulting source can then be passed to WebGL for shader compilation.

## Current Implementation Status

The library is under active development. Here's what's implemented today:

### ✅ Fully Implemented

| Feature                   | Description                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| **Builder Core**          | `Builder.from_generator()` — wraps a generator, validates yielded nodes, collects IR               |
| **Node System**           | `builderNode()` factory, `[Symbol.iterator]` traversal, `BuilderNode` base type                    |
| **Uniform Nodes**         | `uniform({ type })` factory, `.as(name)` aliasing                                                  |
| **Input/Output Nodes**    | `input()`, `output()` factories with `.as(name)` and `.flat()` flattening                          |
| **Function Nodes**        | `fn(definitionGenerator, body)` with fluent `FunctionDefinition` API (`withArg()`, `withReturn()`) |
| **Argument Nodes**        | `argument()` factory (used by `FunctionDefinition`)                                                |
| **Scope Nodes**           | `scope(body)` — local scopes with variable/argument tracking                                       |
| **Value Nodes**           | `value({ type, data })` — literal values for all non-sampler types                                 |
| **Variable Nodes**        | `variable()` with `.as(name)` and `.assign(value)`                                                 |
| **Arithmetic Operations** | `add`, `subtract`, `multiply`, `divide`, `modulo` with compile-time type promotion                 |
| **Logical Operations**    | `and`, `or`, `not`                                                                                 |
| **Comparison Operations** | `eq`, `neq`, `lt`, `lte`, `gt`, `gte`                                                              |
| **Control Flow**          | `if_`, `for_`, `while_`, `do_`, `switch_`                                                          |
| **Jump Statements**       | `break_`, `continue_`, `discard_`, `return_`                                                       |
| **Main Node**             | `main(definitionGenerator, body)` — shader entry point                                             |
| **GLSL Type Registry**    | Complete `DATATYPE` enum (scalars, vectors, matrices, samplers)                                    |
| **Vector/Matrix Helpers** | `vec2`, `vec3`, `vec4`, `matrix2`…`matrix4x3` constructors with flexible overloads                 |
| **Name Generator**        | Unique hex-prefixed name generation (`createNameGenerator()`)                                      |
| **Compiler Factory**      | `createCompiler()` with context + emit function                                                    |
| **GLSL 1.00 Compiler**    | Partial — emits declarations for `uniform`, `input` (`attribute`), `output` (`varying`)            |

### 🚧 Partially Implemented / Placeholders

| Feature                                | Status                                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| **Builder.compile()**                  | Accepts compiler but delegation is minimal; full IR traversal not yet wired    |
| **GLSL 3.00 Compiler**                 | Stub only — throws `NotImplementedError`                                       |
| **Operation Runtime Validation**       | Type promotion works at compile-time; runtime operand validation not yet added |
| **Struct Types**                       | Types exist in registry but no node factories                                  |
| **Array Types**                        | Not yet supported                                                              |
| **Precision/Interpolation Qualifiers** | Not yet supported                                                              |
| **Built-in Function Wrappers**         | Not yet implemented (`texture()`, `normalize()`, `dot()`, etc.)                |

### ❌ Not Started

- Runtime layer (WebGL binding)
- Compiler output tests (snapshot tests)
- Builder integration tests (full shader → GLSL)

See [TODO.md](./TODO.md) for the complete checklist.

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

## API Reference

### Installation

```bash
npm install shader-generator
```

### Exports (from `"shader-generator"`)

```ts
// Builder
import { Builder } from "shader-generator";

// Compilers
import { GLSL100Compiler, GLSL300Compiler } from "shader-generator";

// Data Types
import { DATATYPE } from "shader-generator";

// Nodes
import {
  fn,
  input,
  main,
  output,
  scope,
  uniform,
  value,
  variable,
} from "shader-generator";

// Arithmetic Operations
import { add, divide, modulo, multiply, subtract } from "shader-generator";

// Logical Operations
import { and, not, or } from "shader-generator";

// Control Flow
import { do_, for_, if_, switch_, while_ } from "shader-generator";

// Comparison Operations
import { eq, gt, gte, lt, lte, neq } from "shader-generator";

// Structures (vector/matrix constructors)
import {
  vec2,
  vec3,
  vec4,
  matrix2,
  matrix2x3,
  matrix2x4,
  matrix3,
  matrix3x2,
  matrix3x4,
  matrix4,
  matrix4x2,
  matrix4x3,
  // Types also exported:
  type Vec2,
  type Vec3,
  type Vec4,
  type Matrix2,
  type Matrix2x3,
  type Matrix2x4,
  type Matrix3,
  type Matrix3x2,
  type Matrix3x4,
  type Matrix4,
  type Matrix4x2,
  type Matrix4x3,
} from "shader-generator";
```

### Working Examples

#### Basic Uniform Declaration

```ts
import { Builder, uniform, DATATYPE } from "shader-generator";

const builder = Builder.from_generator(function* () {
  // Create a uniform, optionally alias it
  const uTime = yield* uniform({ type: DATATYPE.FLOAT }).as("uTime");
  const uColor = yield* uniform({ type: DATATYPE.VEC3 }).as("uColor");

  // The builder collects these nodes
});

// Later: compile with a compiler (GLSL100Compiler currently emits declarations)
```

#### Arithmetic with Type Promotion

```ts
import { Builder, uniform, add, multiply, DATATYPE } from "shader-generator";

const builder = Builder.from_generator(function* () {
  const uColor = yield* uniform({ type: DATATYPE.VEC3 });
  const uBrightness = yield* uniform({ type: DATATYPE.FLOAT });

  // TypeScript knows the result is VEC3 (float * vec3 = vec3)
  const brightened = yield* multiply(uColor, uBrightness);

  // TypeScript knows the result is VEC3 (vec3 + vec3 = vec3)
  const tint = yield* add(brightened, yield* uniform({ type: DATATYPE.VEC3 }));
});
```

#### Function Definition with Type-Safe Arguments

```ts
import { Builder, fn, uniform, value, DATATYPE, vec3 } from "shader-generator";

const builder = Builder.from_generator(function* () {
  const uLightDir = yield* uniform({ type: DATATYPE.VEC3 }).as("uLightDir");

  // Define a function with typed arguments and return type
  const calcLight = fn(
    (def) =>
      def
        .withArg({ name: "normal", type: DATATYPE.VEC3 })
        .withArg({ name: "lightDir", type: DATATYPE.VEC3 })
        .withReturn(DATATYPE.FLOAT),
    function* ({ normal, lightDir }) {
      // Function body yields nodes
      const dotProd = yield* dot(normal, lightDir); // (when dot() is implemented)
      return yield* value({ type: DATATYPE.FLOAT, data: 1.0 });
    },
  );

  // Call the function (when call syntax is implemented)
});
```

#### Control Flow

```ts
import { Builder, if_, gt, value, uniform, DATATYPE } from "shader-generator";

const builder = Builder.from_generator(function* () {
  const uThreshold = yield* uniform({ type: DATATYPE.FLOAT }).as("uThreshold");
  const vUv = yield* input({ type: DATATYPE.VEC2 }).as("vUv");

  yield* if_(
    gt(value({ type: DATATYPE.FLOAT, data: 0.5 }), uThreshold),
    function* () {
      // body nodes
    },
  );
});
```

#### Vector/Matrix Construction Helpers

```ts
import { vec2, vec3, vec4, matrix4 } from "shader-generator";

// Vectors
const v1 = vec3(1.0); // [1, 1, 1]
const v2 = vec3(1.0, 2.0, 3.0); // [1, 2, 3]
const v3 = vec3(1.0, [2.0, 3.0]); // [1, 2, 3]
const v4 = vec3([1.0, 2.0], 3.0); // [1, 2, 3]

const v5 = vec4(1.0); // [1, 1, 1, 1]
const v6 = vec4(1.0, 2.0, 3.0, 4.0); // [1, 2, 3, 4]
const v7 = vec4([1.0, 2.0], [3.0, 4.0]); // [1, 2, 3, 4]

// Matrices (column-major, from row vectors)
const m = matrix4([1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]);
```

#### Complete Shader Structure (Current API)

```ts
import {
  Builder,
  main,
  uniform,
  input,
  output,
  fn,
  scope,
  variable,
  value,
  add,
  multiply,
  gt,
  lt,
  DATATYPE,
} from "shader-generator";

const builder = Builder.from_generator(function* () {
  // Global declarations
  const uTime = yield* uniform({ type: DATATYPE.FLOAT }).as("uTime");
  const uColor = yield* uniform({ type: DATATYPE.VEC3 }).as("uColor");
  const vUv = yield* input({ type: DATATYPE.VEC2 }).as("vUv");
  const fragColor = yield* output({ type: DATATYPE.VEC4 }).as("fragColor");

  // Main function
  yield* main(
    (def) => def,
    function* () {
      // Local scope with variables
      yield* scope(function* () {
        const color = yield* variable({ type: DATATYPE.VEC3 })
          .assign(uColor)
          .as("color");

        const time = yield* variable({ type: DATATYPE.FLOAT })
          .assign(uTime)
          .as("time");

        // Operations (type-safe)
        const brightened = yield* multiply(color, time);

        // Conditional
        yield* if_(
          gt(vUv.x, value({ type: DATATYPE.FLOAT, data: 0.5 })),
          function* () {
            // if body
          },
        );

        // Final output assignment (when assignment statements are implemented)
        // yield* fragColor.assign(vec4(brightened, 1.0));
      });
    },
  );
});
```

## Design Principle

The key design principle is:

> **Describe the shader once, compile it for the target GLSL version.**

The builder should describe **what the shader needs**, while the compiler decides **how that shader is expressed in the target GLSL version**.

This separation makes it possible to support additional GLSL versions or compilation strategies in the future without changing the shader-building API.

## Project Structure

```text
src/
├── builder/
│   ├── builder.ts           ← Builder class (from_generator, compile)
│   ├── node.ts              ← BuilderNode base, builderNode factory
│   ├── name.ts              ← createNameGenerator
│   ├── error.ts             ← Custom errors
│   └── nodes/
│       ├── uniform.node.ts  ← uniform()
│       ├── input.node.ts    ← input()
│       ├── output.node.ts   ← output()
│       ├── main.node.ts     ← main()
│       ├── function.node.ts ← fn(), FunctionDefinition fluent API
│       ├── argument.node.ts ← argument()
│       ├── scope.node.ts    ← scope()
│       ├── value.node.ts    ← value(), VALUE_DATATYPE
│       ├── variable.node.ts ← variable()
│       ├── control-flow/    ← if_, for_, while_, do_, switch_
│       ├── logical/         ← and, or, not
│       ├── comparison/      ← eq, neq, lt, lte, gt, gte
│       └── operations/      ← add, subtract, multiply, divide, modulo
├── compiler/
│   ├── compiler.ts          ← createCompiler factory
│   ├── context.ts           ← CompilerContext type
│   ├── emitter.ts           ← SourceEmitter
│   ├── names.ts             ← CompilerNames (unique name tracking)
│   ├── GLSL100.compiler.ts  ← GLSL ES 1.00 compiler (partial)
│   └── GLSL300.compiler.ts  ← GLSL ES 3.00 compiler (stub)
├── structures/
│   ├── vec2.structure.ts    ← vec2, Vec2
│   ├── vec3.structure.ts    ← vec3, Vec3
│   ├── vec4.structure.ts    ← vec4, Vec4
│   └── matrix*.structure.ts ← matrix2..matrix4x3, Matrix* types
├── types.ts                 ← DATATYPE enum + all type groupings
└── index.ts                 ← Public API exports
```

## Development

```bash
# Install dependencies
npm install

# Development build with watch
npm run dev

# Production build
npm run build

# Type checking
npm run typecheck

# Run tests
npm test

# Run tests once (CI mode)
npm run test:run
```

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Detailed architecture, design decisions, and implementation status
- [TODO.md](./TODO.md) — Complete implementation checklist with status
- [CONTRIBUTING.md](./CONTRIBUTING.md) — Contribution guidelines

## License

MIT License — see [LICENSE](./LICENSE) for details.
