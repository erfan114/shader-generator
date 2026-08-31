# Builder Implementation Checklist

## Core Builder (`src/builder/builder.ts`)

- [x] `Builder` class with `global` property and `build()` method
- [x] `public readonly global = new GlobalNodeModel(createGlobalNode())`
- [ ] `build()` — body: look up compiler by target, call `compiler.compile(this)`, return source string

## Global Node (`src/builder/nodes/global.node.ts`)

- [x] `GlobalNode` type with `defines[]` and `main?` fields
- [x] `createGlobalNode()` factory function
- [x] `GlobalNodeModel` class
- [x] Method signatures with proper return types
  - [x] `createDefine(options)` → `DefineNodeModel`
  - [x] `createUniform(options)` → `UniformNodeModel<Type>`
  - [x] `createInput(options)` → `InputNodeModel<Type>`
  - [x] `createOutput(options)` → `OutputNodeModel<Type>`
  - [x] `createFunction()` → `FunctionNodeModel`
  - [x] `provideMain()` → `FunctionNodeModel`
- [ ] Internal state storage
  - [ ] `uniforms: Set<UniformNode>`
  - [ ] `inputs: Set<InputNode>`
  - [ ] `outputs: Set<OutputNode>`
  - [ ] `functions: Set<FunctionNode>`
- [ ] `createDefine()` — body: create node, store it, return it
- [ ] `createUniform()` — body: create node, store it, return it
- [ ] `createInput()` — body: create node, store it, return it
- [ ] `createOutput()` — body: create node, store it, return it
- [ ] `createFunction()` — body: create `FunctionNode` with return type, params, body scope
- [ ] `provideMain()` — body: create/return singleton `MainNode` with `ScopeNode`

## Node Model Layer (`src/builder/node.ts`)

- [x] `NodeModel<T>` base class
- [x] `Ownable<T>` type in `types.ts`
- [x] `UniformNodeModel` — extends `NodeModel<UniformNode<Type>>`
- [x] `InputNodeModel` — extends `NodeModel<InputNode<Type>>`
- [x] `OutputNodeModel` — extends `NodeModel<OutputNode<Type>>`
- [x] `DefineNodeModel` — extends `NodeModel<DefineNode>`
- [x] `FunctionNodeModel` — extends `NodeModel<FunctionNode>`
- [x] `ScopeNodeModel<Owner>` — extends `NodeModel<ScopeNode<Owner>>`
- [x] `ValueNodeModel` — extends `NodeModel<ValueNode>`
- [x] `VariableNodeModel<Type, Owner>` — extends `NodeModel<VariableNode<Type, Owner>>`
- [x] `GlobalNodeModel` — extends `NodeModel<GlobalNode>`

## Function Node (`src/builder/nodes/function.node.ts`)

- [x] `FunctionNodeOptions` type
- [x] `createFunctionNode()` factory function
- [x] `FunctionNodeModel.createScope()` — method signature
- [ ] `FunctionNodeModel.createScope()` — implementation

## Scope API (`src/builder/nodes/scope.node.ts`)

- [x] `ScopeNodeModel<Owner>` generic class definition
- [x] `ScopeNodeModel.createScope()` — method signature
- [x] `ScopeNodeModel.createVariable<Type, Owner>()` — method signature
- [ ] `ScopeNodeModel.createScope()` — implementation
- [ ] `ScopeNodeModel.createVariable()` — implementation
- [ ] Add nodes to scope (`scope.nodes[]`)
- [ ] Enter/exit scope context

## Variable API (`src/builder/nodes/variable.node.ts`)

- [x] `VariableNodeModel<Type, Owner>` generic class definition
- [ ] Create associated `ValueNode` from value data
- [ ] Wire ownership: `ValueNode.owner = VariableNode`, `VariableNode.owner = ScopeNode`
- [ ] Retrieve variable by name from scope

## Value API (`src/builder/nodes/value.node.ts`)

- [x] `ValueNodeModel` class definition
- [ ] Create literal/constant `ValueNode` from raw data
- [ ] Validate data matches declared type
- [ ] Wire ownership to parent node

## Operation APIs (`src/builder/nodes/operations/`)

