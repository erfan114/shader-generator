# Builder Implementation Checklist

Legend:

- ✅ = Fully implemented
- 🚧 = Placeholder (exists but throws `NotImplementedError`)
- ❌ = Not started (no code yet)

---

## Core Builder (`src/builder/builder.ts`)

- ✅ `BuilderGenerator` type — `() => Generator<BuilderNode>`
- ✅ `Builder.from_generator(generator)` static method
- ✅ `Builder` private constructor (takes `BuilderGenerator`)
- 🚧 `build(target: BuildTarget): string` — throws `NotImplementedError`

## Node Base (`src/builder/node.ts`)

- ✅ `BuilderNodeOptions<Kind, Data>` type
- ✅ `BuilderNode<Kind, Data>` type (with `Symbol.iterator`)
- ✅ `builderNode<Kind, Data>()` factory function
- ✅ `[Symbol.iterator]()` on nodes for generator traversal

## Uniform Node (`src/builder/nodes/uniform.node.ts`)

- ✅ `UniformNodeOptions<Type>` type
- ✅ `UniformNodeData<Type>` type (options + states)
- ✅ `UniformNodeStates` type (name)
- ✅ `UniformNodeMethods<Type>` type (`.as(alias)`)
- ✅ `UniformNode<Type>` type
- ✅ `uniform()` factory function
- ✅ `.as(alias)` method on uniform node

## Input / Output Nodes (`src/builder/nodes/input.node.ts`, `output.node.ts`)

- ✅ `IONodeOptions<Type>` type (in `common.ts`)
- ✅ `IONodeStates` type (name, flatten)
- ✅ `IONodeData<Type>` type
- ✅ `IONodeMethods<Kind, Type>` type (`.as()`, `.flat()`)
- ✅ `IONode<Kind, Type>` type
- ✅ `io()` higher-order factory (in `common.ts`)
- ✅ `InputNode<Type>` / `OutputNode<Type>` types
- ✅ `input()` / `output()` factory functions
- ✅ `.as(alias)` method on input/output nodes
- ✅ `.flat()` method on input/output nodes

## Define Node (`src/builder/nodes/define.node.ts`)

- ✅ `DefineNode` type
- ❌ `define()` factory function

## Function Node (`src/builder/nodes/function.node.ts`)

- ✅ `FunctionDefinitionGenerator<Args, Return>` type
- ✅ `FunctionBody<Args, Returns>` type
- ✅ `FunctionNodeOptions<Args, Returns>` type (args, returns, body)
- ✅ `FunctionNodeStates` type (name)
- ✅ `FunctionNode<Args, Returns>` type
- ✅ `fn()` factory function (takes `definitionGenerator` + `body`)
- ✅ `FunctionDefinition` type with fluent builder
- ✅ `generateFunctionDefinition()` factory function (was `createFunctionDefinition`)
- ✅ `FunctionDefinition.withArg()` — adds typed argument
- ✅ `FunctionDefinition.withReturn()` — sets return type

## Function Definition API (key feature)

```ts
// Define args at creation time with full type safety
const fn = generateFunctionDefinition()
  .withArg({ name: "time", type: DATATYPE.FLOAT })
  .withArg({ name: "color", type: DATATYPE.VEC3 })
  .withReturn(DATATYPE.VEC4);

// fn.args is typed: [ArgumentNodeOptions<'time', FLOAT>, ArgumentNodeOptions<'color', VEC3>]
// fn.returns is typed: VEC4
```

## Argument Node (`src/builder/nodes/argument.node.ts`)

- ✅ `ArgumentNodeOptions<Name, Type>` type
- ✅ `ArgumentNode<Name, Type>` type
- ✅ `argument()` factory function (was `createArgumentNode`)

## Scope API (`src/builder/nodes/scope.node.ts`)

- ✅ `ScopeBody<Returns>` type (generator function)
- ✅ `ScopeNodeOptions<Returns>` type
- ✅ `ScopeNode<Returns>` type
- ✅ `scope()` factory function (replaces `createScopeNode`; takes a `body` generator)

## Value API (`src/builder/nodes/value.node.ts`)

