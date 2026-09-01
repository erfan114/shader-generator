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

## Global Node (`src/builder/nodes/global.node.ts`)

- ✅ `GlobalNode` type with generic `Defines`, `Uniforms`, `Inputs`, `Outputs`, `Functions` params
- ✅ `createGlobalNode()` factory function
- ❌ `createDefine()` — no factory function yet
- ❌ `createUniform()` — now a standalone `uniform()` function in `uniform.node.ts`
- ❌ `createInput()` — no factory function yet
- ❌ `createOutput()` — no factory function yet
- ❌ `createFunction()` — no factory function on GlobalNodeModel yet

## Uniform Node (`src/builder/nodes/uniform.node.ts`)

- ✅ `UniformNodeOptions<Type>` (type only)
- ✅ `UniformNode<Type>` type
- ✅ `uniform()` factory function

## Input / Output Nodes (`src/builder/nodes/input.node.ts`, `output.node.ts`)

- ✅ `InputNode<Type>` / `OutputNode<Type>` types
- ❌ `input()` / `output()` factory functions

## Define Node (`src/builder/nodes/define.node.ts`)

- ✅ `DefineNode` type
- ❌ `define()` factory function

## Function Node (`src/builder/nodes/function.node.ts`)

- ✅ `FunctionNodeOptions<R>` type (name, returnType)
- ✅ `FunctionNode<R>` type
- ✅ `createFunctionNode<R>()` factory function
- ✅ `FunctionDefinition<Args, R>` type with fluent builder
- ✅ `createFunctionDefinition()` factory function
- ✅ `FunctionDefinition.withArg()` — adds typed argument
- ✅ `FunctionDefinition.withReturn()` — sets return type
- ✅ `FunctionDefinitionHandler` type

## Function Definition API (key feature)

```ts
// Define args at creation time with full type safety
const fn = createFunctionDefinition()
  .withArg({ name: "time", type: DATATYPE.FLOAT })
  .withArg({ name: "color", type: DATATYPE.VEC3 })
  .withReturn(DATATYPE.VEC4);

// fn.args is typed: [ArgumentNodeOptions<'time', FLOAT>, ArgumentNodeOptions<'color', VEC3>]
// fn.returns is typed: VEC4
```

## Argument Node (`src/builder/nodes/argument.node.ts`)

- ✅ `ArgumentNodeOptions<Name, Type>` type
- ✅ `ArgumentNode<Name, Type>` type
- ✅ `createArgumentNode()` factory function

## Scope API (`src/builder/nodes/scope.node.ts`)

- ✅ `ScopeNode` type with `nodes`, `args: Set`, `variables: Set`
- ✅ `createScopeNode()` factory function
- ❌ Variable creation methods on scope
- ❌ Node insertion methods on scope

## Variable API (`src/builder/nodes/variable.node.ts`)

- ✅ `VariableNode<Type>` type
- ✅ `VariableObjectProps<T>` type
- ❌ `variable()` factory function

## Value API (`src/builder/nodes/value.node.ts`)

- ✅ `ValueNode<Type>` type
- ✅ `ValueDataType` type
- ✅ `DatatypeValueType<T>` mapping
- ❌ `value()` factory function

## Operation APIs (`src/builder/nodes/operations/`)

- ✅ `add(left, right)` — creates `AdditionNode` via `builderNode()`
- ✅ `subtract(left, right)` — creates `SubtractionNode` via `builderNode()`
- ✅ `multiply(left, right)` — creates `MultiplicationNode` via `builderNode()`
- ✅ `divide(left, right)` — creates `DivisionNode` via `builderNode()`
- ✅ `modulo(left, right)` — creates `ModulusNode` via `builderNode()`
- ✅ All use `builderNode()` factory
- ✅ Type-level combination maps (`AdditiveCombination`, `MultiplicativeCombination`)
- ✅ `AdditiveDatatype` / `MultiplicativeDatatype` types + runtime guards
- ✅ `OperationNode` base type
- ❌ Runtime type-check operands against `AdditiveDatatype` / `MultiplicativeDatatype`

## Compiler (`src/compiler/`)

- ❌ `Compiler` abstract class (empty)
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

- ❌ `tests/builder/node.test.ts` — only tests Symbol.iterator
- ❌ Add variable tests
- ❌ Add operation tests
- ❌ Add function/argument tests
- ❌ Add scope/variable tests
- ❌ Add compiler output tests (snapshot tests for generated GLSL)
- ❌ Add builder integration tests (full shader generation)
