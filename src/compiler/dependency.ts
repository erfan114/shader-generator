import type { SourceEmitterRequest } from "./emitter.js";

// * DEPENDENCY
export type Dependency = {
  requests: SourceEmitterRequest[];
};

export function createDependency(
  ...requests: SourceEmitterRequest[]
): Dependency {
  return {
    requests,
  };
}

// * UTILITY
export type Dependent<T> = T & {
  depends?: Dependency[];
};