- ✅ `VALUE_DATATYPE` constant (all non-sampler data types)
- ✅ `ValueDataType` type
- ✅ `DatatypeValueType<T>` mapping
- ✅ `ValueNode<Type>` type
- ✅ `value()` factory function

## Variable API (`src/builder/nodes/variable.node.ts`)

- ❌ `VariableObjectProps<T>` type
- ✅ `VariableNode<Type>` type
- ✅ `variable()` factory function

## Operation APIs (`src/builder/nodes/operations/`)

- ✅ `add(left, right)` — creates `AdditionNode` via `builderNode()`
- ✅ `subtract(left, right)` — creates `SubtractionNode` via `builderNode()`
- ✅ `multiply(left, right)` — creates `MultiplicationNode` via `builderNode()`
- ✅ `divide(left, right)` — creates `DivisionNode` via `builderNode()`
- ✅ `modulo(left, right)` — creates `ModulusNode` via `builderNode()`
- ✅ All use `builderNode()` factory
- ✅ Type-level combination maps (`AdditiveCombination`, `MultiplicativeCombination`)
- ✅ `AdditiveDatatype` / `MultiplicativeDatatype` types + runtime guards (`isAdditiveDatatype`, `isMultiplicativeDatatype`)
- ✅ `OperationNode` base type
- ❌ Runtime type-check operands inside operation functions against `AdditiveDatatype` / `MultiplicativeDatatype`

## Compiler (`src/compiler/`)

- ❌ `Compiler` abstract class (empty — no code generation logic)
- ❌ `WebGLCompiler` — GLSL ES 1.00 code generation (empty)
- ❌ `WebGL2Compiler` — GLSL ES 3.00 code generation (empty)
- ❌ GLSL type name mapping (`DATATYPE` enum → GLSL string)
- ❌ Emit source code for any node types

## Additional GLSL Features

- ❌ Precision qualifiers (`highp`, `mediump`, `lowp`)
- ❌ Interpolation qualifiers (`flat`, `smooth`, `centroid`)
- ❌ Array types (`float[4]`)
- ❌ Struct definitions
- ❌ `const` declarations
- ❌ Built-in function wrappers
  - ❌ `texture2D()` / `texture()`
  - ❌ `normalize()`, `dot()`, `cross()`, `length()`
  - ❌ `mix()`, `clamp()`, `smoothstep()`
  - ❌ `sin()`, `cos()`, `pow()`, `exp()`, `log()`
  - ❌ `min()`, `max()`, `abs()`, `sign()`
  - ❌ `floor()`, `ceil()`, `fract()`, `mod()`
  - ❌ `reflect()`, `refract()`, `distance()`, `faceforward()`
- ❌ Uniform blocks / `layout(std140)`
- ❌ Assignment statements (`a = b`)
- ❌ Return statements
- ❌ Conditional statements (`if`, `else`, `else if`)
- ❌ Loop statements (`for`, `while`, `do-while`)
- ❌ `break`, `continue`, `discard`

## Statement Nodes (for shader body)

- ❌ Statement node types
- ❌ Expression statements
- ❌ Assignment statements
- ❌ Return statements
- ❌ Function calls

## Tests (`tests/`)

- ✅ `tests/counter.test.ts` — counter generator
- ✅ `tests/builder/name.test.ts` — unique name generation + skip offsets
- ✅ `tests/builder/node.test.ts` — `Symbol.iterator` on `builderNode`
- ✅ `tests/builder/uniform.test.ts` — `.as()` on uniform
- ✅ `tests/builder/input.test.ts` — `.as()` and `.flat()` on input
- ✅ `tests/builder/output.test.ts` — `.as()` and `.flat()` on output
- ✅ `tests/builder/function.test.ts` — `generateFunctionDefinition()` fluent API
- ✅ `tests/builder/variable.test.ts` — `variable()` factory + `.as()` and `.assign()`
- ✅ `tests/builder/addition.test.ts` — `add()` operation
- ❌ Add scope tests (`tests/builder/scope.test.ts`)
- ❌ Add compiler output tests (snapshot tests for generated GLSL)
- ❌ Add builder integration tests (full shader generation)
