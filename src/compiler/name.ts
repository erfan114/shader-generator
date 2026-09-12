import { createCounter } from "@/counter.js";

export const NAME_GENERATOR_NAMING_PREFIX = "g_";
export const NAME_GENERATOR_DEFAULT_OFFSET = 1;

export type NameGenerator = {
  generate(prefix?: string): string;
};

export function createNameGenerator(): NameGenerator {
  const counter = createCounter();

  return {
    generate: (prefix = NAME_GENERATOR_NAMING_PREFIX) => {
      const nextNumber = counter.next().value;

      return `${prefix}${nextNumber}`;
    },
  };
}
