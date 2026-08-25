import { WebGLBuilder } from "./webgl.builder.js";
import { WebGL2Builder } from "./webgl2.builder.js";

export const BUILDER_OPTIONS = {
  webgl: WebGLBuilder,
  webgl2: WebGL2Builder,
} as const;

export type BuildTarget = keyof typeof BUILDER_OPTIONS;
