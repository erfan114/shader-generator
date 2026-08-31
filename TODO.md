# Builder Implementation Checklist

Legend:

- ✅ = Fully implemented
- 🚧 = Placeholder (method signature exists but throws `NotImplementedError`)
- ❌ = Not started (no code yet)

---

## Core Builder (`src/builder/builder.ts`)

- ✅ `Builder` class with `global` property
- ✅ `public readonly global = new GlobalNodeModel(createGlobalNode())`
- 🚧 `build()` — throws `NotImplementedError`

## Global Node (`src/builder/nodes/global.node.ts`)

- ✅ `GlobalNode` type with `defines[]`, `main?` fields
- ✅ `createGlobalNode()` factory function
- ✅ `GlobalNodeModel` class
- ✅ `provideMain()` — creates/returns singleton `MainNode` with scope
- 🚧 `createDefine()` — throws `NotImplementedError`
- 🚧 `createUniform()` — throws `NotImplementedError`
- 🚧 `createInput()` — throws `NotImplementedError`
- 🚧 `createOutput()` — throws `NotImplementedError`
- 🚧 `createFunction()` — throws `NotImplementedError`
- ❌ Internal state storage for uniforms/inputs/outputs/defines/functions

## Function Node (`src/builder/nodes/function.node.ts`)

- ✅ `FunctionNodeOptions` type (name, returnType)
- ✅ `createFunctionNode()` factory function
- ✅ `FunctionNodeModel` class
- ✅ `createScope()` — creates/retrieves lazy `ScopeNodeModel` for the function
- ✅ `addArgument(options)` — adds arg to scope, returns scope
- ✅ `name` getter/setter — get/set function name
- ✅ `returnType` getter/setter — get/set return type (`Datatype | null`)
- ✅ `scope` getter — access the function's local scope

## Scope API (`src/builder/nodes/scope.node.ts`)

- ✅ `ScopeNode<Owner>` type with `nodes[]`, `args: Set`, `variables: Set`
- ✅ `createScopeNode()` factory function
- ✅ `ScopeNodeModel<Owner>` class
- ✅ `createScope()` — creates child scope
- ✅ `createArgument(options)` — creates `ArgumentNode`, adds to `args` set
- ✅ `createVariable(options)` — creates `VariableNodeModel`, adds to `variables` set
- ❌ Add arbitrary nodes to scope (`scope.nodes[]`)
- ❌ Enter/exit scope context in builder

## Argument API (`src/builder/nodes/argument.node.ts`)

- ✅ `ArgumentNodeOptions` type (name, type)
- ✅ `ArgumentNode` type (kind, name, type, owner)

## Variable API (`src/builder/nodes/variable.node.ts`)

- ✅ `VariableNodeModel<Type, Owner>` generic class definition
- ✅ `VariableNode` type with name + value (ValueNode)
- ✅ `VariableObjectProps` type

## Value API (`src/builder/nodes/value.node.ts`)

- ✅ `ValueNodeModel` class definition
- ✅ `ValueNode` type with type + data
- ✅ `ValueDataType` type
- ✅ `DatatypeValueType<T>` mapping

## Node Model Layer (`src/builder/node.ts`)

- ✅ `NodeModel<T>` base class
- ✅ `Ownable<T>` type in `types.ts`
- ✅ All node model classes (Uniform, Input, Output, Define, Function, Scope, Value, Variable, Global)

## Operation APIs (`src/builder/nodes/operations/`)

- ✅ `add(left, right)` — creates and returns `AdditionNode`
- ✅ `subtract(left, right)` — creates and returns `SubtractionNode`
- ✅ `multiply(left, right)` — creates and returns `MultiplicationNode`
- ✅ `divide(left, right)` — creates and returns `DivisionNode`
- ✅ `modulo(left, right)` — creates and returns `ModulusNode`
- ✅ `OperationNode` base type (left, right)
- ✅ Type-level combination maps (`AdditiveCombination`, `MultiplicativeCombination`)
- ✅ `AdditiveDatatype` / `MultiplicativeDatatype` types + runtime guards
- ❌ Wire ownership for operation nodes

## Compiler (`src/compiler/`)

- ❌ `Compiler` — abstract class (empty)
- ❌ `WebGLCompiler` — GLSL ES 1.00 code generation (empty class)
- ❌ `WebGL2Compiler` — GLSL ES 3.00 code generation (empty class)
- ❌ GLSL type name mapping (`DATATYPE` enum → GLSL string)
- ❌ Emit source code for any node types

## Additional GLSL Features

- ❌ Precision qualifiers (`highp`, `mediump`, `lowp`)
- ❌ Interpolation qualifiers (`flat`, `smooth`, `centroid`)
- ❌ Array types (`float[4]`)
- ❌ Struct definitions
- ❌ `const` declarations
- ❌ Built-in function wrappers
- ❌ Uniform blocks / `layout(std140)`
- ❌ Assignment statements (`a = b`)
- ❌ Return statements
- ❌ Conditional statements (`if`, `else`, `else if`)
- ❌ Loop statements (`for`, `while`, `do-while`)
- ❌ `break`, `continue`, `discard`

## Tests (`tests/`)

- ❌ `builder.test.ts` — needs assertion improvements for node instances
- ❌ `main.test.ts` — test variable creation inside main scope
- ❌ `variable.test.ts` — test all data types for variable creation
- ❌ Add operation tests
- ❌ Add function/argument tests
- ❌ Add scope/variable tests
- ❌ Add compiler output tests (snapshot tests for generated GLSL)
