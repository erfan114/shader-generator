# GLSL Generator

A utility library for generating GLSL shader source code programmatically.

![Banner](https://github.com/erfan114/shader-generator/blob/assets/banner.png)

> [!WARNING]
> **This library is still in development and is not safe for production use.**
>
> The API and implementation are actively evolving and may contain breaking changes, bugs, or incomplete functionality. Use it for experimentation and development only.

## Overview

The main idea of this library is to let you build shaders using code while supporting both **GLSL ES 1.00** and **GLSL ES 3.00**.

Instead of writing separate shader source code for different WebGL versions, you can describe your shader using the library's builder API and then choose the target compiler.

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

## Architecture

The library is built around three main stages:

### 1. Builder

The builder provides the API used to construct the shader.

```ts
const builder = new Builder();

builder.uniform(/* ... */);
builder.input(/* ... */);
builder.output(/* ... */);
```

The builder stores the shader's structure and declarations without requiring the user to manually write GLSL source.

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
const builder = new Builder();

// Define shader
builder.uniform(/* ... */);
builder.input(/* ... */);
builder.output(/* ... */);

// Select target
const compiler = /* GLSL 1 or GLSL 3 compiler */;

// Generate source
const source = compiler.compile(builder);
```

The exact API is still evolving as the shader representation and compiler architecture are developed.

## Design Principle

The key design principle is:

> **Describe the shader once, compile it for the target GLSL version.**

The builder should describe **what the shader needs**, while the compiler decides **how that shader is expressed in the target GLSL version**.

This separation makes it possible to support additional GLSL versions or compilation strategies in the future without changing the shader-building API.