- [x] `add(left, right)` — create `AdditionNode`
- [x] `subtract(left, right)` — create `SubtractionNode`
- [x] `multiply(left, right)` — create `MultiplicationNode`
- [x] `divide(left, right)` — create `DivisionNode`
- [x] `modulo(left, right)` — create `ModulusNode`
- [ ] Type-check operands against `AdditiveDatatype` / `MultiplicativeDatatype` at runtime
- [ ] Resolve result type from combination maps at runtime
- [ ] Allow operations to be used as operands (composable expressions)
- [ ] Wire ownership for operation nodes

## Compiler (`src/compiler/`)

- [ ] `Compiler.compile(builder): string` — abstract method signature
- [ ] `WebGLCompiler.compile()` — GLSL ES 1.00 code generation
- [ ] `WebGL2Compiler.compile()` — GLSL ES 3.00 code generation
- [ ] GLSL type name mapping (`DATATYPE` enum → GLSL string)
  - [ ] Scalars: `float`, `int`, `uint`, `bool`
  - [ ] Vectors: `vec2`, `vec3`, `vec4`, `ivec2`, `ivec3`, `ivec4`, `uvec2`, `uvec3`, `uvec4`, `bvec2`, `bvec3`, `bvec4`
  - [ ] Matrices: `mat2`, `mat3`, `mat4`, `mat2x3`, `mat2x4`, `mat3x2`, `mat3x4`, `mat4x2`, `mat4x3`
  - [ ] Samplers: `sampler2D`, `isampler2D`, `usampler2D`, `sampler3D`, `isampler3D`, `usampler3D`, `samplerCube`, `isamplerCube`, `usamplerCube`
- [ ] Emit uniforms (`uniform <type> <name>;`)
- [ ] Emit inputs
  - [ ] WebGL1: `attribute <type> <name>;`
  - [ ] WebGL2: `in <type> <name>;`
- [ ] Emit outputs
  - [ ] WebGL1: `varying <type> <name>;`
  - [ ] WebGL2: `out <type> <name>;`
- [ ] Emit `#define` preprocessor directives
- [ ] Emit function definitions (`<returnType> <name>(<params>) { <body> }`)
- [ ] Emit `main()` function
- [ ] Emit variable declarations (`<type> <name> = <value>;`)
- [ ] Emit operation expressions (`<left> + <right>`, etc.)
- [ ] Emit precision qualifiers
  - [ ] Default precision for float/int in fragment shader
  - [ ] Version-specific rules (WebGL1 vertex shader has default precision)
- [ ] Emit value literals
  - [ ] Scalars: `1.0`, `2`, `true`
  - [ ] Vectors: `vec2(1.0, 2.0)`, `vec3(1.0, 2.0, 3.0)`
  - [ ] Matrices: `mat4(1.0, 0.0, ...)` (column-major)
- [ ] Version header (`#version 100` vs `#version 300 es`)
- [ ] WebGL2-specific transforms
  - [ ] `texture2D()` → `texture()`
  - [ ] `gl_FragColor` → custom `out` variable
  - [ ] `attribute` → `in`
  - [ ] `varying` → `out` (fragment) / `in` (vertex)

## Additional GLSL Features

- [ ] Precision qualifiers (`highp`, `mediump`, `lowp`)
- [ ] Interpolation qualifiers (`flat`, `smooth`, `centroid`)
- [ ] Array types (`float[4]`)
- [ ] Struct definitions
- [ ] `const` declarations
- [ ] Built-in function wrappers
  - [ ] `texture2D()` / `texture()`
  - [ ] `normalize()`, `dot()`, `cross()`, `length()`
  - [ ] `mix()`, `clamp()`, `smoothstep()`
  - [ ] `sin()`, `cos()`, `pow()`, `exp()`, `log()`
  - [ ] `min()`, `max()`, `abs()`, `sign()`
  - [ ] `floor()`, `ceil()`, `fract()`, `mod()`
  - [ ] `reflect()`, `refract()`, `distance()`, `faceforward()`
- [ ] Uniform blocks / `layout(std140)`
- [ ] Assignment statements (`a = b`)
- [ ] Return statements
- [ ] Conditional statements (`if`, `else`, `else if`)
- [ ] Loop statements (`for`, `while`, `do-while`)
- [ ] `break`, `continue`, `discard`

## Tests (`tests/`)

- [ ] `builder.test.ts` — verify returned node types, verify storage in builder
- [ ] `main.test.ts` — test variable creation inside main scope
- [ ] `variable.test.ts` — test all data types for variable creation
- [ ] Add operation tests
- [ ] Add compiler output tests (snapshot tests for generated GLSL)
