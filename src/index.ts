// Builder
export { Builder } from "@/builder/builder.js";

// Compiler
export { GLSL100Compiler } from "@/compiler/GLSL100.compiler.js";
export { GLSL300Compiler } from "@/compiler/GLSL300.compiler.js";

// Data types
export { DATATYPE } from "@/types.js";

// Nodes
export { fn } from "@/builder/nodes/function.node.js";
export { input } from "@/builder/nodes/input.node.js";
export { main } from "@/builder/nodes/main.node.js";
export { output } from "@/builder/nodes/output.node.js";
export { scope } from "@/builder/nodes/scope.node.js";
export { uniform } from "@/builder/nodes/uniform.node.js";
export { value } from "@/builder/nodes/value.node.js";
export { variable } from "@/builder/nodes/variable.node.js";

// Operational nodes
export { add } from "@/builder/nodes/operations/addition.node.js";
export { divide } from "@/builder/nodes/operations/division.node.js";
export { modulo } from "@/builder/nodes/operations/modulus.node.js";
export { multiply } from "@/builder/nodes/operations/multiplication.node.js";
export { subtract } from "@/builder/nodes/operations/subtraction.node.js";

// Logical nodes
export { and } from "@/builder/nodes/logical/and.node.js";
export { not } from "@/builder/nodes/logical/not.node.js";
export { or } from "@/builder/nodes/logical/or.node.js";

// Control-flow nodes
export { do_ } from "@/builder/nodes/control-flow/do.node.js";
export { for_ } from "@/builder/nodes/control-flow/for.node.js";
export { if_ } from "@/builder/nodes/control-flow/if.node.js";
export { switch_ } from "@/builder/nodes/control-flow/switch.node.js";
export { while_ } from "@/builder/nodes/control-flow/while.node.js";

// Comparison nodes
export { eq } from "@/builder/nodes/comparison/eq.node.js";
export { gt } from "@/builder/nodes/comparison/gt.node.js";
export { gte } from "@/builder/nodes/comparison/gte.node.js";
export { lt } from "@/builder/nodes/comparison/lt.node.js";
export { lte } from "@/builder/nodes/comparison/lte.node.js";
export { neq } from "@/builder/nodes/comparison/neq.node.js";

// Structures
export type { Matrix2 } from "@/structures/matrix2.structure.js";
export { matrix2 } from "@/structures/matrix2.structure.js";
export type { Matrix2x3 } from "@/structures/matrix2x3.structure.js";
export { matrix2x3 } from "@/structures/matrix2x3.structure.js";
export type { Matrix2x4 } from "@/structures/matrix2x4.structure.js";
export { matrix2x4 } from "@/structures/matrix2x4.structure.js";
export type { Matrix3 } from "@/structures/matrix3.structure.js";
export { matrix3 } from "@/structures/matrix3.structure.js";
export type { Matrix3x2 } from "@/structures/matrix3x2.structure.js";
export { matrix3x2 } from "@/structures/matrix3x2.structure.js";
export type { Matrix3x4 } from "@/structures/matrix3x4.structure.js";
export { matrix3x4 } from "@/structures/matrix3x4.structure.js";
export type { Matrix4 } from "@/structures/matrix4.structure.js";
export { matrix4 } from "@/structures/matrix4.structure.js";
export type { Matrix4x2 } from "@/structures/matrix4x2.structure.js";
export { matrix4x2 } from "@/structures/matrix4x2.structure.js";
export type { Matrix4x3 } from "@/structures/matrix4x3.structure.js";
export { matrix4x3 } from "@/structures/matrix4x3.structure.js";
export type { Vec2 } from "@/structures/vec2.structure.js";
export { vec2 } from "@/structures/vec2.structure.js";
export type { Vec3 } from "@/structures/vec3.structure.js";
export { vec3 } from "@/structures/vec3.structure.js";
export type { Vec4 } from "@/structures/vec4.structure.js";
export { vec4 } from "@/structures/vec4.structure.js";
