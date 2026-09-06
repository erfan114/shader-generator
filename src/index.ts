// Builder
export { Builder } from "@/builder/index.js";

// Compiler
export type { BuildTarget } from "@/compiler/index.js";

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

// Structures
export type { Vec2 } from "@/structures/vec2.structure.js";
export { vec2 } from "@/structures/vec2.structure.js";
export type { Vec3 } from "@/structures/vec3.structure.js";
export { vec3 } from "@/structures/vec3.structure.js";
export type { Vec4 } from "@/structures/vec4.structure.js";
export { vec4 } from "@/structures/vec4.structure.js";
