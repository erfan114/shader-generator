import { WebGLCompiler } from "./webgl.compiler.js";
import { WebGL2Compiler } from "./webgl2.compiler.js";

export const AVAILABLE_COMPILERS = {
  webgl: WebGLCompiler,
  webgl2: WebGL2Compiler,
} as const;

export type BuildTarget = keyof typeof AVAILABLE_COMPILERS;
